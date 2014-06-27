
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderCalculatorField = Backbone.Model.extend({
		defaults: function() {
			return {
				name     : '',
				operation: '+',
				constant : 0
			};
		}
	});

	wxApp.FormBuilderCalculatorFields = Backbone.Collection.extend({
		model: wxApp.FormBuilderCalculatorField
	});

	wxApp.FormBuilderCalculator = Backbone.Model.extend({

		defaults: function() {
			// Default populate with two fields.
			var fields = new wxApp.FormBuilderCalculatorFields();
			fields.add([
				new wxApp.FormBuilderCalculatorField(),
				new wxApp.FormBuilderCalculatorField()
			]);

			return {
				control: 'calculation',
				fields : fields,
				label  : 'Calculated Value'
			};
		},

		initialize: function() {
		}
	});

})(jQuery);
