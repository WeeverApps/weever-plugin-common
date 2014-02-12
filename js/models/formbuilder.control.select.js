// models/formbuilder.control.select.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlSelect = Backbone.Model.extend({

		defaults: {
			control: 'select',
			title: 'Select a choice',
			allowAdditional: '',
			allowAdditionalClass: '',
			requiredClass: '',
			name: ''
		},

		initialize: function() {
			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'optionGroup', new wxApp.FormBuilderControlOptionGroup() );
			return this;
		}

	});

})(jQuery);
