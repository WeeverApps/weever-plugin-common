
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlDocusignSignature = wxApp.FormBuilderControl.extend({
		defaults: function() {
			// This is annoying
			// https://github.com/documentcloud/backbone/issues/476
			var newDefaults = _.extend( this.constructor.__super__.defaults(), {
				control: 'docusignSignature',
				label: 'Sign here',
				labelOption: {
					verb: '',
					fields: []
				},
				instructions: 'On completing this form your data will be presented back to you for review and signature.',
				title: 'Name, email and signature',
				username: '',
				password: '',
				returnUrl: ''
			} );

			return newDefaults;
		},

		initialize: function() {
			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this );

			this.get( 'attributes' ).set( 'required', 'checked' );
		}
	});

})(jQuery);