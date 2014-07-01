
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

		initialize: function( properties ) {
			console.log('arguments', arguments);
			console.log('properties', properties);

			// The 'fields' property just gets set to a basic array, rather than a Backbone.Array. Let's fix that.
			var fields = properties.fields;
			delete properties.fields;

			// Call parent's initialize() function
			Backbone.Model.prototype.initialize.apply( this, arguments );

			var fields = new wxApp.FormBuilderCalculatorFields();
			for (var i = 0; i < fields.length; i++) {
				var field = new wxApp.FormBuilderCalculatorField( fields[i] );
				fields.add( field );
			};

			this.set( 'fields', fields );
		}
	});

})(jQuery);
