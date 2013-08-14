
var wxApp = wxApp || {};

(function($){
    wxApp.FacebookWallSubTab = wxApp.SubTab.extend({
        default_icon_id: 13,
        typeDescription: 'Facebook Wall',
        allowedLayouts: ['list'],

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Facebook',
                icon_id: 13,
                type: 'facebookWall',
                content: 'facebookStatuses',
                layout: 'list',
                config: { url: 'http://facebook.com/' }
            }
        )
    });

})(jQuery);