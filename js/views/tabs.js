
wxApp = wxApp || {};

(function($){
    wxApp.TabsView = Backbone.View.extend({
        el: '#listTabsSortable',

        initialize: function() {
            this.collection.bind('add', this.addOne, this);
            this.collection.bind('remove', this.removeOne, this);
            Backbone.Events.on('tab:new', this.addNewlyCreatedTab, this);
            this.startTabs();
            this.startSortable();
            this.refreshUiTabs();
        },

        addOne: function(tab) {
            wx.log('addOne called');
            var me = this;
            var view = new wxApp.TabView({ model: tab });
            this.$el.append( view.render().el );
            view.subTabsContainerView = new wxApp.SubTabsContainerView({ model: tab });
            view.subTabsContainerView.tabView = view;
            tab.on('destroy', function(tab) {
                wx.log('removing tab from collection');
                me.removeTabFromCollection(tab);
            });
            tab.on('change', this.refreshUiTabs, this);
            $('#listTabs').append( view.subTabsContainerView.render().el );
            this.refreshUiTabs();
        },

        startTabs: function() {
            if ( undefined != $('#listTabs').tabs ) {
                $("#listTabs").tabs( {
                    select: function(e, ui) {
                        jQuery('#wxuia-header-parentMenu li').removeClass('wxuia-selected');

                        if ( ui.tab.href.indexOf('addTab') != -1 ) {
                            jQuery('#addtabspan').show();
                            jQuery('#addtabspan').css('display', 'block');
                            jQuery('#edittabspan').hide();

                            // Get the header selected correctly
                            jQuery('#wxuia-header-parentMenu li:first').addClass('wxuia-selected');
                        } else {
                            jQuery('#addtabspan').hide();
                            jQuery('#edittabspan').show();
                            jQuery('#edittabspan').css('display', 'block');
                            // Get the header selected correctly
                            jQuery('#wxuia-header-parentMenu li:nth-child(2)').addClass('wxuia-selected');
                        }
                    }
                } );
            }
        },

        startSortable: function() {
            var me = this;
            if ( undefined != this.$el.sortable ) {
                this.$el.sortable({
                    axis: "x",
                    cancel:	'.wx-nosort',
                    update: function(event, ui) {
                        var order = $(this).sortable('toArray');
                        order = $.map( order, function(element) {
                            var tabId = element.toLowerCase().replace('tabid', '');
                            if ( $.isNumeric( tabId ) )
                                return tabId;
                            else
                                return null;
                        });
                        wx.makeApiCall( 'tabs/sort_tabs', { order: String( order ) }, function() {});

                        // Clear any erroneous styling on the dragged element
                        if ( $(ui.item).attr('rel') != 'unpublished' )
                            $(ui.item).removeAttr('style');
                        else
                            $(ui.item).attr('style', 'float:right;');
                    }
                });
            }
        },

        refreshUiTabs: function() {
            if ( undefined != $('#listTabs').tabs ) {
                $('#listTabs').tabs( 'refresh' );
            }
        },

        removeOne: function(tab) {
            wx.log('removeOne called (tabs view)');
            $('#listTabs').tabs( 'refresh' );
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
            this.addTabToCollection( tab );
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