
wxApp = wxApp || {};

(function($){
    wxApp.TabsView = Backbone.View.extend({
        el: '#editListTabsSortable',

        initialize: function() {
            this.collection.bind('add', this.addOne, this);
            Backbone.Events.on('tab:new', this.addNewlyCreatedTab, this);
            this.startSortable();
            this.startDroppable();
        },

        addOne: function(tab) {
            var me = this;
            var view = new wxApp.TabView({ model: tab });
            this.$el.append( view.render().el );
            // view.subTabsContainerView = new wxApp.SubTabsContainerView({ model: tab });
            // view.subTabsContainerView.tabView = view;
            // tab.on('destroy', function(tab) {
            //     me.removeTabFromCollection(tab);
            // });
        },

        startSortable: function() {
            var me = this;
            if ( undefined != this.$el.sortable ) {
                this.$el.sortable({
                    axis: "x",
                    cancel:	'.wx-nosort',
                    placeholder: 'wx-tab',
                    update: function(event, ui) {
                        var order = $(this).sortable('toArray');
                        order = $.map( order, function(element) {
                            var tabId = element.toLowerCase().replace('tabid', '');
                            if ( $.isNumeric( tabId ) )
                                return tabId;
                            else
                                return null;
                        });
                        wx.makeApiCall( 'tabs/sort_tabs', { order: String( order ) }, function() { wx.rebuildApp(); });

                        // Clear any erroneous styling on the dragged element
                        if ( $(ui.item).attr('rel') != 'unpublished' )
                            $(ui.item).removeAttr('style');
                        else
                            $(ui.item).attr('style', 'float:right;');
                    }
                });
            }
        },

        startDroppable: function() {
            this.$el.droppable( {
                accept: ".list-sub-items li, .list-add-content-items li",
                hoverClass: "hover",
                drop: this.onDrop,
                tolerance: 'pointer',
            } );
        },

        onDrop: function( event, ui ) {

            var me = $(this).data('backbone-view');
            var draggedItemView = $(ui.draggable).data('backbone-view');

            // We're moving a subtab up into another tab, update the db then move the subtab across
            Backbone.Events.trigger( 'tab:dropped', draggedItemView.model.get('parent_id') );
            
            wx.makeApiCall( 'tabs/set_parent_id', { tab_id: draggedItemView.model.get('id'), parent_id: 0 }, function() {
                draggedItemView.model.trigger('tab:move');
                wxApp.EditTabsView.__super__.addNewMainTab.call( this, draggedItemView.model );

                // Select the parent tab.
                $('#' + draggedItemView.model.get('id') + 'TabID').click();
            });

            Backbone.Events.trigger( 'subtab:dragstop' );

            // Manually reset the cursor.
            var lastStyleTag = $('style')[ $('style').length-1 ];
            if ( lastStyleTag.innerHTML.indexOf('*{ cursor') == 0 )
                lastStyleTag.remove();
        },

        addNewlyCreatedTab: function(model) {
            if ( model.get('parent_id') )
                this.addNewSubTab(model);
            else
                this.addNewMainTab(model);
        },

        addNewMainTab: function(model) {
            var tab = new wxApp.Tab( model.getAPIData() );
            tab.addSubTab( model );
            wxApp.Tabs.add( tab );

            if ( wxApp.Tabs.length === 2 ) {
                // The user has just added their first tab (Share App + Whatever they just added === 2)
                // Let's show them the Joyride.
                $(document).foundation('joyride', 'start');
            }
        },

        addNewSubTab: function(model) {
            var tab = wxApp.Tabs.get( model.get('parent_id') );
            if ( tab )
                tab.addSubTab( model );
            else
                throw new Error('No main tab with id' + model.get('parent_id'));
        },

        addTabToCollection: function(tab) {
            wxApp.Tabs.add( tab );
        },

        removeTabFromCollection: function(tab) {
            wxApp.Tabs.remove( tab );
        }
    });

    wxApp.tabsView = new wxApp.TabsView({ collection: wxApp.Tabs });

    // Grab the data and kick things off
    wxApp.Tabs.fetch();
})(jQuery);