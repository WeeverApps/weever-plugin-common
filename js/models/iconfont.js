
var wxApp = wxApp || {};

(function($) {
	wxApp.IconFont = Backbone.Model.extend({
		defaults: {},

		fetch: function( id, onComplete ) {
			var me = this;
			wx.makeApiCall('icons/get_font', { font_id: id }, function(data) {
				me.set( data.font );
				m = me;
				if (typeof onComplete !== 'undefined') {
					onComplete();
				}
			})
		}
	});
})(jQuery);