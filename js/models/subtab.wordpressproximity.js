
wxApp = wxApp || {};

(function($){
    wxApp.WordpressProximitySubTab = wxApp.SubTab.extend({
        default_icon_id: 27,
        allowedLayouts: ['list'],
        typeDescription: 'Content: Nearby',
        validateFeed: false,

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Nearby',
                icon_id: 27,
                type: 'WordpressProximity',
                content: 'html',
                layout: 'list',
                config: { url: '', gps: '1', geotag: '1' }
            }
        )
    });

})(jQuery);