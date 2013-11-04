
var wxApp = wxApp || {};

(function($) {
	wxApp.Account = Backbone.Model.extend({
		defaults: {},

		fetch: function( onComplete ) {
			var me = this;
			wx.makeApiCall('account/get_account', {}, function(data) {

				me.set( data.account );
				if (typeof onComplete !== 'undefined') {
					onComplete();
				}
				
			})
		}
	});

})(jQuery);