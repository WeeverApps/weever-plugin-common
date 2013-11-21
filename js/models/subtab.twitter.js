
var wxApp = wxApp || {};

(function($){
    wxApp.TwitterSubTab = wxApp.SubTab.extend({
        default_icon_id: 21,
        allowedLayouts: ['list'],
        typeDescription: 'Twitter',

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Social',
                icon: 'e025',
                icon_id: 21,
                type: 'twitterUser',
                content: 'twitterUser',
                layout: 'list',
                config: { subtab_name: 'TwitterSubTab' }
            });
        }
    });

})(jQuery);