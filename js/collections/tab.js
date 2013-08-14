
wxApp = wxApp || {};

(function($){
    wxApp.TabsCollection = Backbone.Collection.extend({
        model: wxApp.Tab,
        url: wx.apiUrl + 'tabs/get_tabs?site_key=' + wx.siteKey,

        getModelNameByTabData: function( tabData ) {
            var retVal = 'SubTab';
            // TODO: Call a function in each model to see if the type/content matches
            switch ( tabData.content ) {
                case 'twitter':
                    retVal = 'TwitterSubTab';
                    break;
                case 'youtubePlaylist':
                    retVal = 'YoutubeSubTab';
                    break;
                case 'flickrPhotosets':
                    retVal = 'FlickrSubTab';
                    break;
                default:
                    // Check against type first (more specific but only newer tabs), then content (more generic)
                    for ( var obj in wxApp ) {
                        if ( obj.indexOf('SubTab') != -1 &&  undefined != wxApp[obj].prototype.defaults && undefined != wxApp[obj].prototype.defaults.type ) {
                            if ( wxApp[obj].prototype.defaults.type == tabData.type ) {
                                retVal = obj;
                                break;
                            }
                        }
                    }

                    if ( 'SubTab' == retVal ) {
                        for ( var obj in wxApp ) {
                            if ( obj.indexOf('SubTab') != -1 &&  undefined != wxApp[obj].prototype.defaults && undefined != wxApp[obj].prototype.defaults.content ) {
                                if ( wxApp[obj].prototype.defaults.content == tabData.content ) {
                                    retVal = obj;
                                    break;
                                }
                            }
                        }
                    }
            }
            return retVal;
        },

        fetch: function() {
            var me = this;
            wx.makeApiCall('tabs/get_tabs', {}, function(data) {
                if ( typeof data.tabs != 'undefined' ) {
                    var tabs = [];
                    for ( var tabIndex = 0; tabIndex < data.tabs.length; tabIndex++ ) {
                        var tabData = data.tabs[tabIndex];
                        if ( null === tabData.parent_id ) {
                            var tab = new wxApp.Tab( tabData );
                            // This 'main' tab is also a 'sub' tab
                            var modelName = me.getModelNameByTabData( tabData );
                            tab.addSubTab( new wxApp[modelName]( tabData ) );
                            for ( var i = 0; i < data.tabs.length; i++ ) {
                                if ( tab.get('id') == data.tabs[i].parent_id ) {
                                    modelName = me.getModelNameByTabData( data.tabs[i] );
                                    tab.addSubTab( new wxApp[modelName]( data.tabs[i] ) );
                                }
                            }
                            tabs.push( tab );
                        }
                    }
                    me.reset();
                    for ( i = 0; i < tabs.length; i++ )
                        me.add( tabs[i] );
                    if ( me.length )
                        wx.refreshAppPreview();
                }
            });
        }
    });

    wxApp.Tabs = new wxApp.TabsCollection();
})(jQuery);