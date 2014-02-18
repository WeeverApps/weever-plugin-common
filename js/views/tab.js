
wxApp = wxApp || {};

(function($){
    wxApp.TabView = Backbone.View.extend({
        tagName: 'div',
        className: 'wx-tab',
        subTabsContainerView: false,

        initialize: function() {
            this.tabTpl = _.template( $('#tab-template').html() );
            this.model.bind( 'change', this.rerender, this );
            this.model.bind( 'destroy', this.destroyView, this );
            Backbone.Events.on( 'tab:id-update', this.updateTabId, this );
        },

        events: {
            'click': 'editAll'
        },

        rerender: function() {
            this.render();
        },

        render: function() {
            this.$el.html( this.tabTpl( this.model.toJSON() ) );
            this.loadIcon();
            if ( undefined !== this.$el.droppable ) {
                this.$el.droppable( {
                    accept: ".list-sub-items li",
                    hoverClass: "hover",
                    drop: this.onDrop,
                    tolerance: 'pointer',
                    greedy: true
                } );
            }
            this.$el.data( 'backbone-view', this );
            this.$el.addClass( this.model.get('id') );
            this.$el.attr('id', this.model.get('id') + 'TabID');
            return this;
        },

        onDrop: function( event, ui ) {
            console.log('onDrop');
            
            var me = $(this).data('backbone-view');
            var draggedItemView = $(ui.draggable).data('backbone-view');
            
            // We're moving a subtab up into another tab, update the db then move the subtab across
            Backbone.Events.trigger( 'tab:dropped', draggedItemView.model.get('parent_id') );
            if ( draggedItemView.model.get('parent_id') != me.model.get('id') ) {
                wx.makeApiCall( 'tabs/set_parent_id', { tab_id: draggedItemView.model.get('id'), parent_id: me.model.get('id') }, function() {
                    draggedItemView.model.trigger('tab:move');
                    me.model.addSubTab( draggedItemView.model );
                    // Select the parent tab.
                    $('#' + me.model.get('id') + 'TabID').click();
                });
            }

            Backbone.Events.trigger( 'subtab:dragstop' );

            // Manually reset the cursor.
            var lastStyleTag = $('style')[ $('style').length-1 ];
            if ( lastStyleTag.innerHTML.indexOf('*{ cursor') == 0 )
                lastStyleTag.remove();
        },

        editAll: function() {
            // Make sure we're on the right tab first
            $('a[href="#panel2"]').click();

            // Highlight the currently selected tab.
            $('.wx-tab button').addClass( 'secondary' );
            // Since the button is duplicated on the Build and Edit tabs, we can't just do this:
            // this.$('button').removeClass( 'secondary' );
            // We instead have to select by the css class
            $('div.' + this.model.get('id') + ' button').removeClass( 'secondary' );

            // It might be a good idea to scroll the 'Edit' tab to the same position as the 'build' tab.

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
            // No longer get icon base64; get via font.
            // May need to re-add this if/when we go for multiple fonts.
            // var me = this;
            // $.get( wx.apiUrl + 'icons/get_icon_base64', { site_key: wx.siteKey, icon_id: parseInt( me.model.get('icon_id') ) }, function(iconData) {
            //     me.$('.wx-nav-icon-img').attr('src', 'data:image/png;base64,' + iconData);
            // });
        },

        destroyView: function() {
            wx.log('destroying tab view');
            if ( this.subTabsContainerView )
                this.subTabsContainerView.remove();
            this.remove();
        }
    });
})(jQuery);