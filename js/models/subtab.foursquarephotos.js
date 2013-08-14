
var wxApp = wxApp || {};

(function($){
    wxApp.FoursquarePhotosSubTab = wxApp.SubTab.extend({
        default_icon_id: 25,
        allowedLayouts: ['list'],
        typeDescription: 'Foursquare',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Photos',
                icon_id: 25,
                type: 'foursquarePhotos',
                content: 'foursquarePhotos',
                layout: 'list',
                config: { venue_id: 'http://foursquare.com/v/' }
            }
        )
    });

})(jQuery);