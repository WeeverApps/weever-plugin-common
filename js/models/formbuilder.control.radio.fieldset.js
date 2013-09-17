// models/formbuilder.control.radio.fieldset.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlRadioFieldset = Backbone.Model.extend({

		defaults: {
			control: 'radiofieldset',
			title: 'Radio Fieldset',
			allowAdditional: '',
			allowAdditionalClass: ''
		},

		initialize: function() {
			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'radioGroup', new wxApp.FormBuilderControlRadioGroup() );
			//console.log(this);
			return this;
		}

	});

})(jQuery);
