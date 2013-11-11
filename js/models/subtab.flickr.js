
var wxApp = wxApp || {};

(function($){
    wxApp.FlickrSubTab = wxApp.SubTab.extend({
        default_icon_id: 19,
        allowedLayouts: ['list'],
        typeDescription: 'Flickr',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Flickr',
                icon: 'e049',
                icon_id: 19,
                type: 'flickr',
                content: 'flickrPhotostream',
                layout: 'carousel',
                config: { url: 'http://flickr.com/' },
                helpBody: '<p><b>Flickr compatibility</b></p>' +
                          '<p>Only publicly available photos on Flickr will display. Photos uploaded prior to April 2011 may not display as gallery thumbnails – simply rotate and resave these photos to fix.</p>' +
                          '<p><b>Coming soon</b></p>' +
                          '<p>Support for Flickr &ldquo;group pools&rdquo; (community galleries) and the ability to add just one photo set at a time to your app.</p>'
            }
        )
    });

})(jQuery);