
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlInfo = Backbone.Model.extend({
		defaults: function() {
			return {
				advanced    : wx.formbuilderAdvanced,
				control     : 'div',
				controlTitle: 'Info Box',
				innerHTML   : 'Enter some informational text here!',
				label       : 'Informational text'
			};
		}
	});

})(jQuery);