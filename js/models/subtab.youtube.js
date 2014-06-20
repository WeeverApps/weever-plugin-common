
var wxApp = wxApp || {};

(function($){
    wxApp.YoutubeSubTab = wxApp.SubTab.extend({
        default_icon_id: 18,
        allowedLayouts: ['list'],
        typeDescription: 'Youtube Videos',

        defaults: function() {
                return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                    title: 'YouTube',
                    icon: 'e037',
                    icon_id: 18,
                    type: 'youtube',
                    content: 'youtube',
                    layout: 'list',
                    config: { url: 'http://youtube.com/', subtab_name: 'YoutubeSubTab' },
                    // helpTitle:  'About Youtube videos',
                    helpBody:   '<p><b>Youtube Channels</b></p>' +
                                '<p>A YouTube Channel displays all videos associated with one YouTube user account.</p>' +
                                '<p><b>Youtube Playlists</b></p>' +
                                '<p>A Youtube playlist allows you to display a specific collection of videos from your account or from any public, sharing-enabled videos found on Youtube.</p>'
                }
            );
        }
    });

})(jQuery);