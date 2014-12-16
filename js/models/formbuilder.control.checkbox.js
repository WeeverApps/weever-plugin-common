
wxApp = wxApp || {};

(function($){
 
	wxApp.FormBuilderChildInput = Backbone.Model.extend({
		defaults: function() {
			return { control: 'input' };
		},

		initialize: function() {
			if ( this.get( 'attributes' ) ) {
				this.set( 'attributes', new wxApp.FormBuilderControlAttributes( this.get( 'attributes' ) ) );
			}
			else {
				this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			}
		}
	});

	wxApp.FormBuilderControlCheckbox = wxApp.FormBuilderChildInput.extend({
		defaults: function() {
			var newDefaults = _.extend( this.constructor.__super__.defaults(), { label: 'Checkbox' } );
			return newDefaults;
		},

		initialize: function() {
			wxApp.FormBuilderChildInput.prototype.initialize.apply( this );
			this.get( 'attributes' ).set( 'type', 'checkbox' );
		}
	});

})(jQuery);
