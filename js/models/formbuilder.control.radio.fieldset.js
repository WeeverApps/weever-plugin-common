// models/formbuilder.control.radio.fieldset.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlRadioFieldset = Backbone.Model.extend({
		preview: null,

		defaults: {
			control: 'radiofieldset',
			title: 'Select a choice',
			allowAdditional: '',
			allowAdditionalClass: 'hide',
			requiredClass: '',
			name: ''
		},

		initialize: function() {
			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'radioGroup', new wxApp.FormBuilderControlRadioGroup() );
			this.get( 'radioGroup' ).on( 'add', this.onRadioGroupAdd, this );
			return this;
		},

		onRadioGroupAdd: function( checkbox ) {
			checkbox.get( 'attributes' ).set( 'name', this.get( 'name' ) );
		}

	});

})(jQuery);
