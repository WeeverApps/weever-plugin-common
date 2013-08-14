
var wxApp = wxApp || {};

(function($){
    wxApp.PicasaAlbumsSubTab = wxApp.SubTab.extend({
        default_icon_id: 15,
        allowedLayouts: ['list'],
        typeDescription: 'Picasa Photos',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Photos',
                icon_id: 15,
                type: 'picasaAlbums',
                content: 'picasaAlbums',
                layout: 'list',
                config: { user_id: 'your.email@gmail.com' }
            }
        )
    });

})(jQuery);