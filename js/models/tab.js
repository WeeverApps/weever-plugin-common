
var wxApp = wxApp || {};

(function(){
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
            this.get('subTabs').on('remove', function() {
                if ( ! me.getSubTabs().length )
                    me.trigger('destroy');
            });
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

        getAPIData: function() {
            var data = this.toJSON();
            data.config = JSON.stringify(data.config);
            if ( data.id == data.parent_id )
                delete data['parent_id'];
            if ( data.id )
                data.tab_id = data.id;
            return this.filterAPIData( data );
        },

        filterAPIData: function( data ) {

            /* The 'geo' attribute is being sent erroneously in get_tabs, and
             * its presence causes issues when provided to add_tabs (Undefined
             * property: 'latitude'). So, until Rob gets a chance to fix the
             * API, we have to remove the geo attribute here.
             *
             * More Info: The problem comes from attempting to send 'false'
             * because the API is looking for _any_ value. If it's false,
             * we delete it here.
             */
            if ( typeof data.geo !== 'undefined' ) {
                if ( ! data.geo ) {
                    delete data.geo;
                }
            }

            return data;
        },

        toJSON: function() {
            var retVal = JSON.parse(JSON.stringify(this.attributes));
            retVal.validateFeed = this.validateFeed;
            retVal.typeDescription = this.typeDescription;
            return retVal;
        },

        destroy: function( callback ) {
            var me = this,
                deletedCount = 0;

            if ( me.get('subTabs') ) {
                // Delete this tab and all of the subtabs from the API.
                for (var i = 0; i < me.get('subTabs').length; i++) {
                    var m = me.get('subTabs').models[i];
                    wx.makeApiCall('tabs/delete', { tab_id: m.get('id') }, function() {
                        deletedCount++;
                        if ( deletedCount === me.get('subTabs').length ) {
                            if (callback) callback();
                        }
                    });
                }
            }
            else {
                // No subtabs; just delete this one.
                wx.makeApiCall('tabs/delete', { tab_id: me.get('id') }, function() {
                    if (callback) callback();
                });
            }

            // Remove the tabs from the view.
            me.trigger('destroy');
        }
    });
})();