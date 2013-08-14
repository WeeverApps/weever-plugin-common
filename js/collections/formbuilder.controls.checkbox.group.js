// collections/formbuilder.controls.checkbox.group.js

wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlCheckboxGroup = Backbone.Collection.extend({
		model: wxApp.FormBuilderControlCheckbox,

		initialize: function() {
			console.log('radio group collection init');
			this.on( 'add', this.onAdd );
		},

		onAdd: function( checkbox ) {
			if ( this.length == 1 ) {
				this.firstElementId = checkbox.cid;
			}
			checkbox.set({ collectionId: this.firstElementId });
		}

	});

})(jQuery);
