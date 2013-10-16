
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

            this.containerEditContentTpl = _.template( $('#ContainerEditContent').html() );
            this.containerEditView = new wxApp.ContainerEditView({ model: this.model });

            this.model.on('change', this.render, this);
            console.log('done initializing subtabscontainerview');
        },

        events: {
            'click #ContainerEditLink': 'openEditModal',
            'click .wx-save-button': 'save'
        },

        render: function() {
            wx.log('RENDERING subtabs container');
            wx.log( this.model );
            this.$el.html( this.subTabContainerTpl( this.model.toJSON() ) );
            this.$('#ContainerEditModal').html( this.containerEditContentTpl( this.model.toJSON() ) );
            this.$('.adminlist').html( this.subTabsView.render().el );
            this.$el.attr('id', this.model.get('id') + 'Tab');

            return this;
        },

        openEditModal: function() {
            console.log('editing container...');
            this.containerEditView = new wxApp.ContainerEditView({ model: this.model });
            this.$('#ContainerEditModal').html( this.containerEditView.render().el );

            this.$('.section-container').foundation('section', 'reflow');
        }
    });
})(jQuery); 