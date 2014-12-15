
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlPagebreakView = wxApp.FormBuilderControlView.extend({
		tplSelector: '#form-builder-pagebreak',
		preview: null,

		initialize: function() {
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );
		},

		render: function() {
			var modelJSON = this.model.toJSON();
			var inputTpl = this.inputTpl( modelJSON );
			this.$el.html( inputTpl );

			return this;
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlPreview({
					model: this.model,
					selector: '#form-builder-pagebreak-preview'
				});
			}
			return this.preview;
		}

	});

})(jQuery);