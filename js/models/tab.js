
var wxApp = wxApp || {};

(function($){
    wxApp.Tab = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            icon_id: 1,
            icon: '',
            tabIcon: null,
            tabIcon_id: 0,
            subTabs: false
        },

        validate: function(attribs) {

        },

        initialize: function() {
            var me = this;
            var subTabs = new wxApp.SubTabCollection();
            this.set({ subTabs: subTabs });
            this.on('invalid', function(model, error) {
                console.log(error);
            });
            this.get('subTabs').on('remove', function(subTab) {
                if ( ! me.getSubTabs().length )
                    me.trigger('destroy');
            });
            // @TODO: See if better to bind than to use addSubTab function?
            //this.subTabs.bind('add', this.addSubTab, this);
        },

        setTitle: function(newTitle) {
            this.set({ title: newTitle });
        },

        addSubTab: function(subTab) {
            var me = this;
            subTab.set( 'parent_id', this.get('id') );
	        if ( typeof this.get( 'subTabs' ) == 'undefined' ) {
		        this.set( {
			        subTabs: new wxApp.SubTabCollection()
		        } );
	        }
            this.get('subTabs').add( subTab );
            subTab.on('tab:move', function() {
                me.getSubTabs().remove(this);
            } );
        },

        deleteSubTab: function(subTab) {
            this.get('subTabs').remove(subTab);
        },

        getSubTabs: function() {
            return this.get('subTabs');
        },

        destroy: function() {
            if ( this.get('subTabs') ) {
                // Delete this tab and all of the subtabs from the API.
                for (var i = 0; i < this.get('subTabs').length; i++) {
                    var m = this.get('subTabs').models[i];
                    wx.makeApiCall('tabs/delete', { tab_id: m.get('id') }, function() { });
                }
            }
            else {
                // No subtabs; just delete this one.
                wx.makeApiCall('tabs/delete', { tab_id: this.get('id') }, function() { });
            }

            // Remove the tabs from the view.
            this.trigger('destroy');
        }
    });
})(jQuery);