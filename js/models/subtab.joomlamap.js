
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaMapSubTab = wxApp.SubTab.extend({
        default_icon_id: 20,
        allowedLayouts: ['list'],
        typeDescription: 'Add map locations',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Map',
                icon: 'e097',
                icon_id: 20,
                type: 'JoomlaMap',
                content: 'html',
                layout: 'list',
                tabLayout: 'map',
                config: { url: '', gps: '1', subtab_name: 'JoomlaMapSubTab' },
                helpTitle:  'Creating a map',
                helpBody:   '<p><b>Adding Joomla content to your app</b></p>' +
                            '<p>Any Joomla content you add to your app updates in real-time as you make changes.</p>' +
                            '<p><b>Joomla Maps</b></p>' +
                            '<p>&rdquo;GeoTag&ldquo; individual Joomla posts with a location/address and create a mobile, GPS-enabled map of those locations with appBuilder.</p>' +
                            '<p>We recommend using the Joomla <a target="_blank" href="http://Joomla.org/plugins/geolocation/">Geolocation plugin</a> to add location information to posts.</p>' +
                            '<p>Once you have added locations to posts, use the appBuilder map making features to create a map using Joomla post categories.</p>' +
                            '<p>Note: posts which are not Geotagged with location info will not display on your map.</p>' +
                            '<p><b>Joomla Near to me</b></p>' +
                            '<p>&ldquo;Near to me&rdquo; shows app users location listings nearest to them and distances.</p>' +
                            '<p>Create a &ldquo;Near to me &rdquo; feature with Joomla content in exactly the same way you would create a Joomla-based map.</p>' +
                            '<p>The difference is how the posts display.  &ldquo;Near to me&rdquo; lists posts in order of nearest-distance instead of creating a custom Google map.</p>' +
                            '<p><b>Joomla Posts</b></p>' +
                            '<p>Add categories of Joomla &lsquo;posts&rsquo; to share a blog or specific content in real-time with app visitors.</p>' +
                            '<p><b>Joomla Pages</b></p>' +
                            '<p>Add specific individual Joomla &lsquo;pages&rsquo; to your app and arrange them in the layout of your preference.</p>' +
                            '<p><b>Joomla Tags</b></p>' +
                            '<p>Joomla &lsquo;tags&rsquo; are a powerful feature for adding content to your app.</p>' +
                            '<p>Tag items with specific values like &lsquo;mobile&rsquo;, &lsquo;map&rsquo; or cross-category tags.</p>' +
                            '<p>Select a tag in appBuilder and stream those specific posts into your app in real-time.</p>' +
                            '<p><b>Joomla Search</b></p>' +
                            '<p>Display Joomla posts matching a predefined search term.</p>'
            });
    	}
    });

})(jQuery);