
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlTextRange = wxApp.FormBuilderControl.extend({
		defaults: function() {
			// This is annoying
			// https://github.com/documentcloud/backbone/issues/476
			var newDefaults = _.extend( this.constructor.__super__.defaults(), {
				control: 'input',
				label: 'Label'
			} );
			return newDefaults;
		},

		initialize: function ( properties ) {
			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this, arguments );
			this.set( 'options', new wxApp.FormBuilderControlTextSliderOptions() );

			if ( properties && properties.options && properties.options.length > 0 ) {
				for (var i = 0; i < properties.options.length; i++) {
					this.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( properties.options[i] ));
				};
			}
			else {
				this.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'NA' } ) );
				this.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'SA' } ) );
				this.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'A'  } ) );
				this.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'D'  } ) );
				this.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'SD' } ) );
			}
		}
	});

})(jQuery);