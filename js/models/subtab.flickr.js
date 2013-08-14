
var wxApp = wxApp || {};

(function($){
    wxApp.FlickrSubTab = wxApp.SubTab.extend({
        default_icon_id: 19,
        allowedLayouts: ['list'],
        typeDescription: 'Flickr',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Flickr',
                icon_id: 19,
                type: 'flickr',
                content: 'flickrPhotostream',
                layout: 'carousel',
                config: { url: 'http://flickr.com/' }
            }
        )
    });

})(jQuery);