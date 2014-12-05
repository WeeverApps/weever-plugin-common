
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderHierarchicalDropDownListView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-hierarchical-drop-down-list',
		preview: null,

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'change .wx-hdd-levels'       : 'changeLevels',
                'input .wx-form-builder-title': 'changeTitle'
			});
		},

		initialize: function( options ) {
			var $template = $( this.inputTplSelector );
			this.inputTpl = _.template( $template.html() );
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderHierarchicalDropDownListPreview({ model: this.model });
			}
			return this.preview;
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );

            var hddOptionsView = new wxApp.FormBuilderHierarchicalDropDownListOptionsView({
                collection : this.model.get('options'),
                level      : 0,
                titles     : this.model.get('titles'),
                previewArea: this.getPreview()
            });

            // Add Option Group to Select
            this.$( '.wx-form-builder-children' ).append( hddOptionsView.render().el );

			// if ( this.firstRender ) {
			// 	// Focus on the label the first time you render this control.
			// 	setTimeout( function() { this.$('.wx-form-builder-label-input').focus(); }, 1);
			// 	this.firstRender = false;
			// }

			return this;
		},

		/* Start event callbacks */

        changeLevels: function( ev ) {
            var value = $( ev.currentTarget ).val();
            value = parseInt( value );
            this.model.set( 'levels', value );
            this.render();
        },

        changeTitle: function( ev ) {
            var textBox = $( ev.currentTarget ),
                level   = textBox.data('level-title'),
                title   = textBox.val();
            level = parseInt( level );
            this.model.get( 'titles' )[ level ] = title;
            this.model.trigger('change');

            // Change link and fieldset legend
            this.$('.wx-hdd-add-option-' + level).html( '&plus; add new ' + title.toLowerCase() );
            this.$('.wx-hdd-legend-' + level).html( title );    // TODO -> Pluralize?
        }

		/* Endof event callbacks */
	});


	wxApp.FormBuilderHierarchicalDropDownListPreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-hierarchical-drop-down-list-preview',

        events: function() {
            return _.extend( {}, wxApp.FormBuilderControlPreview.prototype.events, {
                'change .wx-hdd-dropdown-preview' : 'changeDropDown'
            });
        },

		initialize: function (attrs, options) {
	        wxApp.FormBuilderControlPreview.prototype.initialize.apply(this, arguments); // call super constructor
            this.model.get('options').bind('change', this.render, this);
	    },

		render: function() {
            var me    = this,
                model = me.model.toJSON();

			me.$el.html( me.inputTpl( model ) );
			return me;
        },

        changeDropDown: function( ev ) {
            ev.preventDefault();
            ev.stopImmediatePropagation();

            var ddlChanged   = $( ev.currentTarget ),
                list         = this.model.get('options'),
                levelChanged = parseInt( ddlChanged.data('level') ),
                currentLevel = 0;

            while ( currentLevel <= levelChanged ) {
                var ddl         = this.$( '.wx-hdd-dropdown-preview-' + currentLevel.toString() ),
                    selectedOpt = null;

                for (var i = 0; i < list.length; i++) {
                    var option = list.at(i);
                    if ( option.get('value') === ddl.val() ) {
                        selectedOpt = option;
                        break;
                    }
                };

                if ( selectedOpt ) {
                    list = selectedOpt.get('children');
                }

                currentLevel++;
            }

            var nextDdl = this.$( '.wx-hdd-dropdown-preview-' + currentLevel.toString() );
            nextDdl.html('<option>Select One</option>');   // Remove existing children
            for (var i = 0; i < list.length; i++) {
                var child = list.at( i );
                nextDdl.append(new Option( child.get('text'), child.get('value') ));
            }
        }
	});

    wxApp.FormBuilderHierarchicalDropDownListOptionsView = Backbone.View.extend({
        className: 'wx-hdd-option-group',

        events: function() {
            return {
                'click .wx-hdd-add-option'          : 'addOption'
            };
        },

        initialize: function( options ) {
            this.titles = options.titles;
            this.level = options.level;

            this.template = _.template( $('#form-builder-hdd-options').html() );
            this.collection.bind('add', this.addOne, this);
            this.collection.bind('remove', this.render, this);
            this.previewArea = options.previewArea;
        },

        render: function() {
            this.$el.html( this.template( { level: this.level, titles: this.titles } ) );
            this.$el.css( {'padding-left': this.level.toString() + 'em' } );

            for (var i = 0; i < this.collection.length; i++) {
                var model = this.collection.at( i );
                this.addOne( model )
            }

            return this;
        },

        addOption: function( ev ) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            var option = new wxApp.FormBuilderHierarchicalDropDownListOption();
            if ( this.level !== (this.titles.length-1) ) {
                option.get('children').add( new wxApp.FormBuilderHierarchicalDropDownListOption({ text: 'Option A' }) );
                option.get('children').add( new wxApp.FormBuilderHierarchicalDropDownListOption({ text: 'Option B' }) );
                option.get('children').add( new wxApp.FormBuilderHierarchicalDropDownListOption({ text: 'Option C' }) );
            }
            this.collection.add( option );
        },

        addOne: function( option ) {
            var view = new wxApp.FormBuilderHierarchicalDropDownListOptionView({
                model : option,
                level : this.level,
                titles: this.titles
            });

            this.$('.wx-hdd-options-' + this.level).append( view.render().el );
        }
    });

    wxApp.FormBuilderHierarchicalDropDownListOptionView = Backbone.View.extend({
        className: 'wx-hdd-option',

        events: function() {
            return {
                'input .wx-form-builder-option-text' : 'updateText',
                'input .wx-form-builder-option-value': 'updateValue',
                'click .wx-hdd-delete-option'        : 'deleteOption'
            };
        },

        initialize: function( options ) {
            this.titles = options.titles;
            this.level = options.level;

            this.template = _.template( $('#form-builder-hdd-option').html() );
        },

        render: function() {
            var modelJson = this.model.toJSON();
            modelJson.level = this.level;
            modelJson.titles = this.titles;

            this.$el.html( this.template( modelJson ) );

            if ( this.titles.length > (this.level+1) ) {
                var hddOptionsView = new wxApp.FormBuilderHierarchicalDropDownListOptionsView({
                    collection: this.model.get('children'),
                    level     : this.level+1,
                    titles    : this.titles
                });

                // Add Option Group to Select
                this.$( '.wx-form-builder-children' ).append( hddOptionsView.render().el );
            }

            return this;
        },

        deleteOption: function( ev ) {
            ev.preventDefault();
            ev.stopImmediatePropagation();

            var deleteMsg = 'This will delete this ' + this.titles[ this.level ].toLowerCase();
            if ( this.level < (this.titles.length-1) )
                deleteMsg += ' and all of its children';
            deleteMsg += '. Are you sure you wish to continue?';
            if ( confirm( deleteMsg ) )
                this.model.destroy();
        },

        updateText: function( ev ) {
            ev.stopImmediatePropagation();

            var text = $( ev.currentTarget ).val();
            this.model.set('text', text);
        },

        updateValue: function( ev ) {
            ev.stopImmediatePropagation();

            var text = $( ev.currentTarget ).val();
            this.model.set('value', text);
        }
    });

})(jQuery);
