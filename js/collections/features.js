
var wxApp = wxApp || {};

(function(){

	wxApp.FeatureCollection = Backbone.Collection.extend({
		model: wxApp.Feature,

		initialize: function() {
		}
	});
})();
