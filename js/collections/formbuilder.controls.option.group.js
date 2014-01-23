// collections/formbuilder.controls.option.group.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlOptionGroup = Backbone.Collection.extend({
		model: wxApp.FormBuilderControlOption,

		initialize: function() {
			console.log('option group collection init');
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
