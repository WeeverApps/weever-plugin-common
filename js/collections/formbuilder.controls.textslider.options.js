// collections/formbuilder.controls.textslider.options.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlTextSliderOptions = Backbone.Collection.extend({
		model: wxApp.FormBuilderControlTextSliderOption,

		initialize: function() {
			this.on( 'add', this.onAdd );
		},

		onAdd: function( option ) {
			if ( this.length == 1 ) {
				this.firstElementId = option.cid;
			}
			option.set({ collectionId: this.firstElementId });
		}

	});

})(jQuery);
