
var wxApp = wxApp || {};

(function($) {
	wxApp.Design = Backbone.Model.extend({
		defaults: {},

		fetch: function( onComplete ) {
			var me = this;
			wx.makeApiCall('design/get_design', {}, function(data) {

				me.set( data.design );
				if (typeof onComplete !== 'undefined') {
					onComplete();
				}
				
			})
		}
	});

})(jQuery);