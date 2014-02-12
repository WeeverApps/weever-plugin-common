// views/formbuilder.control.radio.fieldset.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioFieldsetView = wxApp.FormBuilderControlBaseFieldsetView.extend({
		tplSelector: '#form-builder-radio-fieldset',

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlRadioFieldsetPreview({ model: this.model });
			}
			return this.preview;
		},

		addOption: function() {
			this.model.get( 'radioGroup' ).add( new wxApp.FormBuilderControlRadio() );
		}

	});

	wxApp.FormBuilderControlRadioFieldsetPreview = wxApp.FormBuilderControlBaseFieldsetPreview.extend({
		selector: '#form-builder-radio-fieldset-preview'
	});
})(jQuery);
