// models/formbuilder.control.select.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlSelect = Backbone.Model.extend({

		defaults: {
			control: 'select',
			title: 'Select Group',
			allowAdditional: '',
			allowAdditionalClass: ''
		},

		initialize: function() {
			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			this.set( 'optionGroup', new wxApp.FormBuilderControlOptionGroup() );
			console.log(this);
			return this;
		}

	});

})(jQuery);
