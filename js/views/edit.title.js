
wxApp = wxApp || {};

(function($){
    wxApp.TitleEditView = wxApp.EditView.extend({
        //iconProperty: 'icon_id',

        initialize: function() {
            //console.log('IconEditView init');
            this.editTpl = _.template( $('#title-edit-template').html() );
        },

        finish: function() {
            var me = this;
            var title = this.$('#alertName').val();
            var tabId = this.model.get('id');

            // TODO - Compare: set_tabTitle vs set_title
            wx.makeApiCall( 'tabs/set_tabTitle', { tab_id: tabId, tabTitle: title }, function() {
                try {
                    $('#SubtabEditModal').foundation('reveal', 'close');
                    me.model.set( 'tabTitle', title );
                    me.remove();
                } catch ( e ) {

                }
            });
        }
    });
})(jQuery);