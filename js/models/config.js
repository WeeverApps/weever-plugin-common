
var wxApp = wxApp || {};

(function($) {
	wxApp.Config = Backbone.Model.extend({
		defaults: {},

		fetch: function( onComplete ) {
			var me = this;
			wx.makeApiCall('config/get_config', {}, function(data) {

				me.set( data.config );
				if (typeof onComplete !== 'undefined') {
					onComplete();
				}
				
			})
		}
	});

})(jQuery);