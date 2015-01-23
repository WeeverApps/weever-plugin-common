// views/formbuilder.control.checkbox.fieldset.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlCheckboxFieldsetView = wxApp.FormBuilderControlBaseFieldsetView.extend({
		tplSelector: '#form-builder-checkbox-fieldset',

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlCheckboxFieldsetPreview({ model: this.model });
			}
			return this.preview;
		},

		addOption: function( ev ) {
			ev.preventDefault();
			this.model.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox() );
		},

		render: function() {
			wxApp.FormBuilderControlBaseFieldsetView.prototype.render.apply( this );
			var checkboxGroupView = new wxApp.FormBuilderControlCheckboxGroupView({
				collection: this.model.get( 'checkboxGroup' ),
				previewArea: this.getPreview()
			});

			this.$( '.wx-form-builder-checkbox-fieldset' ).append( checkboxGroupView.render().el );
			return this;
		}

	});

	wxApp.FormBuilderControlCheckboxFieldsetPreview = wxApp.FormBuilderControlBaseFieldsetPreview.extend({
		selector: '#form-builder-checkbox-fieldset-preview'
	});
})(jQuery);
