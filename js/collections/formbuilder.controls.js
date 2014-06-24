
var wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderCollection = Backbone.Collection.extend({
		model: wxApp.FormBuilderControl,

		initialize: function() {
			this.on('add', this.onAdd);
		},

		onAdd: function( e ) {
			$( '.wx-preview-form' ).sortable({
				axis:  'y',
				start: function( event, ui ) {
					$( '.wx-preview-form .wx-form-preview-row' ).removeClass('wx-active');
				},
				stop:  function( event, ui ) {
					ui.item.trigger( 'sortable-drop', ui.item.index() );
				}
			});
		}
	});

})(jQuery);
