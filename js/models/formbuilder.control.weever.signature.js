
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlWeeverSignature = wxApp.FormBuilderControl.extend({
		defaults: function() {
			// This is annoying
			// https://github.com/documentcloud/backbone/issues/476
			var newDefaults = _.extend( this.constructor.__super__.defaults(), {
				control: 'weeverSignature',
				label: 'Sign here',
				instructions: 'Tap the text above, then sign with your finger.',
				title: 'Weever Signature',
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

//			this.get( 'attributes' ).set( 'required', 'checked' );
		}
	});

})(jQuery);