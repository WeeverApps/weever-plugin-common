
wxApp = wxApp || {};

(function($){
    wxApp.TitleEditView = Backbone.View.extend({
        //iconProperty: 'icon_id',

        initialize: function() {
            //console.log('IconEditView init');
            this.titleEditTpl = _.template( $('#title-edit-template').html() );
        },

        events: {
            'click button.finish': 'finish',
            'click .close-reveal-modal': 'cancel'
        },

        render: function() {
            console.log('TitleEditView render');
            this.$el.html( this.titleEditTpl( this.model.toJSON() ) );
            return this;
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
        },

        cancel: function() {
            try {
                this.remove();
            } catch ( e ) {

            }
        }
    });
})(jQuery);