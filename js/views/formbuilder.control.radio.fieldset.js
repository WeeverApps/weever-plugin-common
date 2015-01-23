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

		addOption: function( ev ) {
			ev.preventDefault();
			this.model.get( 'radioGroup' ).add( new wxApp.FormBuilderControlRadio() );
		},

		render: function() {
			wxApp.FormBuilderControlBaseFieldsetView.prototype.render.apply( this );
			var radioGroupView = new wxApp.FormBuilderControlRadioGroupView({
				collection: this.model.get( 'radioGroup' ),
				previewArea: this.getPreview()
			});

			this.$( '.wx-form-builder-radio-fieldset' ).append( radioGroupView.render().el );
			return this;
		}

	});

	wxApp.FormBuilderControlRadioFieldsetPreview = wxApp.FormBuilderControlBaseFieldsetPreview.extend({
		selector: '#form-builder-radio-fieldset-preview'
	});
})(jQuery);
