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
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
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
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		}

	});
})(jQuery);