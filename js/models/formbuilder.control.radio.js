// models/formbuilder.control.radio.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlRadio = wxApp.FormBuilderControlInput.extend({
		defaults: function() {
			// This is annoying
			// https://github.com/documentcloud/backbone/issues/476
			var newDefaults = _.extend( this.constructor.__super__.defaults(), {
				label: 'Radio Button',
				autocompleteClass: 'hide'
			} );
			return newDefaults;
		},

		initialize: function(l) {
			if ( l )
				this.set( 'label', l );

			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this );

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

		initialize: function(l) {
			if ( l )
				this.set( 'text', l );

			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this );
		}

	});

})(jQuery);
