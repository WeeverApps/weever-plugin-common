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

		initialize: function() {
			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this );

			this.get( 'attributes' ).set( 'type', 'radio' );

			console.log( this );
			console.log( this.cid );
			console.log( this.collection );
		}

	});

})(jQuery);
