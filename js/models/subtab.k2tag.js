
wxApp = wxApp || {};

(function($){
    wxApp.K2TagSubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'K2 Tag',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Blog',
                icon: 'e836',
                icon_id: 5,
                type: 'K2Tag',
                content: 'html',
                layout: 'list',
                config: { subtab_name: 'K2TagSubTab' },
                helpTitle:  'Adding K2 content',
                helpBody:   '<p><b>Adding K2 content to your app</b></p>' +
                            '<p>Any K2 content you add to your app updates in real-time as you make changes.</p>'+
                            '<p><b>K2 Categories</b></p>'+
                            '<p>Add categories of K2 items to share a blog or specific content in real-time with app visitors.</p>' +
                            '<p><b>K2 Items</b></p>' +
                            '<p>Add specific individual K2 items to your app and arrange them in the layout of your preference.</p>' +
                            '<p><b>K2 Menu Items</b></p>' +
                            '<p>Add K2 item content to your app via an existing K2 menu item.  The app will display content according to the &ldquo;ordering&rdquo; and content source(s) specified for the menu item.</p>' +
                            '<p><b>Maps</b></p>' +
                            '<p>&ldquo;GeoTag&rdquo; individual Joomla articles or K2 items with a location/address and create a mobile, GPS-enabled map of those locations with appBuilder.</p>' +
                            '<p>We recommend using the &ldquo;Geotagger for Joomla&rdquo; plugin to add location information to articles or K2 items.</p>' +
                            '<p>Once you have added locations to articles or K2 items, use the appBuilder map making features to create a map using Joomla or K2 content categories.</p>' +
                            '<p>Note: articles or K2 items which are not Geotagged with location info will not display on your map.</p>' +
                            '<p><b>Nearby</b></p>' +
                            '<p>&ldquo;Nearby&rdquo; shows app users location listings nearest to them and distances.</p>' +
                            '<p>Create a &ldquo;Nearby&rdquo; feature with Joomla or K2 content in exactly the same way you would create a Joomla-based map.</p>' +
                            '<p>The difference is how the geotagged content displays.  &ldquo;Nearby&rdquo; lists articles or K2 items in order of nearest-distance instead of creating a custom Google map.</p>'

            });
		}
    });

})(jQuery);