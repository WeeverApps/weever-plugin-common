
wxApp = wxApp || {};

(function($){
    wxApp.TabView = Backbone.View.extend({
        tagName: 'div',
        className: 'wx-tab',
        subTabsContainerView: false,

        initialize: function() {
            this.tabTpl = _.template( $('#tab-template').html() );
            this.iconTpl = _.template( $('#icon-edit-template').html() );
            this.model.bind( 'change', this.render, this );
            this.model.bind( 'destroy', this.destroyView, this );
            Backbone.Events.on( 'tab:id-update', this.updateTabId, this );
        },

        events: {
            'click': 'editAll'
        },

        render: function() {
            this.$el.html( this.tabTpl( this.model.toJSON() ) );
            this.loadIcon();
            if ( undefined !== this.$el.droppable ) {
                this.$el.droppable( {
                    accept: ".list-sub-items li, .list-add-content-items li",
                    hoverClass: "ui-state-hover",
                    drop: this.onDrop
                } );
            }
            this.$el.data( 'backbone-view', this );
            this.$el.attr('id', this.model.get('id') + 'TabID');
            return this;
        },

        onDrop: function( event, ui ) {
            var me = $(this).data('backbone-view');
            var draggedItemView = $(ui.draggable).data('backbone-view');
            if ( ui.draggable.hasClass('wx-add-source-icon') ) {
                // If we're dragging a new feature icon up
                var featureName = ui.draggable.attr('id').replace('add-', '');
                var tabId = me.model.get('id');
                wxApp.appView.createFeatureView( featureName, tabId );
            } else {
                // We're moving a subtab up into another tab, update the db then move the subtab across
                Backbone.Events.trigger( 'tab:dropped', draggedItemView.model.get('parent_id') );
                if ( draggedItemView.model.get('parent_id') != me.model.get('id') ) {
                    wx.makeApiCall( 'tabs/set_parent_id', { tab_id: draggedItemView.model.get('id'), parent_id: me.model.get('id') }, function() {
                        draggedItemView.model.trigger('tab:move');
                        me.model.addSubTab( draggedItemView.model );
                    });
                }
            }
        },

        editAll: function() {
            // Make sure we're on the right tab first
            $('a[href="#panel2"]').click();

            // Now get the edit view.
            this.subTabsContainerView = new wxApp.SubTabsContainerView({ model: this.model });
            this.subTabsContainerView.tabView = this;
            $('#editSpace').html( this.subTabsContainerView.render().el );
        },

        updateTabId: function( currentTabId, newTabId ) {
            if ( currentTabId == this.model.get('id') ) {
                this.model.getSubTabs().forEach(function(subTab) {
                    subTab.set( 'parent_id', newTabId );
                });
                this.model.set( 'id', newTabId );
            }
        },

        loadIcon: function() {
            var me = this;
            $.get( wx.apiUrl + 'icons/get_icon_base64', { site_key: wx.siteKey, icon_id: parseInt( me.model.get('icon_id') ) }, function(iconData) {
                // alert( me.$('.wx-nav-icon-img').length );
                me.$el.find('.wx-nav-icon-img').attr('src', 'data:image/png;base64,' + iconData);
            });
        },

        destroyView: function() {
            wx.log('destroying tab view');
            if ( this.subTabsContainerView )
                this.subTabsContainerView.remove();
            this.remove();
        }
    });
})(jQuery);