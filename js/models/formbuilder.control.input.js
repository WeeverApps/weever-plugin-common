
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlInput = wxApp.FormBuilderControl.extend({
		defaults: function() {
			// This is annoying
			// https://github.com/documentcloud/backbone/issues/476
			var newDefaults = _.extend( this.constructor.__super__.defaults(), {
				control: 'input',
				label: 'Label'
			} );
			return newDefaults;
		},

		initialize: function( properties ) {
			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this );

			this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			if ( properties.attributes ) {
		        for ( var attrKey in properties.attributes ) {
                     this.get( 'attributes' ).set(attrKey, properties.attributes[attrKey]);
                }
			}
		}
	});

})(jQuery);