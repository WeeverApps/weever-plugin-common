
wxApp = wxApp || {};

(function($){
    wxApp.WordpressSearchtermSubTab = wxApp.SubTab.extend({
        default_icon_id: 8,
        allowedLayouts: ['list'],
        typeDescription: 'Content: Search Term',
        validateFeed: false,

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Search',
                icon_id: 8,
                type: 'WordpressSearchterm',
                content: 'html',
                layout: 'list',
                config: { url: '' }
            }
        )
    });

})(jQuery);