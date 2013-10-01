
var wxApp = wxApp || {};

(function($) {
	wxApp.Design = Backbone.Model.extend({
		defaults: {},
		loaded: false,

		fetch: function( onComplete ) {
			var me = this;
			wx.makeApiCall('design/get_design', {}, function(data) {
				console.log('Design loaded');
				me.set( data.design );
				this.loaded = true;
				console.log( me.toJSON() );

				if (typeof onComplete !== 'undefined') {
					onComplete();
				}
			})
		}
	});

})(jQuery);