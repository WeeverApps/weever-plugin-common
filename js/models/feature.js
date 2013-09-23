
wxApp = wxApp || {};

(function($){
	wxApp.Feature = Backbone.Model.extend({
		defaults:  {
			featureName: '', 
			imgUri: '', 
			name: '', 
			filterBy: '', 
			rel: '', 
			includeClass: '',
			visible: true,
			iconId: 0
		}
	});
})(jQuery);