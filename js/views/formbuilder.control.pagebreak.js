
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlPagebreakView = wxApp.FormBuilderControlView.extend({
		tplSelector: '#form-builder-pagebreak',
		preview: null,

		initialize: function() {
			console.log('formbuildercontrolpagebreakview init');
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );
		},

		render: function() {
			console.log('formbuildercontrolpagebreakview render');
			var modelJSON = this.model.toJSON();
			var inputTpl = this.inputTpl( modelJSON );
			this.$el.html( inputTpl );

			return this;
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlPagebreakPreview({ model: this.model });
			}
			return this.preview;
		}

	});

	wxApp.FormBuilderControlPagebreakPreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-pagebreak-preview'
	});

})(jQuery);