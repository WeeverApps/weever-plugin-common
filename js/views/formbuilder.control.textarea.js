
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlTextareaView = wxApp.FormBuilderControlView.extend({
		preview: null,

		initialize: function() {
			this.inputTpl = _.template( $('#form-builder-textarea').html() );
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );

			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				// We need to add this 1ms delay for Chrome and Safari, as otherwise the focus doesn't really happen.
				setTimeout( function() { this.$('.wx-form-builder-label-input').focus().select(); }, 1);
				this.firstRender = false;
			}

			return this;
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlTextareaPreview({ model: this.model });
			}
			return this.preview;
		}

	});

	wxApp.FormBuilderControlTextareaPreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-textarea-preview'
	});
	
})(jQuery);
