// models/formbuilder.control.select.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlSelect = Backbone.Model.extend({

		defaults: {
			control: 'select',
			title: 'Select a choice',
			allowAdditional: '',
			allowAdditionalClass: 'hide',
			requiredClass: '',
			name: ''
		},

		// TODO - Try and reduce some of the duplication between this & radio/checkboxFieldset
		initialize: function( properties ) {
			var optionGroup = new wxApp.FormBuilderControlOptionGroup();

			if ( properties.optionGroup === undefined || properties.optionGroup.length === 0 ) {
				optionGroup.add( new wxApp.FormBuilderControlOption( { innerText: 'Option A' } ) );
				optionGroup.add( new wxApp.FormBuilderControlOption( { innerText: 'Option B' } ) );
				optionGroup.add( new wxApp.FormBuilderControlOption( { innerText: 'Option C' } ) );
			} else {
				for ( var i = 0; i < properties.optionGroup.length; i++ ) {
					var optionJson  = properties.optionGroup[i],	// JSON object coming from the API
					    optionModel = null;
					optionModel = new wxApp.FormBuilderControlOption( optionJson );
					optionGroup.add( optionModel );
				};
			}

			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'optionGroup', optionGroup );
			return this;
		}

	});

})(jQuery);
