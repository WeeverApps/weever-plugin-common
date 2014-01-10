
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlInputView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-input',
		preview: null,

		initialize: function( options ) {
			options.type = (typeof options.type == 'undefined' ? 'input' : options.type );
			var $template = $( this[options.type + 'TplSelector'] );
			this.inputTpl = _.template( $template.html() );
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlInputPreview({ model: this.model });
			}
			return this.preview;
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
		}
	});

	wxApp.FormBuilderControlInputPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-input-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			if ( model.attributes.attributes.min )
				this.$('input').attr('min', model.attributes.attributes.min );
			if ( model.attributes.attributes.max )
				this.$('input').attr('max', model.attributes.attributes.max );
			if ( model.attributes.attributes.step )
				this.$('input').attr('step', model.attributes.attributes.step );
			if ( model.attributes.attributes.value )
				this.$('input').attr('value', model.attributes.attributes.value );
			return this;
		}
	});
	
})(jQuery);