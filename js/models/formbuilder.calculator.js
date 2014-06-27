
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderCalculator = Backbone.Model.extend({

		defaults: function() {
			return {
				control   : 'calculation',
				fields    : ['', ''],
				operations: ['+'],
				label     : 'Calculated Value'
			};
		},

		initialize: function() {
		}
	});

})(jQuery);
