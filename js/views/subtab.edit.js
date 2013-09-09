
wxApp = wxApp || {};

(function($){
    wxApp.SubTabEditView = Backbone.View.extend({
        className: 'wx-subtab-edit',
        subTabEditTplSelector: '#subtab-edit-template',
        subTabEditHeaderTplSelector: '#subtab-edit-header-template',
        subTabEditFooterTplSelector: '#subtab-edit-footer-template',
		feedSampleTplSelector: '#feedsample-template',
        parentContainerId: false,
        el: '#wx-edit-area',

        initialize: function() {
            this.initializeEvents();
            // TODO: Listen to changes to the subTab model and re-render the view automatically?
            this.subTabEditTpl = _.template( $(this.subTabEditTplSelector).html() );
            this.subTabEditHeaderTpl = _.template( $(this.subTabEditHeaderTplSelector).html() );
            this.subTabEditFooterTpl = _.template( $(this.subTabEditFooterTplSelector).html() );
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
			'change .wx-dialog-input': 'hideValidateFeed',
			'keydown .wx-dialog-input': 'hideValidateFeed',
            'click a.close-reveal-modal': 'destroyView',
			'click .wx-finish-button': 'finish',
			'click .wx-next-button': 'next',
            'change .wx-content-radio' : 'contentChange'
        },

        render: function() {
            alert('Testing...');
            alert(this.$el.html());
            //alert(this.html());
            alert('Testing 2...');

            /*this.$('#wx-edit-area').html( '<form>' + this.subTabEditTpl( this.model.toJSON() ) + '</form>' );

            //alert( $('#wx-edit-area').html() );
            this.$('#wx-edit-area').prepend( this.subTabEditHeaderTpl( this.model.toJSON() ) );
            this.$('#wx-edit-area').append( this.subTabEditFooterTpl( this.model.toJSON() ) );
            this.startValidation();
			if ( this.model.validateFeed ) {
				this.$('#wx-edit-area').find('.wx-finish-button').hide();
                this.$('#wx-edit-area').find('.wx-edit-title-div').hide();
            } else {
				this.$('#wx-edit-area').find('.wx-next-button').hide();
                if ( ! this.model.allowTitleEdit )
                    this.$('#wx-edit-area').find('.wx-edit-title-div').hide();
            }*/

            this.$el.html( '<form>' + this.subTabEditTpl( this.model.toJSON() ) + '</form>' );

            //alert( $('#wx-edit-area').html() );
            this.$el.prepend( this.subTabEditHeaderTpl( this.model.toJSON() ) );
            this.$el.append( this.subTabEditFooterTpl( this.model.toJSON() ) );
            this.startValidation();
            if ( this.model.validateFeed ) {
                this.$el.find('.wx-finish-button').hide();
                this.$el.find('.wx-edit-title-div').hide();
            } else {
                this.$el.find('.wx-next-button').hide();
                if ( ! this.model.allowTitleEdit )
                    this.$el.find('.wx-edit-title-div').hide();
            }
            return this;
        },

        startValidation: function() {
            if ( undefined !== this.$('form').validate ) {
                this.$('form').validate();
            }
        },

        contentChange: function(ev) {
            this.hideValidateFeed();
            this.changeDescriptions();
        },

        // Override this based on what should hide/show when content radio is changed (ie. help text)
        changeDescriptions: function() {

        },

        setParentViewContainerId: function(containerId) {
            this.parentContainerId = containerId;
        },

        show: function() {
            var me = this;
            wx.log('adding html');

            /*if ( undefined != this.$('#wx-edit-area').dialog ) {
                this.$('#wx-edit-area').dialog({
                    modal: 		true,
                    resizable: 	false,
                    width: 		'80%',
                    height: 	'auto',
                    show:		'fade',
                    hide:		'drop',
					dialogClass: 'wp-dialog'
                });
            }*/
        },

		finish: function() {
            console.log('Finish clicked.');
            this.setModelFromView(this.model);
            this.setTitleFromView(this.model);
			this.saveModel();
		},

		next: function() {
            if ( undefined !== this.$('form') && undefined != this.$('form').validate ) {
                if ( this.$('form').valid() )
                    this.validateFeed();
            } else {
			    this.validateFeed();
            }
		},

		saveModel: function() {
            this.model.save();
		},

        setTitleFromView: function( model ) {
            if ( model.allowTitleEdit && this.$('.wx-edit-title') )
                model.set('title', this.$('.wx-edit-title').val() );
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
			wx.log('displayFeedSample ***');
			wx.log(feedSample);
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
			this.$('.wx-validate-feed').hide().html('');
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
            try {
                this.$('#wx-edit-area').dialog('close');
            } catch ( e ) {

            }
            this.undelegateEvents();
            this.$('#wx-edit-area').removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call( this );
        }
    });
})(jQuery);