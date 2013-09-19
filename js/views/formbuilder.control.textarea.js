
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlTextareaView = wxApp.FormBuilderControlView.extend({

		initialize: function() {
			this.inputTpl = _.template( $('#form-builder-textarea').html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		}

	});
})(jQuery);