
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
            'click #ContainerEditLink'      : 'openEditModal',
            'click .button-delete'          : 'bulkDelete',
            'click .button-move'            : 'bulkMove',
            'click .tab-select-all-checkbox': 'selectAll',
            'click .tab-select-checkbox'    : 'selectOne',
            'click .wx-delete-container'    : 'confirmDelete',
            'click .wx-layout-selector'     : 'selectLayout'
        },

        render: function() {
            this.$el.html( this.subTabContainerTpl( this.model.toJSON() ) );
            this.$('#ContainerEditModal').html( this.containerEditContentTpl( this.model.toJSON() ) );
            this.$('.adminlist').append( this.subTabsView.render().el );
            this.$el.attr('id', this.model.get('id') + 'Tab');

            var $moveTo = this.$('.select-move-to');

            $moveTo.html('<option value="-1">Move To…</option>');
            $moveTo.append('<option value="0">Create new tab</option>');
            for (var i = 0; i < wxApp.Tabs.length; i++) {
                var tab = wxApp.Tabs.models[i];
                if ( tab.get('id') !== this.model.get('id') ) {
                    $moveTo.append('<option value="' + tab.get('id') + '">' + tab.get('tabTitle') + '</option');
                }
            }

            return this;
        },

        bulkDelete: function() {
            event.preventDefault();
            var ids = this._getSelectedSubtabs();

            if ( ids.length > 0 && confirm('Are you sure you want to delete this item, including all of the sub-tabs?') ) {
                this.$('.button-move').addClass('disabled');
                this._delete(ids);
            }
        },

        bulkMove: function() {
            var ids = this._getSelectedSubtabs();

            if ( ids.length === 0 ) return;

            this.$('.button-move').addClass( 'disabled' );

            if ( this.$('.select-move-to').val() === '-1' ) {
                alert('Please select a tab to move the selected subtabs to.');
            }
            else {
                this._move( ids, this.$('.select-move-to').val() );
            }
        },

        openEditModal: function() {
            console.log('editing container...');
            this.containerEditView = new wxApp.ContainerEditView({ model: this.model });
            this.$('#ContainerEditModal').html( this.containerEditView.render().el );

            this.$('.section-container').foundation('reflow');
        },

        selectAll: function() {
            console.log('selected', this.$('input.tab-select-checkbox:checked').length);

            if ( this.$('input.tab-select-checkbox:checked').length ) {
                // De-select all of the checkboxes
                this.$('input.tab-select-checkbox:checked').prop('checked', false);
                this.$('input.tab-select-all-checkbox').prop('checked', false);
            }
            else {
                // Select all the checkboxes
                this.$('input.tab-select-checkbox').prop('checked', true);
                this.$('input.tab-select-all-checkbox').prop('checked', true);
            }

            this._setMoveButtonStatus();
        },

        selectOne: function() {
            if ( this.$('input.tab-select-checkbox:checked').length === this.$('input.tab-select-checkbox').length ) {
                // If they're all selected, select the select-all checkbox.
                this.$('input.tab-select-all-checkbox').prop('checked', true);
            }
            else {
                this.$('input.tab-select-all-checkbox').prop('checked', false);
            }

            this._setMoveButtonStatus();
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
                    }
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
        },

        _delete: function( ids ) {
            var me = this,
                complete = 0;
            me.$('.button-move').html(complete.toString() + '/' + ids.length);

            for (var i = 0; i < ids.length; i++) {
                var tab = me._getTab( ids[i] );

                tab.destroy(function() {
                    complete++;
                    me.$('.button-move').html(complete.toString() + '/' + ids.length);
                    if ( complete === ids.length ) {
                        me.$('.button-move').html('Apply');
                        me.$('.button-move').removeClass('disabled');
                        wx.rebuildApp();
                    }
                });
            }
        },

        _getSelectedSubtabs: function() {
            var ids = [];
            for (var i = 0; i < this.$('input.tab-select-checkbox:checked').length; i++) {
                ids.push( this.$('input.tab-select-checkbox:checked')[i].id );
            }
            return ids;
        },

        _getTab: function( tabId ) {
            var tabToReturn = null;

            for (var i = 0; i < wxApp.Tabs.length; i++) {
                var parentTab = wxApp.Tabs.models[i];
                if ( parentTab.get('id') == tabId ) {
                    tabToReturn = parentTab;
                    break;
                }

                for (var j = 0; j < parentTab.get('subTabs').length; j++) {
                    var subTab = parentTab.get('subTabs').models[j];
                    if ( subTab.get('id') == tabId ) {
                        tabToReturn = subTab;
                        break;
                    }
                }

                if ( tabToReturn ) break;
            }

            return tabToReturn;
        },

        _move: function(tabIdsToMove, newParentTabId) {
            var me = this,
                movesCompleted = 0;
            me.$('.button-move').html(movesCompleted.toString() + '/' + tabIdsToMove.length);

            for (var i = 0; i < tabIdsToMove.length; i++) {
                var tabId = tabIdsToMove[i];
                me._moveClosure(tabId, newParentTabId, function() {
                    movesCompleted++;
                    me.$('.button-move').html(movesCompleted.toString() + '/' + tabIdsToMove.length);
                    if ( movesCompleted === tabIdsToMove.length ) {
                        me._moveComplete( newParentTabId );
                    }
                });
            }
        },

        _moveClosure: function( tabId, newParentTabId, callback ) {
            var tab = this._getTab( tabId );

            wx.makeApiCall( 'tabs/set_parent_id', { tab_id: tabId, parent_id: newParentTabId }, function() {
                 tab.trigger('tab:move');
                wxApp.tabsView.addNewMainTab( tab );
                if ( callback )
                    callback();
            });
        },

        _moveComplete: function( newParentTabId ) {
            wx.rebuildApp();
            this.$('.button-move').html('Apply');
            this.$('.button-move').removeClass('disabled');

            // Re-fetch the tabs.
            $('#editListTabsSortable').html( '' );
            wxApp.Tabs.fetch(function() {
                wxApp.tabsView.destroy();
                wxApp.tabsView = new wxApp.TabsView({ collection: wxApp.Tabs });

                // Select the parent tab.
                $('#' + newParentTabId + 'TabID').click();
            });
        },

        _setMoveButtonStatus: function() {
            if ( this.$('input.tab-select-checkbox:checked').length === 0 ) {
                this.$('.button-move').addClass( 'disabled' );
            }
            else {
                this.$('.button-move').removeClass( 'disabled' );
            }
        }
    });
})(jQuery); 