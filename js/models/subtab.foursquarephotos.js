
var wxApp = wxApp || {};

(function($){
    wxApp.FoursquarePhotosSubTab = wxApp.SubTab.extend({
        default_icon_id: 25,
        allowedLayouts: ['carousel'],
        typeDescription: 'Foursquare',

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Photos',
                icon: 'e057',
                icon_id: 25,
                type: 'foursquarePhotos',
                content: 'foursquarePhotos',
                layout: 'carousel',
                config: { venue_id: 'http://foursquare.com/v/' },
                helpBody: '<p><b>To find the web address of a Foursquare Venue:</b></p>' +
                          '<p>1. Search the web for "Foursquare" and the name of the location.</p>' +
                          '<p>2. Open the matching Foursquare venue page.</p>' +
                          '<p>3. Copy the web address (url) of the venue page from your browser address bar.</p>' +
                          '<p>Sharing live photos is a great way to engage event attendees or share info about a specific location.</p>'

            }
        );
        }
    });

})(jQuery);