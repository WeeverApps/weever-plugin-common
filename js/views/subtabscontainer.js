
wxApp = wxApp || {};

(function($){
    wxApp.SubTabsContainerView = Backbone.View.extend({
        tagName: 'div',
        // className: 'wx-tabs-stdcontainer wxui-stdContainer',
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
            // 'click .wx-save-button': 'save',
            'click .wx-delete-container': 'confirmDelete',
            'click .wx-layout-selector': 'selectLayout'
        },

        render: function() {
            this.$el.html( this.subTabContainerTpl( this.model.toJSON() ) );
            this.$('#ContainerEditModal').html( this.containerEditContentTpl( this.model.toJSON() ) );
            this.$('.adminlist').append( this.subTabsView.render().el );
            this.$el.attr('id', this.model.get('id') + 'Tab');

            return this;
        },

        openEditModal: function() {
            console.log('editing container...');
            this.containerEditView = new wxApp.ContainerEditView({ model: this.model });
            this.$('#ContainerEditModal').html( this.containerEditView.render().el );

            this.$('.section-container').foundation('reflow');
        },

        selectLayout: function(e) {
            var button = $( e.currentTarget );
            $('.wx-layout-selector').addClass('secondary');
            button.removeClass('secondary');

            var tabLayout = button.attr('id');
            // Change from layout-list to list
            tabLayout = tabLayout.replace('layout-', '');
            // Classic is the default, and should not be defined.
            if (tabLayout === 'classic')
                tabLayout = null;

            var me = this;
            wx.makeApiCall( 'tabs/set_tabLayout', { tab_id: this.model.get('id'), tabLayout: tabLayout }, function() {
                console.log('Layout Saved');

                // Apply the new layout to the current tab & all child tabs.
                me.model.set('tabLayout', tabLayout);
                if ( me.model.get('subTabs') && me.model.get('subTabs').length ) {
                    for (var i = 0; i < me.model.get('subTabs').length; i++) {
                        var subtab = me.model.get('subTabs').at( i );
                        subtab.set( 'tabLayout', tabLayout );
                    };
                }
                wx.rebuildApp();
            });
        },

        confirmDelete: function(event) {
            event.preventDefault();
            if ( confirm('Are you sure you want to delete this item, including all of the sub-tabs?') )
                this.deleteContainer();
        },

        deleteContainer: function() {
            this.model.destroy();
            wx.rebuildApp();
        }
    });
})(jQuery); 