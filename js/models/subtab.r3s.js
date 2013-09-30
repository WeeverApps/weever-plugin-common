
wxApp = wxApp || {};

(function($){
    wxApp.r3sSubTab = wxApp.SubTab.extend({
        default_icon_id: 6,
        typeDescription: 'R3S Feed',
        allowedLayouts: ['list'],

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'R3S Feed',
                icon_id: 6,
                type: 'r3s',
                content: 'htmlR3s',
                layout: 'list',
                config: { url: 'http://yourwebsite.com/?feed=r3s' }
            }
        )
    });

})(jQuery);