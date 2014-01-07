
var wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderCollection = Backbone.Collection.extend({
		model: wxApp.FormBuilderControl,

		initialize: function() {
			this.on('add', this.onAdd);
		},

		onAdd: function( e ) {
			$( '#form-build-area' ).sortable({
				axis:  'y',
				start: function( event, ui ) {
					$( '#form-build-area section' ).removeClass('active');
				},
				stop:  function( event, ui ) {
					ui.item.trigger( 'sortable-drop', ui.item.index() );
				}
			});
		}
	});

})(jQuery);
