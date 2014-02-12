
wxApp = wxApp || {};

(function($){
    wxApp.K2BlogSubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'K2 Menu Item',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Blog',
                icon: 'e800',
                icon_id: 5,
                type: 'K2Blog',
                content: 'html',
                layout: 'list',
                config: { subtab_name: 'K2BlogSubTab' },
                helpTitle:  'Adding K2 content',
                    helpBody:   '<p><b>Adding K2 content to your app</b></p>' +
                                '<p>Any K2 content you add to your app updates in real-time as you make changes.</p>'+
                                '<p><b>K2 Menu Items</b></p>' +
                                '<p>Add K2 item content to your app via an existing K2 menu item.  The app will display content according to the &ldquo;ordering&rdquo; and content source(s) specified for the menu item.</p>' +                                '<p><b>K2 Categories</b></p>'+
                                '<p>Add categories of K2 items to share a blog or specific content in real-time with app visitors.</p>' +
                                '<p><b>K2 Items</b></p>' +
                                '<p>Add specific individual K2 items to your app and arrange them in the layout of your preference.</p>' +
                                '<p><b>K2 Maps</b></p>' +
                                '<p>&ldquo;GeoTag&rdquo; individual K2 items or Joomla articles with a location/address and create a mobile, GPS-enabled map of those locations with appBuilder.</p>' +
                                '<p>We recommend using the &ldquo;Geotagger for Joomla&rdquo; plugin to add location information to articles or K2 items.</p>' +
                                '<p>Once you have added locations to K2 items or articles, use the appBuilder map making features to create a map using Joomla or K2 item categories.</p>' +
                                '<p>Note: K2 items or Joomla articles which are not Geotagged with location info will not display on your map.</p>' +
                                '<p><b>K2 Near to me</b></p>' +
                                '<p>&ldquo;Near to me&rdquo; shows app users location listings nearest to them and distances.</p>' +
                                '<p>Create a &ldquo;Near to me&rdquo; feature with K2 or Joomla content in exactly the same way you would create a K2 or Joomla-based map.</p>' +
                                '<p>The difference is how the geotagged content displays.  &ldquo;Near to me&rdquo; lists K2 items or Joomla articles in order of nearest-distance instead of creating a custom Google map.</p>'
            }
        );
        }
    });

})(jQuery);