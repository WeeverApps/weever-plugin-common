
wxApp = wxApp || {};

(function($){
	wxApp.EditView = Backbone.View.extend({
		events: {
            'click button.finish': 'finish',
            'click .close-reveal-modal': 'cancel'
        },

	    render: function() {
	        this.$el.html( this.editTpl( this.model.toJSON() ) );
	        return this;
	    },

        cancel: function() {
            try {
                this.remove();
            } catch ( e ) {

            }
        }
	})
})(jQuery);