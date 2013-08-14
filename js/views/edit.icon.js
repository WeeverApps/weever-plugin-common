
wxApp = wxApp || {};

(function($){
    wxApp.IconEditView = Backbone.View.extend({
        iconProperty: 'icon_id',

        initialize: function() {
            this.iconEditTpl = _.template( $('#icon-edit-template').html() );
        },

        events: {
            'click .wx-icon-finish-button': 'finish',
            'click .wx-icon-cancel-button': 'cancel'
        },

        render: function() {
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
                    me.model.set( 'icon_id', iconId );
                    me.$el.dialog( 'close' );
                    me.remove();
                } catch ( e ) {

                }
            });
        },

        cancel: function() {
            try {
                this.$el.dialog( 'close' );
                this.remove();
            } catch ( e ) {

            }
        }
    });
})(jQuery);