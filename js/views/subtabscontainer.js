
wxApp = wxApp || {};

(function($){
    wxApp.SubTabsContainerView = Backbone.View.extend({
        tagName: 'div',
        className: 'wx-tabs-stdcontainer wxui-stdContainer',
        tabView: false,

        initialize: function() {
            var me = this;

            Backbone.Events.on( 'container:save', this.save, this );

            this.subTabContainerTpl = _.template( $('#subtab-container-template').html() );
            this.subTabsView = new wxApp.SubTabsView({ model: this.model });
            this.subTabsView.on( 'delete', function() {
                me.model.destroy();
                me.remove();
            });

            this.containerEditContentTpl = _.template( $('#ContainerEditContent').html() );
            this.containerEditView = new wxApp.ContainerEditView({ model: this.model });
            // this.containerEditView.on( 'delete', function() {
            //     me.model.destroy();
            //     me.remove();
            // });

            this.model.on('change', this.render, this);
            console.log('done initializing subtabscontainerview');
        },

        events: {
            'click .wx-nav-icon-edit': 'iconEdit',
            'click .wx-nav-title-edit': 'titleEdit',
            'click .wx-nav-layout-edit': 'layoutEdit',
            'click #ContainerEditLink': 'reflowSection',
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

        iconEdit: function() {
            console.log('editing icon...');
            this.editIconView = new wxApp.IconEditView({ model: this.model });
            this.$('#SubtabEditModal').html( this.editIconView.render().el );
        },

        titleEdit: function() {
            console.log('editing title...');
            this.editTitleView = new wxApp.TitleEditView({ model: this.model });
            this.$('#SubtabEditModal').html( this.editTitleView.render().el );
        },

        layoutEdit: function() {
            this.tabView.editLayout();
        },

        // save: function() {
        //     console.log('Save.');
        //     var me = this;
        //     var tabId = this.model.get('id');
        //     var title = $('#container-title').val();
        //     var iconId = $('input:radio[name="wx-icon"]:checked').val();
        //     var numCompleted = 0;

        //     wx.makeApiCall( 'tabs/set_tabTitle', { tab_id: tabId, tabTitle: title }, function() {
        //         console.log('Title Saved');
        //         me.model.set('tabTitle', title);
        //         if (++numCompleted == 2) {
        //             wx.refreshAppPreview();
        //         }
        //     });

        //     wx.makeApiCall( 'tabs/set_icon_id', { tab_id: tabId, icon_id: iconId }, function() {
        //         console.log('Icon Saved');
        //         me.model.set('icon_id', iconId);
        //         if (++numCompleted == 2) {
        //             wx.refreshAppPreview();
        //         }
        //     });

        //     console.log('Closing...');
        //     this.$('#ContainerEditModal').foundation('reveal', 'close');
        // },

        reflowSection: function() {
            console.log('editing container...');
            this.containerEditView = new wxApp.ContainerEditView({ model: this.model });
            this.$('#ContainerEditModal').html( this.containerEditView.render().el );

            this.$('.section-container').foundation('section', 'reflow');
        }
    });
})(jQuery); 