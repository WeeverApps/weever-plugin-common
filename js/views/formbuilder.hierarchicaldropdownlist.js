
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderHierarchicalDropDownListView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-hierarchical-drop-down-list',
		preview: null,

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'change .wx-hdd-levels'       : 'changeLevels',
                'click .wx-hdd-add-option'    : 'addOption',
                'input .wx-form-builder-title': 'changeTitle',
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
console.log( 'render', this.model.toJSON() );
			this.$el.html( this.inputTpl( this.model.toJSON() ) );

            var hddOptionsView = new wxApp.FormBuilderHierarchicalDropDownListOptionsView({
                collection: this.model.get('options') ,
                level     : 0,
                titles    : this.model.get('titles')
                // previewArea: this.getPreview()
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

        addOption: function( ev ) {
console.log('addOption (top level)');
            ev.preventDefault();
            this.model.get( 'options' ).add( new wxApp.FormBuilderHierarchicalDropDownListOption() );
            this.render();
        },

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
            this.$('.wx-hdd-add-option-' + level).text( 'Add ' + title );
        }

		/* Endof event callbacks */
	});


	wxApp.FormBuilderHierarchicalDropDownListPreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-hierarchical-drop-down-list-preview',

		// initialize: function (attrs, options) {
	 //        wxApp.FormBuilderControlPreview.prototype.initialize.apply(this, arguments); // call super constructor
	 //    },

		// render: function() {
		// 	var me    = this,
		// 	    model = me.model.toJSON();
		// 	me.$el.html( me.inputTpl( model ) );
		// 	return me;
		// }
	});

    wxApp.FormBuilderHierarchicalDropDownListOptionsView = Backbone.View.extend({
        tagName: 'fieldset',
        className: 'wx-hdd-option-group',

        initialize: function( options ) {
console.log( 'options', options );
            this.titles = options.titles;
            this.level = options.level;

            this.template = _.template( $('#form-builder-hdd-options').html() );
            this.collection.bind('add', this.addOne, this);
            this.previewArea = options.previewArea;
        },

        render: function() {
console.log( 'titles', this.titles );
            this.$el.html( this.template( { level: this.level, titles: this.titles } ) );

            for (var i = 0; i < this.collection.length; i++) {
                var model = this.collection.at( i );
                this.addOne( model )
            };
            this.collection.bind('add', this.addOne, this);

            return this;
        },

        addOne: function( option ) {
console.log('addOne', option);

            var view = new wxApp.FormBuilderHierarchicalDropDownListOptionView({
                model : option,
                level : this.level,
                titles: this.titles
            });

            this.$('.wx-hdd-options').append( view.render().el );

            // this.previewArea.$('select').append( view.getPreview().render().el );
        }

    });

    wxApp.FormBuilderHierarchicalDropDownListOptionView = Backbone.View.extend({
        className: 'wx-hdd-option',

        events: function() {
            return {
                'click .wx-hdd-add-option': 'addOption'
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

            var hddOptionsView = new wxApp.FormBuilderHierarchicalDropDownListOptionsView({
                collection: this.model.get('children') ,
                level     : this.level+1,
                titles    : this.titles //,
                // previewArea: this.getPreview()
            });

            // Add Option Group to Select
            this.$( '.wx-form-builder-children' ).append( hddOptionsView.render().el );


            return this;
        },

        addOption: function( ev ) {
console.log('addOption (lower)');
            ev.preventDefault();
            ev.stopImmediatePropagation();

            this.model.get('children').add( new wxApp.FormBuilderHierarchicalDropDownListOption() );
            this.render();
        }
    });

})(jQuery);
