
wxApp = wxApp || {};

(function($){
    wxApp.IconEditView = wxApp.EditView.extend({
        iconProperty: 'icon_id',

        initialize: function() {
            console.log('IconEditView init');
            this.editTpl = _.template( $('#icon-edit-template').html() );
        },

        finish: function() {
            var me = this;
            wx.log( this.$('input:radio[name="wx-icon"]').val() );
            var iconId = this.$('input:radio[name="wx-icon"]:checked').val();
            var tabId = this.model.get('id');
            wx.makeApiCall( 'tabs/set_icon_id', { tab_id: tabId, icon_id: iconId }, function() {
                try {
                    $('#SubtabEditModal').foundation('reveal', 'close');
                    me.model.set( 'icon_id', iconId );

                    // Wait half a second, then refresh the preview
                    // (The half-second helps ensure the server is synced)
                    setTimeout( function() { wx.refreshAppPreview(); }, 500);

                    me.remove();
                } catch ( e ) {

                }
            });
        }
    });
})(jQuery);