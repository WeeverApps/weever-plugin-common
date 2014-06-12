
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlAttributes = Backbone.Model.extend({
		defaults: {}
	});

	wxApp.FormBuilderControl = Backbone.Model.extend({

		// http://documentcloud.github.com/backbone/#Model-defaults
		defaults: function() {
			return {
				control: '',
				type: '',
				label: '',
				hidePlaceholderClass: '',
				showPlaceholder: false,
				innerText: '',
				allowAdditional: '',
				allowAdditionalClass: '',
				valueType: 'number',
				valueClass: 'hide',
				minClass: 'hide',
				maxClass: 'hide',
				stepClass: 'hide',
				multiClass: 'hide',
				requiredClass: '',
				autocompleteClass: 'hide',
				controlTitle: '',
				advanced: wx.formbuilderAdvanced
			};
		},

		initialize: function() {
			if ( this.get( 'attributes' ) ) {
				this.set( 'attributes', new wxApp.FormBuilderControlAttributes( this.get( 'attributes' ) ) );
			}
			else {
				this.set( 'attributes', new wxApp.FormBuilderControlAttributes() );
			}

			this.togglePlaceholder();
			this.on( 'change:showPlaceholder', this.togglePlaceholder );
		},

		togglePlaceholder: function() {
			if ( this.get( 'showPlaceholder' ) === false ) {
				this.set( 'hidePlaceholderClass', 'hide' );
			}
		}

	});

})(jQuery);