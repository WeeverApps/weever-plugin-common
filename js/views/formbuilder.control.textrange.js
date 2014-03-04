
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlTextRangeView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-text-range',
		preview: null,
		hasRendered: false,

		initialize: function( options ) {
			options.type = (typeof options.type == 'undefined' ? 'input' : options.type );
			var $template = $( this[options.type + 'TplSelector'] );
			this.inputTpl = _.template( $template.html() );

			var sliderOptions = this.model.get( 'options' ) || [];

			this.model.set( 'options', new wxApp.FormBuilderControlTextSliderOptions() );

			this.model.get( 'options' ).bind('add', this.addOne, this);

			if ( sliderOptions.length > 0 ) {
				var me = this;
				sliderOptions.forEach( function( sliderOption ) {
					console.log( 'sliderOption', sliderOption );
					me.model.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( sliderOption ) );
				} );
			}
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlTextRangePreview({ model: this.model });
			}
			return this.preview;
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			this.hasRendered = true;
						
			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				// We need to add this 1ms delay for Chrome and Safari, as otherwise the focus doesn't really happen.
				setTimeout( function() { this.$('.wx-form-builder-label-input').focus(); }, 1);
				this.firstRender = false;
			}

			if ( this.model.get( 'options' ).length >= 1 ) {
				for (var i = 0; i < this.model.get('options').length; i++) {
					var option = this.model.get('options').models[i];
					this.addOne( option );
				};
			}

			return this;
		},

		addOne: function(newOption) {
			if ( !this.hasRendered ){
				// The main control hasn't been rendered yet, so there's nothing to add the child control to.			
				return;
			}

			console.log( 'addOne', newOption );
			var view = new wxApp.FormBuilderControlTextSliderOptionView({
				model: newOption
			});

			this.$('.options').append( view.render().el );
			this.getPreview().render();
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
			return this;
		}
	});
	
})(jQuery);