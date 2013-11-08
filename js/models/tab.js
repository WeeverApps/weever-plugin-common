
var wxApp = wxApp || {};

(function($){
    wxApp.Tab = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            icon_id: 1,
            icon: '',
            subTabs: false
        },

        validate: function(attribs) {

        },

        initialize: function() {
            var me = this;
            console.log('This function has been initialized');
            var subTabs = new wxApp.SubTabCollection();
            this.set({ subTabs: subTabs });
            this.on('invalid', function(model, error) {
                console.log(error);
            });
            this.get('subTabs').on('remove', function(subTab) {
                console.log('detected subTabs remove event');
                if ( ! me.getSubTabs().length )
                    me.trigger('destroy');
            });
            // @TODO: See if better to bind than to use addSubTab function?
            //this.subTabs.bind('add', this.addSubTab, this);
        },

        setTitle: function(newTitle) {
            this.set({ title: newTitle });
        },

        addSubTab: function(subTab) {
            var me = this;
            subTab.set( 'parent_id', this.get('id') );
            this.get('subTabs').add( subTab );
            subTab.on('tab:move', function() {
                console.log('detected tab:move for subtab in Tab model');
                me.getSubTabs().remove(this);
            } );
        },

        deleteSubTab: function(subTab) {
            wx.log('removing sub tab from collection');
            wx.log(subTab.get('id'));
            this.get('subTabs').remove(subTab);
        },

        getSubTabs: function() {
            return this.get('subTabs');
        },

        destroy: function() {
            var me = this;
            wx.makeApiCall('tabs/delete', { tab_id: this.get('id') }, function() {
                me.trigger('destroy');
            });
        }
    });
})(jQuery);