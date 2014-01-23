wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlCheckboxView = wxApp.FormBuilderControlBaseView.extend({
		tplSelector: '#form-builder-checkbox',

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlCheckboxPreview({ model: this.model });
			}
			return this.preview;
		},

		setChecked: function( ev ) {
			if ( this.model.get( 'attributes' ).get( 'checked' ) ) {
				this.model.get( 'attributes' ).unset( 'checked' );
			} else {
				this.model.get( 'attributes' ).set( 'checked', 'checked' );
			}
			this.model.trigger('change');
		}
	});


	wxApp.FormBuilderControlCheckboxPreview = wxApp.FormBuilderControlBasePreview.extend({
		selector: '#form-builder-checkbox-preview'
	});
})(jQuery);