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

		// TODO - See if we can't eliminate some of the duplication with the radioFieldset init.
		initialize: function( properties ) {
			var checkboxGroup = new wxApp.FormBuilderControlCheckboxGroup();

			if ( properties.checkboxGroup === undefined || properties.checkboxGroup.length === 0 ) {
				checkboxGroup.add( new wxApp.FormBuilderControlCheckbox({label: 'Option A'}) );
				checkboxGroup.add( new wxApp.FormBuilderControlCheckbox({label: 'Option B'}) );
				checkboxGroup.add( new wxApp.FormBuilderControlCheckbox({label: 'Option C'}) );
			}
			else {
				for (var i = 0; i < properties.checkboxGroup.length; i++) {
					var optionJson = properties.checkboxGroup[i],
					    option = null;

					// Delete old, unneeded properties.
					if ( typeof optionJson.valueType === 'string' ) {
						delete optionJson.type;
						delete optionJson.hidePlaceholderClass;
						delete optionJson.showPlaceholder;
						delete optionJson.innerText;
						delete optionJson.allowAdditional;
						delete optionJson.allowAdditionalClass;
						delete optionJson.valueType;
						delete optionJson.valueClass;
						delete optionJson.minClass;
						delete optionJson.maxClass;
						delete optionJson.stepClass;
						delete optionJson.multiClass;
						delete optionJson.requiredClass;
						delete optionJson.autocompleteClass;
						delete optionJson.emailOptionClass;
						delete optionJson.optionSendPDF;
					}

					option = new wxApp.FormBuilderControlCheckbox( optionJson );
					checkboxGroup.add( option );
				};
			}

			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'checkboxGroup', checkboxGroup );
			return this;
		}

	});

})(jQuery);
