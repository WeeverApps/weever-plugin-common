
var wxApp = wxApp || {};

(function($){
    wxApp.TwitterSubTab = wxApp.SubTab.extend({
        default_icon_id: 21,
        allowedLayouts: ['list'],
        typeDescription: 'Twitter',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Social',
                icon_id: 21,
                type: 'twitterUser',
                content: 'twitterUser',
                layout: 'list',
                config: {}
            }
        )
    });

})(jQuery);