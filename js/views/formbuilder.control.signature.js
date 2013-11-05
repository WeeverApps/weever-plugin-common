
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlSignatureView = wxApp.FormBuilderControlView.extend({
		tplSelector: '#form-builder-signature',

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'blur .wx-form-builder-docusign-username': 'updateUsername',
				'blur .wx-form-builder-docusign-password': 'updatePassword',
				'blur .wx-form-builder-docusign-returnUrl': 'updateReturnUrl'
			});
		},

		updateUsername: function( ev ) {
			this.model.set( 'username', $( ev.currentTarget ).val() );
		},

		updatePassword: function( ev ) {
			this.model.set( 'password', $( ev.currentTarget ).val() );
		},

		updateReturnUrl: function( ev ) {
			this.model.set( 'returnUrl', $( ev.currentTarget ).val() );
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