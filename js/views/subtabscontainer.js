
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
            wx.log( this.model );
            this.$el.html( this.subTabContainerTpl( this.model ) );
            this.$('.adminlist').html( this.subTabsView.render().el );
            this.$el.attr('id', this.model.get('id') + 'Tab');
            return this;
        },

        iconEdit: function() {
            console.log('editing icon...');
            this.editIconView = new wxApp.IconEditView({ model: this.model });
            this.$('#SubtabEditModal').html( this.editIconView.render().el );
        },

        titleEdit: function() {
            //this.tabView.editTitle();
            console.log('editing title...');
            this.editTitleView = new wxApp.TitleEditView({ model: this.model });
            this.$('#SubtabEditModal').html( this.editTitleView.render().el );
        },

        layoutEdit: function() {
            this.tabView.editLayout();
        }
    });
})(jQuery); 