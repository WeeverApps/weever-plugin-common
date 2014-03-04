wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlBaseView = wxApp.FormBuilderControlView.extend({
		tagName: 'div',
		className: 'row',
		preview: null,
		firstRender: true,

		initialize: function( options ) {
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );
		},

		updateLabel: function( ev ) {
			var value = $( ev.currentTarget ).val();
			this.model.set( 'label', value );
		},

		render: function() {
			var text = this.model.get('label').toString();
			if ( text === '[object Object]' ) {
				// label seems to be some sort of wacky 
				// reserved keyword in backbone, so we have 
				// to get it the "old fashioned" way.
				text = this.model.attributes.label.label;
			}
			var jsonModel = this.model.toJSON();
			jsonModel.label = text;

			this.$el.html( this.inputTpl( jsonModel ) );
			
			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				// We need to add this 1ms delay for Chrome and Safari, as otherwise the focus doesn't really happen.
				setTimeout( function() { this.$('.wx-form-builder-title-input').focus(); }, 1);
				this.firstRender = false;
			}

			return this;
		}
	});

	wxApp.FormBuilderControlBasePreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var $template = $( this.selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var text = this.model.get('label').toString();
			if ( text === '[object Object]' ) {
				// label seems to be some sort of wacky 
				// reserved keyword in backbone, so we have 
				// to get it the "old fashioned" way.
				text = this.model.attributes.label.label;
			}
			var jsonModel = this.model.toJSON();
			jsonModel.label = text;

			this.$el.html( this.inputTpl( jsonModel ) );
			return this;
		}

	});
})(jQuery);