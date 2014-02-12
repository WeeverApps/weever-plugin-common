
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlSignatureView = wxApp.FormBuilderControlView.extend({
		tplSelector: '#form-builder-signature',
		preview: null,

		initialize: function() {
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
						
			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				// We need to add this 1ms delay for Chrome and Safari, as otherwise the focus doesn't really happen.
				setTimeout( function() { this.$('.wx-form-builder-label-input').focus(); }, 1);
				this.firstRender = false;
			}

			return this;
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlSignaturePreview({ model: this.model });
			}
			return this.preview;
		}

	});

	wxApp.FormBuilderControlSignaturePreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-signature-preview';
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