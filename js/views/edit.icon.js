
wxApp = wxApp || {};

(function($){
    wxApp.IconEditView = Backbone.View.extend({
        iconProperty: 'icon_id',

        initialize: function() {
            console.log('IconEditView init');
            this.iconEditTpl = _.template( $('#icon-edit-template').html() );
        },

        events: {
            'click .wx-icon-finish-button': 'finish',
            'click button.finish': 'finish',
            'click .close-reveal-modal': 'cancel'
        },

        render: function() {
            console.log('IconEditView render');
            this.$el.html( this.iconEditTpl( this.model.toJSON() ) );
            return this;
        },

        finish: function() {
            var me = this;
            wx.log( this.$('input:radio[name="wx-icon"]').val() );
            var iconId = this.$('input:radio[name="wx-icon"]:checked').val();
            var tabId = this.model.get('id');
            wx.makeApiCall( 'tabs/set_icon_id', { tab_id: tabId, icon_id: iconId }, function() {
                try {
                    $('#ChangeIconModal').foundation('reveal', 'close');
                    me.model.set( 'icon_id', iconId );
                    me.remove();
                } catch ( e ) {

                }
            });
        },

        cancel: function() {
            try {
                this.remove();
            } catch ( e ) {

            }
        }
    });
})(jQuery);