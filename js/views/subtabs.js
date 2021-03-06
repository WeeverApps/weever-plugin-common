
wxApp = wxApp || {};

(function($){
    wxApp.SubTabsView = Backbone.View.extend({
        tagName: 'ul',
        className: 'list-items-sortable list-items list-sub-items',

        attributes: function() {
            return {
                id: 'listItemsSortable' + this.model.get('id')
            }
        },

        initialize: function() {
            var me = this;
            this.model.get('subTabs').bind( 'add', me.addSubTab, me );
        },

        events: {
            // TODO: Handle re-order event?
        },

        render: function() {
            this.$el.html('');
            this.startSortable();

            if ( this.model.getSubTabs().length ) {
                var me = this;
                this.model.getSubTabs().forEach(function(subTab) {
                    me.addSubTab(subTab);
                });
            }
            return this;
        },

        addSubTab: function(subTab) {
            var me = this;
            var view = new wxApp.SubTabView({ model: subTab });
            this.$el.append( view.render().el );
            subTab.on('destroy', function() {
                me.deleteSubTab(this);
            });
            this.refreshSortable();
        },

        startSortable: function() {
            var me = this;
            if ( undefined != this.$el.sortable ) {
                this.$el.sortable({
                    start: function(event, ui) {
                        console.log('trigger dragstart');
                        Backbone.Events.trigger( 'subtab:dragstart' );
                    },
                    stop: function(event, ui) {
                        Backbone.Events.trigger( 'subtab:dragstop' );
                    },
                    update: function(event, ui) {
                        if ( !$(ui.item).data('backbone-view') )
                            return;

                        if ( wx.setting_parent ) {
                            // If we are currently setting the parent ID (see views/tab.js:57), we
                            // do not want to sort as well. It causes subtabs to become parents,
                            // parents to be come children, Share Tabs all over the place, cats and
                            // dogs living together, total hysteria.
                            return;
                        }

                        console.log('update');
                        var order = String( $(this).sortable('toArray').map( function(element) {
                            return element.replace('SubtabID', '');
                        }) );
                        
                        wx.makeApiCall( 'tabs/sort_tabs', { order: order }, function() {
                            wx.rebuildApp();
                            me.setSubTabCollectionOrder( order.split(',') );
                            var firstTabId = order.split(',')[0];
                            var mainTabId = $(ui.item).data('backbone-view').model.get('parent_id');
                            if ( mainTabId != firstTabId )
                                Backbone.Events.trigger( 'tab:id-update', mainTabId, firstTabId );
                        });
                    },
                    helper: 'clone',
                    cursor: 'move',
                    handle: '.wx-subtab-movehandle'
                });
            }
        },

        setSubTabCollectionOrder: function( order ) {
            this.model.get('subTabs').comparator = function(subTab) {
                return order.indexOf( String( subTab.get('id') ) );
            }
            this.model.get('subTabs').sort();
        },

        refreshSortable: function() {
            try {
                if ( undefined != this.$el.sortable )
                    this.$el.sortable( 'refresh' );
            }
            catch (e) {
                // Do nothing. This occurs when you're dragging the last item out.
            }
        },

        deleteSubTab: function(subTab) {
            this.model.deleteSubTab(subTab);
        }
    });
})(jQuery);