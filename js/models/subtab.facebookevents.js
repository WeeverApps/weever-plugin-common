
var wxApp = wxApp || {};

(function($){
    wxApp.FacebookEventsSubTab = wxApp.SubTab.extend({
        default_icon_id: 16,
        allowedLayouts: ['list'],
        typeDescription: 'Facebook Events',

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Events',
                icon: 'e029',
                icon_id: 16,
                type: 'facebookEvents',
                content: 'facebookEvents',
                layout: 'list',
                config: { url: 'http://facebook.com/', subtab_name: 'FacebookEventsSubTab' },
                helpBody: '<p><b>Facebook pages vs. profiles</b></p>' +
                          '<p>Due to privacy restrictions, only <b>Facebook Page</b> content can be added to your app.  Make sure you are trying to add events from a public-facing &ldquo;page&rdquo; and not a personal profile.</p>' +
                          '<p>Events must be public.  You can check your Facebook sharing settings by logging out of Facebook completely and refreshing the Facebook page in question.</p>'
            });
        }
    });

})(jQuery);