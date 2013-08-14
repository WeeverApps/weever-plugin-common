
wxApp = wxApp || {};

(function($){
    wxApp.SubTabsContainerView = Backbone.View.extend({
        tagName: 'div',
        className: 'wx-tabs-stdcontainer wxui-stdContainer',
        tabView: false,

        initialize: function() {
            var me = this;
            this.subTabContainerTpl = _.template( $('#subtab-container-template').html() );
            this.subTabsView = new wxApp.SubTabsView({ model: this.model });
            this.subTabsView.on( 'delete', function() {
                me.model.destroy();
                me.remove();
            });
            this.model.on('change', this.render, this);
            console.log('done initializing subtabscontainerview');
        },

        events: {
            'click .wx-nav-icon-edit': 'iconEdit',
            'click .wx-nav-title-edit': 'titleEdit',
            'click .wx-nav-layout-edit': 'layoutEdit'
        },

        render: function() {
            wx.log('RENDERING subtabs container');
            this.$el.html( this.subTabContainerTpl( this.model.toJSON() ) );
            this.$el.find('.adminlist').html( this.subTabsView.render().el );
            this.$el.attr('id', this.model.get('id') + 'Tab');
            return this;
        },

        iconEdit: function() {
            this.tabView.editIcon();
        },

        titleEdit: function() {
            this.tabView.editTitle();
        },

        layoutEdit: function() {
            this.tabView.editLayout();
        }
    });
})(jQuery);