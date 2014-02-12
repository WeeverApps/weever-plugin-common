
wxApp = wxApp || {};

(function($){
    wxApp.K2ProximitySubTab = wxApp.SubTab.extend({
        default_icon_id: 27,
        allowedLayouts: ['list'],
        typeDescription: 'Near to me',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Nearby',
                icon: 'e101',
                icon_id: 27,
                type: 'K2Proximity',
                content: 'html',
                layout: 'list',
                config: { url: '', gps: '1', geotag: '1', subtab_name: 'K2ProximitySubTab' },
                helpTitle:  'About Near to me',
                helpBody:   '<p><b>Adding K2 content to your app</b></p>' +
                            '<p>Any K2 content you add to your app updates in real-time as you make changes.</p>' +
                            '<p><b>K2 Near to me</b></p>' +
                            '<p>&ldquo;Near to me&rdquo; shows app users location listings nearest to them and distances.</p>' +
                            '<p>Create a &ldquo;Near to me &rdquo; feature with K2 content in exactly the same way you would create a K2-based map.</p>' +
                            '<p>The difference is how the posts display.  &ldquo;Near to me&rdquo; lists posts in order of nearest-distance instead of creating a custom Google map.</p>' +
                            '<p><b>K2 Maps</b></p>' +
                            '<p>&rdquo;GeoTag&ldquo; individual K2 posts with a location/address and create a mobile, GPS-enabled map of those locations with appBuilder.</p>' +
                            '<p>We recommend using the K2 <a target="_blank" href="http://K2.org/plugins/geolocation/">Geolocation plugin</a> to add location information to posts.</p>' +
                            '<p>Once you have added locations to posts, use the appBuilder map making features to create a map using K2 post categories.</p>' +
                            '<p>Note: posts which are not Geotagged with location info will not display on your map.</p>' +
                            '<p><b>K2 Posts</b></p>' +
                            '<p>Add categories of K2 &lsquo;posts&rsquo; to share a blog or specific content in real-time with app visitors.</p>' +
                            '<p><b>K2 Pages</b></p>' +
                            '<p>Add specific individual K2 &lsquo;pages&rsquo; to your app and arrange them in the layout of your preference.</p>' +
                            '<p><b>K2 Tags</b></p>' +
                            '<p>K2 &lsquo;tags&rsquo; are a powerful feature for adding content to your app.</p>' +
                            '<p>Tag items with specific values like &lsquo;mobile&rsquo;, &lsquo;map&rsquo; or cross-category tags.</p>' +
                            '<p>Select a tag in appBuilder and stream those specific posts into your app in real-time.</p>' +
                            '<p><b>K2 Search</b></p>' +
                            '<p>Display K2 posts matching a predefined search term.</p>'
            }
        );
}
    });

})(jQuery);