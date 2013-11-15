wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlBaseView = wxApp.FormBuilderControlView.extend({
		tagName: 'div',
		className: 'row',
		preview: null,

		initialize: function( options ) {
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );;
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