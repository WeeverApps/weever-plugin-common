// views/formbuilder.control.checkbox.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlCheckboxGroupView = wxApp.FormBuilderControlBaseGroupView.extend({
		className: 'wx-form-builder-checkbox-group',
		tplSelector: '#form-builder-checkbox-group',

		addOne: function( checkbox ) {
			var view = new wxApp.FormBuilderControlCheckboxView({
				model: checkbox,
				type: 'checkbox'
			});
			this.addToView( view );
		}

	});
})(jQuery);
