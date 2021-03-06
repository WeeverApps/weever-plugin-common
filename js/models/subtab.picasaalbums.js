
var wxApp = wxApp || {};

(function($){
    wxApp.PicasaAlbumsSubTab = wxApp.SubTab.extend({
        default_icon_id: 15,
        allowedLayouts: ['list'],
        typeDescription: 'Picasa Photos',

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Photos',
                icon: 'e053',
                icon_id: 15,
                type: 'picasaAlbums',
                content: 'picasaAlbums',
                layout: 'list',
                config: { user_id: 'your.email@gmail.com', subtab_name: 'PicasaAlbumsSubTab' }
            }
        );
        }
    });

})(jQuery);