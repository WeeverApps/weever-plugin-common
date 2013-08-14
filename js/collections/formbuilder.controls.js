
var wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderCollection = Backbone.Collection.extend({
		model: wxApp.FormBuilderControl,

//		model: function(attrs, options) {
//			console.log(attrs);
//		},

		initialize: function() {
			console.log(this.toJSONrecursive());
			this.on('add', this.onAdd);
		},

		onAdd: function() {
			console.log(this.toJSONrecursive());
		}
	});

})(jQuery);
