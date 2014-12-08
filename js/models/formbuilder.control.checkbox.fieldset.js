// models/formbuilder.control.checkbox.fieldset.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlCheckboxFieldset = Backbone.Model.extend({

		defaults: {
			control: 'checkboxfieldset',
			title: 'Check all that apply',
			allowAdditional: '',
			allowAdditionalClass: 'hide',
			requiredClass: '',
			name: ''
		},

		initialize: function() {
			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'checkboxGroup', new wxApp.FormBuilderControlCheckboxGroup() );
			return this;
		}

	});

})(jQuery);
