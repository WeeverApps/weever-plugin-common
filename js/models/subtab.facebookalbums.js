
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
                helpTitle: 'Help: Facebook photos',
                helpBody: '<p><b>Facebook Privacy</b></p><p>Due to privacy settings, only Facebook <b>Page</b> content can be added to your app.  Make sure you are using photos from a public-facing &ldquo;page&rdquo; and not a personal profile.</p>'
            }
        ),

        typeDescription: 'Facebook Photos'
    });

})(jQuery);
