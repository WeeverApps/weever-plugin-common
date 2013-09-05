wxApp = wxApp || {};

(function($){
	wxApp.Feature = Backbone.Model.extend({
		defaults: function() {
			return {
				featureName: '', 
				imgUri: '', 
				name: '', 
				filterBy: '', 
				rel: '', 
				includeClass: '',
				visible: true
			};
		}
	});
})(jQuery);