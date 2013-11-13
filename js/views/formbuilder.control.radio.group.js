// views/formbuilder.control.radio.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioGroupView = wxApp.FormBuilderControlBaseGroupView.extend({
		className: 'wx-form-builder-radio-group',
		tplSelector: '#form-builder-radio-group',

		addOne: function( radio ) {
			var view = new wxApp.FormBuilderControlRadioView({
				model: radio,
				type: 'radio'
			});
			this.addToView( view );
		}

	});
})(jQuery);
