
var wxApp = wxApp || {};

(function($){
    wxApp.TabsCollection = Backbone.Collection.extend({
        model: wxApp.Tab,
        url: wx.apiUrl + 'tabs/get_tabs?site_key=' + wx.siteKey,
        loaded: false,

        fetch: function( onCompleteCallback ) {
            var me = this;
            wx.makeApiCall('tabs/get_tabs', {}, function(data) {
                if ( typeof data.tabs != 'undefined' ) {
	                // @TODO Make sure that data.tabs config objects are properly typed; Weever API issue
	                console.log( 'TABS!', data.tabs );
                    var tabs = [];
                    for ( var tabIndex = 0; tabIndex < data.tabs.length; tabIndex++ ) {
                        var tabData = data.tabs[tabIndex];
                        if ( !tabData.parent_id ) {
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
                    for ( i = 0; i < tabs.length; i++ ) {
                        me.add( tabs[i] );
                    }

                    me.loaded = true;

                    if ( onCompleteCallback )
                        onCompleteCallback();
                }
            });
        }
    });

    wxApp.Tabs = new wxApp.TabsCollection();
})(jQuery);