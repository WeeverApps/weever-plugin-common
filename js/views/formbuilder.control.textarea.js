
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlTextareaView = wxApp.FormBuilderControlView.extend({
		preview: null,

		initialize: function() {
			this.inputTpl = _.template( $('#form-builder-textarea').html() );
			// this.model.bind('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlTextareaPreview({ model: this.model });
			}
			return this.preview;
		}

	});

	wxApp.FormBuilderControlTextareaPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-textarea-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			return this;
		}
	});
	
})(jQuery);
