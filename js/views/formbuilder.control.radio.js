wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioView = wxApp.FormBuilderControlBaseView.extend({
		tplSelector: '#form-builder-radio',

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlRadioPreview({ model: this.model });
			}
			return this.preview;
		},

		setChecked: function( ev ) {
			this.model.collection.models.forEach( function( control ) {
				control.get( 'attributes' ).unset( 'checked' );
			});
			this.model.get( 'attributes' ).set( 'checked', 'checked' );
			this.model.trigger('change');
		}
	});


	wxApp.FormBuilderControlRadioPreview = wxApp.FormBuilderControlBasePreview.extend({
		selector: '#form-builder-radio-preview'
	});
})(jQuery);