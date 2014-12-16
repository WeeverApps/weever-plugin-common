// models/formbuilder.control.radio.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlRadio = wxApp.FormBuilderChildInput.extend({
		defaults: function() {
			var newDefaults = _.extend( this.constructor.__super__.defaults(), { label: 'Radio Button' } );
			return newDefaults;
		},

		initialize: function() {
			wxApp.FormBuilderChildInput.prototype.initialize.apply( this );
			this.get( 'attributes' ).set( 'type', 'radio' );
		}
	});

	wxApp.FormBuilderControlTextSliderOption = wxApp.FormBuilderControlInput.extend({
		defaults: function() {
			// This is annoying
			// https://github.com/documentcloud/backbone/issues/476
			var newDefaults = _.extend( this.constructor.__super__.defaults(), {
				text: 'Option',
				autocompleteClass: 'hide'
			} );
			return newDefaults;
		},

		initialize: function() {
			
			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this );
		}

	});

})(jQuery);
