
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

	wxApp.FormBuilderControlPagebreakPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-pagebreak-preview';
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