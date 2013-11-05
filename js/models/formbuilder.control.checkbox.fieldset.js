// models/formbuilder.control.checkbox.fieldset.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlCheckboxFieldset = Backbone.Model.extend({

		defaults: {
			control: 'checkboxfieldset',
			title: 'Checkbox Fieldset',
			allowAdditional: '',
			allowAdditionalClass: '',
			name: ''
		},

		initialize: function() {
			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'checkboxGroup', new wxApp.FormBuilderControlCheckboxGroup() );
			this.get( 'checkboxGroup' ).on( 'add', this.onCheckboxGroupAdd, this );
			console.log(this);
			return this;
		},

		onCheckboxGroupAdd: function( checkbox ) {
			console.log( 'onCheckboxGroupAdd' );
			checkbox.get( 'attributes' ).set( 'name', this.get( 'name' ) );
		}

	});

})(jQuery);
