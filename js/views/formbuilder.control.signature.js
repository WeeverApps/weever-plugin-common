
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlSignatureView = wxApp.FormBuilderControlView.extend({
		tplSelector: '#form-builder-signature',

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
			});
		},

		initialize: function() {
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
			console.log('input render');
		}

	});
})(jQuery);