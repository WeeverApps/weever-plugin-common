
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderCalculator = Backbone.Model.extend({

		defaults: function() {
			return {
				control1 : '',
				control2 : '',
				operation: '+',
				label    : 'Calculated Value'
			};
		},

		initialize: function() {
		}
	});

})(jQuery);
