
wxApp = wxApp || {};

(function($){
    wxApp.WordpressPageSubTab = wxApp.SubTab.extend({
        default_icon_id: 28,
        allowedLayouts: ['list'],
        typeDescription: 'Content: Pages',
        validateFeed: false,

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Pages',
                icon_id: 28,
                type: 'WordpressPage',
                content: 'htmlPage',
                layout: 'panel',
                config: { url: '' }
            }
        )

    });

})(jQuery);