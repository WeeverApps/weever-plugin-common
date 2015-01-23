
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlTextRangeView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-text-range',
		preview: null,
		hasRendered: false,

		initialize: function( options ) {
			options.type = (typeof options.type == 'undefined' ? 'input' : options.type );
			var me        = this,
			    $template = $( this[options.type + 'TplSelector'] );

			me.inputTpl = _.template( $template.html() );

			me.model.get( 'options' ).bind('add', me.addOne, me);
			me.model.get( 'options' ).bind('remove', function() { me.getPreview().render(); }, me);
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

			var view = new wxApp.FormBuilderControlTextSliderOptionView({
				model: newOption
			});

			this.$('.options').append( view.render().el );
			this.getPreview().render();
		}
	});

	wxApp.FormBuilderControlTextRangePreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-text-range-preview'
	});
	
})(jQuery);