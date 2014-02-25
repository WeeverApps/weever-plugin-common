
wxApp = wxApp || {};

(function($){
    wxApp.WordpressProximitySubTab = wxApp.SubTab.extend({
        default_icon_id: 27,
        allowedLayouts: ['list'],
        typeDescription: 'Nearby',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Nearby',
                icon: 'e101',
                icon_id: 27,
                type: 'WordpressProximity',
                content: 'html',
                layout: 'list',
                config: { url: '', gps: '1', geotag: '1', subtab_name: 'WordpressProximitySubTab' },
                helpTitle:  'About Nearby',
                helpBody:   '<p><b>Adding Wordpress content to your app</b></p>' +
                            '<p>Any Wordpress content you add to your app updates in real-time as you make changes.</p>' +
                            '<p><b>Wordpress Nearby</b></p>' +
                            '<p>&ldquo;Nearby&rdquo; shows app users location listings nearest to them and distances.</p>' +
                            '<p>Create a &ldquo;Nearby&rdquo; feature with Wordpress content in exactly the same way you would create a Wordpress-based map.</p>' +
                            '<p>The difference is how the posts display.  &ldquo;Nearby&rdquo; lists posts in order of nearest-distance instead of creating a custom Google map.</p>' +
                            '<p><b>Wordpress Maps</b></p>' +
                            '<p>&rdquo;GeoTag&ldquo; individual Wordpress posts with a location/address and create a mobile, GPS-enabled map of those locations with appBuilder.</p>' +
                            '<p>We recommend using the Wordpress <a target="_blank" href="http://wordpress.org/plugins/geolocation/">Geolocation plugin</a> to add location information to posts.</p>' +
                            '<p>Once you have added locations to posts, use the appBuilder map making features to create a map using Wordpress post categories.</p>' +
                            '<p>Note: posts which are not Geotagged with location info will not display on your map.</p>' +
                            '<p><b>Wordpress Posts</b></p>' +
                            '<p>Add categories of Wordpress &lsquo;posts&rsquo; to share a blog or specific content in real-time with app visitors.</p>' +
                            '<p><b>Wordpress Pages</b></p>' +
                            '<p>Add specific individual Wordpress &lsquo;pages&rsquo; to your app and arrange them in the layout of your preference.</p>' +
                            '<p><b>Wordpress Tags</b></p>' +
                            '<p>Wordpress &lsquo;tags&rsquo; are a powerful feature for adding content to your app.</p>' +
                            '<p>Tag items with specific values like &lsquo;mobile&rsquo;, &lsquo;map&rsquo; or cross-category tags.</p>' +
                            '<p>Select a tag in appBuilder and stream those specific posts into your app in real-time.</p>' +
                            '<p><b>Wordpress Search</b></p>' +
                            '<p>Display Wordpress posts matching a predefined search term.</p>'
            }
        );
}
    });

})(jQuery);