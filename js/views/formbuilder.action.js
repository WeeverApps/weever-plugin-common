
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderActionView = Backbone.View.extend({
		className: 'wx-form-builder-row',
		tplSelector: '#form-builder-action',

		events: {
			'blur .wx-form-builder-action': 'updateAction',
			'click .wx-form-builder-delete': 'deleteControl'
		},

		initialize: function() {
			var $template = $( this.tplSelector );
			this.tpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.tpl( this.model.toJSON() ) );
			return this;
		},

		updateAction: function( ev ) {
			console.log( 'updateAction' );
			ev.preventDefault();
			var $me = $( ev.currentTarget );
			this.model.set( 'value', $me.val() );
			console.log( this.model );
		},

		deleteControl: function() {
			console.log( 'deleteControl' );
			this.remove();
			this.model.destroy();
		}

	});
})(jQuery);