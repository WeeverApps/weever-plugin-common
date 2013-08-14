
var wxApp = wxApp || {};

(function($){
    wxApp.YoutubeSubTab = wxApp.SubTab.extend({
        default_icon_id: 18,
        allowedLayouts: ['list'],
        typeDescription: 'Youtube',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'YouTube',
                icon_id: 18,
                type: 'youtube',
                content: 'youtube',
                layout: 'list',
                config: { url: 'http://youtube.com/' }
            }
        )
    });

})(jQuery);