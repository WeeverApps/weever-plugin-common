
var wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderCollection = Backbone.Collection.extend({
		model: wxApp.FormBuilderControl,

		initialize: function() {
			console.log(this.toJSONrecursive());
			this.on('add', this.onAdd);
		},

		onAdd: function( e ) {
			$( '#form-build-area' ).sortable({
				start: function( event, ui ) {
					$( '#form-build-area section' ).removeClass('active');
				},
				stop: function( event, ui ) {
					ui.item.trigger( 'sortable-drop', ui.item.index() );
				}
			});
		}
	});

})(jQuery);
