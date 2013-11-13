// views/formbuilder.control.option.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlOptionView = wxApp.FormBuilderControlView.extend({
		className: 'row',
		preview: null,

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				// 'click .wx-form-builder-add-select-option': 'addOption',
				'keyup .wx-form-builder-select-option-text': 'updateOptionText',
				'blur .wx-form-builder-select-option-value': 'updateOptionValue',
				'click .wx-form-builder-control-selected': 'setSelected'
			});
		},

		initialize: function() {
			this.selectTpl = _.template( $('#form-builder-select-option').html() );
//			this.model.bind('change', this.render, this);
		},

		render: function() {
			console.log('select view render');
			this.$el.html( this.selectTpl( this.model.toJSON() ) );
			return this;
		},

		// addOption: function() {
		// 	console.log('select view add');
		// 	this.model.collection.add( new wxApp.FormBuilderControlOption() );
		// 	console.log(this.model.collection);
		// },

		setSelected: function( ev ) {
			console.log('setSelected');
			this.model.collection.models.forEach( function( control ) {
				control.get( 'attributes' ).unset( 'selected' );
			});
			this.model.get( 'attributes' ).set( 'selected', 'checked' );
			this.model.trigger( 'change' );
		},

		updateOptionText: function( ev ) {
			var $me = $( ev.currentTarget );
			this.model.set({
				innerText: $me.val()
			});
		},

		updateOptionValue: function( ev ) {
			var $me = $( ev.currentTarget );
			if ( $me.val() != '' )
				this.model.get( 'attributes' ).set( 'value', $me.val() );
			this.model.trigger( 'change' );
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlOptionPreview({ model: this.model });
			}
			return this.preview;
		}
	});


	wxApp.FormBuilderControlOptionPreview = Backbone.View.extend({
		tagName: 'option',

		initialize: function() {
			// var selector = '#form-builder-select-preview';
			// var $template = $( selector );
			// this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.model.get('innerText') );
			this.$el.attr('value', this.model.get('attributes').get('value'));

			if ( this.model.get( 'attributes' ).get( 'selected' ) ) {
				this.$el.attr('selected', 'selected');
			}

			return this;
		}
	});
})(jQuery);
