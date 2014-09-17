// views/formbuilder.control.option.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlOptionView = wxApp.FormBuilderControlView.extend({
		className: 'row',
		preview: null,

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'keyup .wx-form-builder-select-option-text': 'updateOptionText',
				'blur .wx-form-builder-select-option-value': 'updateOptionValue',
				'click .wx-form-builder-control-selected': 'setSelected'
			});
		},

		initialize: function() {
			this.selectTpl = _.template( $('#form-builder-select-option').html() );
		},

		render: function() {
			var text = this.model.get('innerText').toString();
			if ( text === '[object Object]' ) {
				// innerText seems to be some sort of wacky 
				// reserved keyword in backbone, so we have 
				// to get it the "old fashioned" way.
				text = this.model.attributes.innerText.innerText;
			}
			var jsonModel = this.model.toJSON();
			jsonModel.innerText = text;

			this.$el.html( this.selectTpl( jsonModel ) );
			return this;
		},

		deleteControl: function() {
			console.log( 'deleteControl' );
			this.getPreview().remove();
			this.remove();
			this.model.destroy();
		},

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
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var text = this.model.get('innerText').toString();
			if ( text === '[object Object]' ) {
				// innerText seems to be some sort of wacky 
				// reserved keyword in backbone, so we have 
				// to get it the "old fashioned" way.
				text = this.model.attributes.innerText.innerText;
			}

			this.$el.html( text );
			this.$el.attr('value', this.model.get('attributes').get('value'));

			if ( this.model.get( 'attributes' ).get( 'selected' ) ) {
				this.$el.attr('selected', 'selected');
			}

			return this;
		}
	});
})(jQuery);
