
var wxApp = wxApp || {};

(function($){
    wxApp.FacebookAlbumsSubTab = wxApp.SubTab.extend({
        default_icon_id: 15,

        allowedLayouts: ['list'],

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Photos',
                icon_id: 15,
                type: 'facebookAlbums',
                content: 'facebookAlbums',
                layout: 'list',
                config: { url: 'http://facebook.com/', user_id: 'http://facebook.com/MyPage' },
                helpTitle: 'Help Tips',
                helpBody: '<p><b>Facebook pages vs. profiles</b></p>' +
                          '<p>Due to privacy restrictions, only <b>Facebook Page</b> content can be added to your app.  Make sure you are trying to add photos from a public-facing &ldquo;page&rdquo; and not a personal profile.</p>' +
                          '<p>Photos must be public.  You can check your Facebook sharing settings by logging out of Facebook completely and refreshing the Facebook page in question.</p>'
            }
        ),

        typeDescription: 'Facebook Photos'
    });

})(jQuery);
