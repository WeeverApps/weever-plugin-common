/*	
 *	Weever Apps Administrator extension for Joomla
 *	(c) 2010-2013 Weever Apps Inc. <http://www.weeverapps.com/>
 *
 *	Author: 	Matthew J. Grande <matt@weeverapps.com>
 *	Version: 	2.1.5
 *   License: 	GPL v3.0
 *
 *   This extension is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This extension is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details <http://www.gnu.org/licenses/>.
 *
 */
/*
 * This file contains the list of features the user is currently able to add to their app.
 * It is similar to wx.features.js, however that was missing some that we use (eg, Form Builder) 
 * and included others that we don't seem to use (eg, Wordpress Contact). If I knew more about
 * the sytem, I'd try and merge the files, but since I don't, I won't. I verified with Garth
 * and Rob before doing this. It's my first week, gimmie a break!
 */

[
    { featureName: 'FormBuilder', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/form_icon.png', name: 'Form Builder' },
    { featureName: 'WordpressBlog', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/wordpress-blog.png', name: 'Posts', filterBy: 'weever_list_show_wordpress_content' },
    { featureName: 'WordpressCategory', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/wordpress-category.png', name: 'Category', filterBy: 'weever_list_show_wordpress_content' },
    { featureName: 'WordpressPage', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/wordpress-page.png', name: 'Page', filterBy: 'weever_list_show_wordpress_content' },
    { featureName: 'WordpressTag', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/wordpress-tag.png', name: 'Tag', filterBy: 'weever_list_show_wordpress_content' },
    { featureName: 'WordpressSearchterm', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/wordpress-searchterm.png', name: 'Search Term', filterBy: 'weever_list_show_wordpress_content' },
    { featureName: 'WordpressMap', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/addlocation.png', name: 'Map Feed', filterBy: 'weever_list_show_wordpress_content' },
    { featureName: 'WordpressProximity', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/addlocation.png', name: 'Nearest To Me', filterBy: 'weever_list_show_wordpress_content' },
    { featureName: 'WordpressDirectory', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/wordpress-category.png', name: 'Directory', filterBy: 'weever_list_show_wordpress_content' },
    { featureName: 'Page', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/page.png', name: 'Add Page', filterBy: 'weever_list_show_wordpress_content', rel: 'page' },
    { featureName: 'Coupon', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/coupon.png', name: 'Add Coupon', filterBy: 'weever_list_show_wordpress_content', rel: 'page', includeClass: 'wx-add-new-coupon' },
    { featureName: 'Twitter', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/twitter.png', name: 'Twitter' },
    { featureName: 'FacebookWall', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/facebook.png', name: 'Facebook Wall' },
    { featureName: 'Youtube', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/youtube.png', name: 'YouTube' },
    { featureName: 'Vimeo', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/vimeo.png', name: 'Vimeo' },
    { featureName: 'Map', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/addlocation.png', name: 'Add Map Location', filterBy: 'weever_list_show_wordpress_content', rel: 'map' },
    { featureName: 'Flickr', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/flickr.png', name: 'Flickr' },
    { featureName: 'PicasaAlbums', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/picasa.png', name: 'Picasa' },
    { featureName: 'FoursquarePhotos', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/foursquare.png', name: 'Foursquare' },
    { featureName: 'FacebookAlbums', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/facebook.png', name: 'Facebook Photos' },
    { featureName: 'GoogleCalendar', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/google_calendar.png', name: 'Google Calendar' },
    { featureName: 'FacebookEvents', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/facebook.png', name: 'Facebook Events' },
    { featureName: 'WordpressContacts', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/wordpress_contact.png', name: 'Tap-to-Call and Email' },
    { featureName: 'Wufoo', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/form_icon.png', name: 'Wufoo Forms' },
    { featureName: 'RSS', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/r3s.png', name: 'RSS Code' },
    { featureName: 'r3s', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/r3s.png', name: 'R3S Code', filterBy: 'weever_list_r3s_dialog' },
    { featureName: 'Blogger', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/blogger.png', name: 'Blogger' },
    { featureName: 'google_plus', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/google_plus.png', name: 'Google+' },
    { featureName: 'tumblr', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/tumblr.png', name: 'Tumblr' },
    { featureName: 'soundcloud', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/soundcloud.png', name: 'SoundCloud' },
    { featureName: 'bandcamp', imgUri: 'http://weeverapps.com/wp-content/plugins/weever-apps-for-wordpress/static/images/icons/nav/bandcamp.png', name: 'BandCamp' }
]