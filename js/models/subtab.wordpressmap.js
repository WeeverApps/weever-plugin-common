
wxApp = wxApp || {};

(function($){
    wxApp.WordpressMapSubTab = wxApp.SubTab.extend({
        default_icon_id: 20,
        allowedLayouts: ['list'],
        typeDescription: 'Content: Map',
        validateFeed: false,

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Map',
                icon_id: 20,
                type: 'WordpressMap',
                content: 'html',
                layout: 'list',
                tabLayout: 'map',
                config: { url: '', gps: '1' }
            }
        )
    });

})(jQuery);