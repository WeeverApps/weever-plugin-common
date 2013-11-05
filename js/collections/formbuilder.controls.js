
var wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderCollection = Backbone.Collection.extend({
		model: wxApp.FormBuilderControl,

		initialize: function() {
			console.log(this.toJSONrecursive());
			this.on('add', this.onAdd);
		},

		onAdd: function( e ) {
			$( '.wx-form-builder-preview' ).sortable({
				stop: function( event, ui ) {
					ui.item.trigger( 'sortable-drop', ui.item.index() );
				}
			});
		}
	});

})(jQuery);
