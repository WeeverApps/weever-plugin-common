// models/formbuilder.control.checkbox.fieldset.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlCheckboxFieldset = Backbone.Model.extend({

		defaults: {
			control: 'checkboxfieldset',
			title: 'Checkbox Fieldset',
			allowAdditional: '',
			allowAdditionalClass: ''
		},

		initialize: function() {
			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'checkboxGroup', new wxApp.FormBuilderControlCheckboxGroup() );
			console.log(this);
			return this;
		}

	});

})(jQuery);
