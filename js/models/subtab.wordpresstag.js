
wxApp = wxApp || {};

(function($){
    wxApp.WordpressTagSubTab = wxApp.SubTab.extend({
        default_icon_id: 13,
        allowedLayouts: ['list'],
        validateFeed: false,
        typeDescription: 'Content: Tag',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Blog',
                icon_id: 13,
                type: 'WordpressTag',
                content: 'html',
                layout: 'list',
                config: { url: '', subtab_name: 'WordpressTagSubTab' }
            }
        )
    });

})(jQuery);