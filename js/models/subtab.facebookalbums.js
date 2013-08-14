
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
                config: { url: 'http://facebook.com/' }
            }
        ),

        typeDescription: 'Facebook Photos'
    });

})(jQuery);