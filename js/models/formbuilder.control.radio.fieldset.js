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

		// TODO - See if we can't eliminate some of the duplication with the checkboxFieldset init.
		initialize: function( properties ) {
			var radioGroup = new wxApp.FormBuilderControlRadioGroup();

			if ( properties.radioGroup === undefined || properties.radioGroup.length === 0 ) {
				radioGroup.add( new wxApp.FormBuilderControlRadio( { label: 'Option A' } ) );
				radioGroup.add( new wxApp.FormBuilderControlRadio( { label: 'Option B' } ) );
				radioGroup.add( new wxApp.FormBuilderControlRadio( { label: 'Option C' } ) );
			}
			else {
				for (var i = 0; i < properties.radioGroup.length; i++) {
					var optionJson = properties.radioGroup[i],
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

					option = new wxApp.FormBuilderControlRadio( optionJson );
					radioGroup.add( option );
				};
			}

			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'radioGroup', radioGroup );
			return this;
		}
	});

})(jQuery);
