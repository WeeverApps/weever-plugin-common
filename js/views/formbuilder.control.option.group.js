// views/formbuilder.control.option.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlOptionGroupView = wxApp.FormBuilderControlBaseGroupView.extend({
		tplSelector: '#form-builder-option-group',
		className: 'wx-form-builder-option-group',
		firstRender: true,

		addOne: function( option ) {
			var view = new wxApp.FormBuilderControlOptionView({
				model: option
			});
			this.addToView( view, 'select' );
		}
	});
})(jQuery);
