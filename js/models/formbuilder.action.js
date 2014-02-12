
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderAction = Backbone.Model.extend({

		// http://documentcloud.github.com/backbone/#Model-defaults
		defaults: function() {
			return {
				control: 'action',
				method: 'post',
				mode: 'direct',		// 'direct' or 'proxy' (only for custom posts)
				value: '',
				rawUrl: '',
				username: '',
				password: '',
				returnUrl: '',
				pdfHeader: {
					title: '',
					line1: '',
					line2: '',
					line3: ''
				}
			};
		},

		initialize: function() {
			// console.log( 'FormBuilderAction init' );
			// console.log( this );
		},

		// Add the proxy URL for POST actions (See case #4197)
		setUrl: function() {

			if ( this.get('method') !== 'post' ) {
				return;
			}

			var me = this,
			    currentUrl = me.get( 'value' );
			if ( currentUrl.indexOf('_postproxy') === -1 ) {

				// Duplicate the URL into the rawUrl property.
				me.set( 'rawUrl', currentUrl );
				if ( this.get('mode') === 'proxy' ) {
					
					// Set the proxy url.
					var proxyUrl = 'http://weeverapp.com/api/v2/_postproxy/send?target=' + encodeURIComponent( currentUrl );
					me.set( 'value', proxyUrl );
				}
			}

		}

	});

})(jQuery);
