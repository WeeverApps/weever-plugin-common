
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaCategorySubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'Joomla Category',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Blog',
                icon: 'e836',
                icon_id: 5,
                type: 'JoomlaCategory',
                content: 'html',
                layout: 'list',
                config: { subtab_name: 'JoomlaCategorySubTab' },
                helpTitle:  'Adding Joomla content',
                helpBody:   '<p><b>Adding Joomla content to your app</b></p>' +
                    '<p>Any Joomla content you add to your app updates in real-time as you make changes.</p>'+
                    '<p><b>Joomla Categories</b></p>'+
                    '<p>Add categories of Joomla articles to share a blog or specific content in real-time with app visitors.</p>' +
                    '<p><b>Joomla Articles</b></p>' +
                    '<p>Add specific individual Joomla articles to your app and arrange them in the layout of your preference.</p>' +
                    '<p><b>Joomla Menu Items</b></p>' +
                    '<p>Add Joomla article content to your app via an existing menu item.  The app will display content according to the &ldquo;ordering&rdquo; and content source(s) specified for the menu item.</p>' +
                    '<p><b>Joomla Maps</b></p>' +
                    '<p>&ldquo;GeoTag&rdquo; individual Joomla articles or K2 items with a location/address and create a mobile, GPS-enabled map of those locations with appBuilder.</p>' +
                    '<p>We recommend using the &ldquo;Geotagger for Joomla&rdquo; plugin to add location information to articles or K2 items.</p>' +
                    '<p>Once you have added locations to articles or K2 items, use the appBuilder map making features to create a map using Joomla article categories.</p>' +
                    '<p>Note: articles or K2 items which are not Geotagged with location info will not display on your map.</p>' +
                    '<p><b>Joomla Near to me</b></p>' +
                    '<p>&ldquo;Near to me&rdquo; shows app users location listings nearest to them and distances.</p>' +
                    '<p>Create a &ldquo;Near to me&rdquo; feature with Joomla or K2 content in exactly the same way you would create a Joomla-based map.</p>' +
                    '<p>The difference is how the geotagged content displays.  &ldquo;Near to me&rdquo; lists articles or K2 items in order of nearest-distance instead of creating a custom Google map.</p>'

            }
        );}
    });

})(jQuery);