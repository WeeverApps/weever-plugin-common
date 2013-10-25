
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
        },

        events: {
            'click #ContainerEditLink': 'openEditModal',
            'click .wx-save-button': 'save',
            'click .wx-delete-container': 'confirmDelete'
        },

        render: function() {
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
        },

        confirmDelete: function(event) {
            event.preventDefault();
            if ( confirm('Are you sure you want to delete this item, including all of the sub-tabs?') )
                this.deleteContainer();
        },

        deleteContainer: function() {
            this.model.destroy();

            // Wait half a second, then refresh the preview
            // (The half-second helps ensure the server is synced)
            setTimeout( function() { wx.refreshAppPreview(); }, 500);
        }
    });
})(jQuery); 