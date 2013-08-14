
wxApp = wxApp || {};

(function($){
    wxApp.WordpressTagSubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        validateFeed: false,
        typeDescription: 'Content: Tag',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Blog',
                icon_id: 5,
                type: 'WordpressTag',
                content: 'html',
                layout: 'list',
                config: { url: '' }
            }
        )
    });

})(jQuery);