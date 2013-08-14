// collections/formbuilder.controls.radio.group.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlRadioGroup = Backbone.Collection.extend({
		model: wxApp.FormBuilderControlRadio,

		initialize: function() {
			console.log('radio group collection init');
			this.on( 'add', this.onAdd );
		},

		onAdd: function( radio ) {
			if ( this.length == 1 ) {
				this.firstElementId = radio.cid;
			}
			radio.set({ collectionId: this.firstElementId });
		}

	});

})(jQuery);
