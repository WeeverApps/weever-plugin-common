
wxApp = wxApp || {};

(function($){
    wxApp.WordpressCategorySubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'Content: Category',
        validateFeed: false,

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Blog',
                icon_id: 5,
                type: 'WordpressCategory',
                content: 'html',
                layout: 'list',
                config: {}
            }
        )
    });

})(jQuery);