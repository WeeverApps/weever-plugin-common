
var wxApp = wxApp || {};

(function($){
    wxApp.FacebookEventsSubTab = wxApp.SubTab.extend({
        default_icon_id: 16,
        allowedLayouts: ['list'],
        typeDescription: 'Facebook Events',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Events',
                icon_id: 16,
                type: 'facebookEvents',
                content: 'facebookEvents',
                layout: 'list',
                config: { url: 'http://facebook.com/' }
            }
        )
    });

})(jQuery);