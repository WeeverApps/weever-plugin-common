
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlTextRangeView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-text-range',
		preview: null,

		initialize: function( options ) {
			options.type = (typeof options.type == 'undefined' ? 'input' : options.type );
			var $template = $( this[options.type + 'TplSelector'] );
			this.inputTpl = _.template( $template.html() );

			if ( !this.model.options ) 
				this.model.set( 'options', new wxApp.FormBuilderControlTextSliderOptions() );
			this.model.get( 'options' ).bind('add', this.addOne, this);
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlTextRangePreview({ model: this.model });
			}
			return this.preview;
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		},

		addOne: function(newOption) {
			var view = new wxApp.FormBuilderControlTextSliderOptionView({
				model: newOption
			});

			this.$('.options').append( view.render().el );
			this.getPreview().$('ul').append( view.getPreview().render().el );
		}
	});

	wxApp.FormBuilderControlTextRangePreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-text-range-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var model = this.model.toJSON();
			moedel = model;

			this.$el.html( this.inputTpl( model ) );
			// if ( model.attributes.attributes.min )
			// 	this.$('input').attr('min', model.attributes.attributes.min );
			// if ( model.attributes.attributes.max )
			// 	this.$('input').attr('max', model.attributes.attributes.max );
			// if ( model.attributes.attributes.step )
			// 	this.$('input').attr('step', model.attributes.attributes.step );
			// if ( model.attributes.attributes.value )
			// 	this.$('input').attr('value', model.attributes.attributes.value );
			return this;
		}
	});
	
})(jQuery);