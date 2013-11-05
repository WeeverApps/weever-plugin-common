
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
                config: { url: 'http://facebook.com/' },
                helpBody: '<p><b>Facebook pages vs. profiles</b></p>' +
                          '<p>Due to privacy restrictions, only <b>Facebook Page</b> content can be added to your app.  Make sure you are trying to add wall updates from a public-facing &ldquo;page&rdquo; and not a personal profile.</p>' +
                          '<p>Wall updates must be public.  You can check your Facebook sharing settings by logging out of Facebook completely and refreshing the Facebook page in question.</p>'            }
        )
    });

})(jQuery);