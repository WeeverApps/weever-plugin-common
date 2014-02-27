
wxApp = wxApp || {};

(function($){
    wxApp.SubTabEditView = Backbone.View.extend({
        className: 'wx-subtab-edit',
        subTabEditTplSelector: '', // This is overridden by child classes.
        baseEditTplSelector: '#subtab-edit-template',
		feedSampleTplSelector: '#feedsample-template',
        parentContainerId: false,
        
        initialize: function(options) {

            this.initializeEvents();

            if ( this.subTabEditTplSelector )
                this.subTabEditTpl = _.template( $(this.subTabEditTplSelector).html() );
            this.baseEditTpl = _.template( $(this.baseEditTplSelector).html() );
			this.feedSampleTpl = _.template( $(this.feedSampleTplSelector).html() );
            this.render();

            Backbone.Events.on('tab:new', this.destroyView, this);
            this.model.on('save', this.destroyView, this);
        },

        // Override this if you need to merge in your own events, like this:
        // this.events = _.extend({}, this.genericEvents, this.events);
        initializeEvents: function() {
            this.events = this.genericEvents;
            this.delegateEvents();
        },

        genericEvents: {
            'change .wx-dialog-input'       : 'next',
			'change .wx-social-input'       : 'next',
			'keydown .wx-dialog-input'      : 'hideValidateFeed',
            'keyup .wx-edit-title'          : 'editTitle',
			'click .wx-finish-button'       : 'finish',
			'click .wx-next-button'         : 'next',
            'change .wx-content-radio'      : 'contentChange',
            'click .close-reveal-modal'     : 'close',
	        'click .wx-close-reveal-modal'  : 'closeReveal',
	        'click .wx-close-button'        : 'closeReveal',
            'close'                         : 'close'
        },

        render: function() {
            this.$el.html( this.baseEditTpl( this.model.toJSON() ) );
            if ( this.subTabEditTpl )
                this.$('.subtab').html( this.subTabEditTpl( this.model.toJSON() ) );

            this.$el.prepend('<form>');
            this.$el.append('</form>');

            this.startValidation();
            if ( this.model.validateFeed ) {
                this.$('.wx-finish-button').hide();
                this.$('.wx-edit-title-div').hide();

                if ( this.model.get('id') !== null ) {
                    // We're editing, let's bring up the 'Preview' window.
                    this.next();
                }
            } else {
                this.$('.wx-next-button').hide();
                if ( ! this.model.allowTitleEdit )
                    this.$('.wx-edit-title-div').hide();
            }

            // Once the reveal modal is open...
            var me = this.$el;
            meeeee = me;
            this.$el.on('opened', function() {
                me.foundation('section', 'reflow');

                // Alright, now let's set the height of the right-hand side to the height of the left-hand side
                // var currentModal = $('.reveal-modal.open');
                // Get the height of the current modal.
                var height = me.height();
                height -= 115;   // Account for margins & padding.
                if (height < 315)
                    height = 315;

                me.find('.previewTabs div.content').height( height );

                // Put the cursor in the first text box
                me.find('input[type=text]:first').focus();
            });

            return this;
        },

	    closeReveal: function() {
		    this.$el.foundation('reveal', 'close');
	    },

        close: function() {
            this.undelegateEvents();
        },

        startValidation: function() {
            if ( undefined !== this.$('form').validate ) {
                this.$('form').validate();
            }
        },

        contentChange: function(ev) {
            this.hideValidateFeed();
        },

        setParentViewContainerId: function(containerId) {
            this.parentContainerId = containerId;
        },

		finish: function() {
            if ( this.validate() ) {
                this.setModelFromView(this.model);
                this.setTitleFromView(this.model);
                this.setIconFromView(this.model);
                var shouldRebuild = this.saveModel();
                
                this.$el.foundation('reveal', 'close');
                
                // This if statement is currently for 'map' tabs. Because the 
                // 'map' tab just adds to the same 'tab' (ie, there's only one
                // actual tab in the app), we don't need to rebuild the app,
                // just refresh it.
                if ( shouldRebuild )
                    wx.rebuildApp();
                else
                    wx.refreshAppPreview();
            }
		},

        validate: function() {
            // This can be overridden in child sub tabs.
            return true;
        },

		next: function() {
            if ( !this.model.validateFeed ) { return; }

            this.$('#dialog-loader').show();
            
            if ( undefined !== this.$('form') && undefined != this.$('form').validate ) {
                var validator = this.$('form').validate();

                if ( this.$('form').valid() ) {
                    this.validateFeed();
                } else {
                    alert( 'Error count: ' + validator.errorList.length );
                }
            } else {
			    this.validateFeed();
            }
		},

		saveModel: function() {
            return this.model.save();
		},

        editTitle: function( ev ) {
            // This is really only needed for Form Builder.
            if ( $('.wx-validate-feed.panel').length ) {
                $('.wx-validate-feed.panel > h3').text( $( ev.currentTarget ).val() );
            }
        },

        setTitleFromView: function( model ) {
            if ( model.allowTitleEdit && this.$('.wx-edit-title').val() )
                model.set('title', this.$('.wx-edit-title').val() );
            return model;
        },

        setIconFromView: function( model ) {
            var icon = this.$('input:radio[name="wx-icon"]:checked').val();

            if ( icon ) {
                model.set( 'icon_id', null );
                model.set( 'icon', icon );
            }
            return model;
        },

        setModelFromView: function(model) {
            // Override for each edit type depending on features required and the view
        },

		validateFeed: function() {
            var me = this;
			// copy the model to validate with the server, without updating the existing model
            var modelCopy = this.getModelCopy();
            this.setModelFromView(modelCopy);
			this.getFeedSample(modelCopy, function(response) { me.checkFeedSample(response); });
		},

        getModelCopy: function() {
            var modelCopy = $.extend( true, {}, this.model );
            return modelCopy;
        },

		checkFeedSample: function(feedSample) {
			if ( typeof feedSample != 'undefined' && feedSample.success && typeof feedSample.feed != 'undefined' ) {
				this.$('#dialog-loader').hide();
                this.$('.wx-feed-error').hide();
				this.displayFeedSample( feedSample );
				this.$('.wx-next-button').hide();
				this.$('.wx-finish-button').show();
                if ( this.model.allowTitleEdit )
                    this.$('.wx-edit-title-div').show();
			} else
				this.$('.wx-feed-error').show();
		},

		displayFeedSample: function(feedSample) {
			var me = this;
			this.$('.wx-validate-feed').show();
			if ( ! feedSample.feed.length ) {
				this.$('.wx-validate-feed').html('No content added yet?');
			} else {
				this.$('.wx-validate-feed').html('<ul></ul>');
				for ( var index = 0; index < feedSample.feed.length; index++ ) {
					this.$('.wx-validate-feed ul').append( me.feedSampleTpl( feedSample.feed[index] ) );
				}
			}
		},

		hideValidateFeed: function() {
			this.$('.wx-feed-error').hide();
			this.$('.wx-validate-feed').html('<div class="panel wx-preview"><h3 class="wx-preview-msg">preview</h3></div>');
			this.$('.wx-next-button').show();
			this.$('.wx-finish-button').hide();
            this.$('.wx-edit-title-div').hide();
		},

		getFeedSample: function(model, callback) {
			var data = model.getAPIData();
			data.api_check = 1;
			data.confirm_feed = 1;
            $.ajax({
				url: wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey,
				datatype: 'JSON',
				data: data,
				success: function(response) {
                    callback(response);
				}
			});
		},

        destroyView: function() {
            this.undelegateEvents();
            this.$el.removeData().unbind();
            // this.remove();
            // Backbone.View.prototype.remove.call( this );
        }
    });
})(jQuery);
