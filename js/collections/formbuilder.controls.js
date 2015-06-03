
var wxApp = wxApp || {};

(function(){

	wxApp.FormBuilderCollection = Backbone.Collection.extend({
		model: wxApp.FormBuilderControl
	});

})();
