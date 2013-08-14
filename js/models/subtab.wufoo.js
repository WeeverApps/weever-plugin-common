
var wxApp = wxApp || {};

(function($){
    wxApp.WufooSubTab = wxApp.SubTab.extend({
        default_icon_id: 30,
        allowedLayouts: ['list'],
        typeDescription: 'Wufoo Forms',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Forms',
                icon_id: 30,
                type: 'wufoo',
                content: 'wufoo',
                layout: 'list',
                config: { url: 'https://USERNAME.wufoo.com', apikey: 'XXXX-XXXX-XXXX-XXXX' }
            }
        )
    });

})(jQuery);