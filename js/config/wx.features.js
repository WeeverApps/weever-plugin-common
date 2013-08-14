/*	
 *	Weever Apps Administrator extension for Joomla
 *	(c) 2010-2012 Weever Apps Inc. <http://www.weeverapps.com/>
 *
 *	Author: 	Robert Gerald Porter <rob@weeverapps.com>
 *	Version: 	1.7
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


wx.features = [
    {
        id:			'wordpress',
        name:		'Content',
        description:'Add content to your app.',
        splitTypes:	true,
        items:	[
            {
                id:				'blog',
                component:		'blog',
                name:			'Posts',
                title:			true,
                confirm_feed:   false,
                types:			'blog',
                fields:			{
                    'cms_feed':	'#wx-add-wordpress-blog-select'
                }
            },
            {
                id:				'category',
                component:		'blog',
                name:			'Category',
                title:			true,
                confirm_feed:   false,
                types:			'blog',
                fields:			{
                    cms_feed:	'#wx-add-wordpress-blog-category_name-select'
                }
            },
            {
                id:				'page',
                name:			'Page',
                component:		'page',
                confirm_feed:   false,
                title:			true,
                titleUse:		'Change only if you think a shorter title is more appropriate for a mobile app.',
                types:			'page',
                fields:			{
                    cms_feed:	'#wx-add-wordpress-page-menu-item-select'
                }
            },
            {

                id:				'tag',
                component:		'blog',
                name:			'Tag',
                confirm_feed:   false,
                title:			true,
                types:			'blog',
                fields:			{
                    'cms_feed':	'#wx-add-wordpress-tag-select'
                }
            },
            {
                id:				'searchterm',
                component:		'blog',
                name:			'Search Term',
                confirm_feed:   false,
                title:			true,
                types:			'blog',
                fields:			{
                    's':	'#wx-add-wordpress-searchterm'
                }
            },
            {
                id:             'map',
                component:      'map',
                name:           'Map Feed',
                confirm_feed:   false,
                title:          true,
                types:          'map',
                fields:         {
                    cms_feed:   '#wx-add-wordpress-map-select'
                }
            },
            {
                id:             'proximity',
                component:      'proximity',
                name:           'Nearest to Me Feed',
                confirm_feed:   false,
                title:          true,
                types:          'proximity',
                fields:         {
                    cms_feed:   '#wx-add-wordpress-proximity-select'
                }
            },
            {
                id:             'directory',
                component:      'directory',
                name:           'Directory',
                confirm_feed:   false,
                title:          true,
                types:          'directory',
                fields:         {
                    cms_feed:   '#wx-add-wordpress-directory-select'
                }
            }
        ]
    },
    {
        id:				'wordpress_contact',
        name:			'Contact',
        component:		'contact',
        confirm_feed:	false,
//		title:			true,
//		titleUse:		'Add a short title for this contact',
        defaultTitle:	'component_behaviour',
        fields:			{
            component_behaviour: '#wx-contact-dialog-title',
            //component_id:	'#wx-add-contact-joomla-select'
            name: 	'#wx-contact-dialog-title',
            phone: '#wx-contact-dialog-phone',
            email: '#wx-contact-dialog-email',
            address: '#wx-contact-dialog-address',
            town: '#wx-contact-dialog-town',
            state: '#wx-contact-dialog-state',
            country: '#wx-contact-dialog-country',
            image: '#wx-contact-dialog-image',
            misc: '#wx-contact-dialog-misc'
            // type:'contact' ?
        },
        options:		{

            'emailform':	'Display a form instead of my email address',
            'googlemaps':	'Show my location on a Google Map'

        },
        types:			'contact'
    },
    {
        vertical:		'all',
        id:				'twitter',
        name:			'Twitter',
        url:			'http://twitter.com/',
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3><p>Planning an event?  Adding a twitter #hashtag stream for a specific event encourages people to tweet and share photos.</p>',
        items:	[
            {
                id:				'user',
                name:			'Twitter User',
                defaultTitle:	'component_behaviour',
                title:			true,
                confirm_feed:	true,
                component:		'twitteruser',
                types:			'social',
                fields:			{
                    component_behaviour: 	'#wx-twitter-user-value'
                },
                defaultValue:	{

                    component_behaviour:	'@'

                }

            },
            {

                id:				'hashtag',
                name:			'Hash Tag',
                component:		'twitter',
                defaultTitle:	'component_behaviour',
                title:			true,
                confirm_feed:	true,
                types:			'social',
                fields:			{

                    component_behaviour: 	'#wx-twitter-hashtag-value'

                },
                defaultValue:	{

                    component_behaviour:	'#'

                }

            },
            {

                id:				'search',
                name:			'Search Term',
                component:		'twitter',
                types:			'social',
                defaultTitle:	'component_behaviour',
                confirm_feed:	true,
                title:			true,
                fields:			{

                    component_behaviour: 	'#wx-twitter-search-value'

                }

            }

        ]

    },
    {

        id:				'facebook',
        defaultTitle:	'Facebook',
        vertical:		'all',
        component:		'facebook',
        title:			true,
        confirm_feed:	true,
        /*component:		{

         'social':	'facebook' //,
         //'photo':	'facebook.photos',
         //'calendar':	'facebook.events'

         },*/
        name:			'Facebook',
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3><p>Due to privacy settings, only <strong>Facebook Page</strong> content can be shared in a mobile app.  Make sure you\'re adding a public-facing page and not a <em>personal</em> profile.</p>',

        url:			'http://facebook.com/',
        //types:			'social', //['social', 'photo', 'calendar'],
        /*labels:			{

         'social':		new wx.labelText('Display my status updates as a stream', null),
         'photo':		new wx.labelText('Display my public photo albums', null),
         'calendar':		new wx.labelText('Display my upcoming events', null)

         },*/
        items:	[

            {

                id:				'social',
                name:			'Wall/Posts',
                defaultTitle:	'Facebook',
                title:			true,
                confirm_feed:	true,
                component:		'facebook',
                types:			'social',
                fields:			{

                    component_behaviour: 	'#wx-facebook-user-value'

                },
                defaultValue:	{

                    component_behaviour:	'http://facebook.com/'

                }

            },
            {

                id:				'facebook.photos',
                name:			'Photos',
                component:		'facebook.photos',
                defaultTitle:	'Facebook Photos',
                title:			true,
                confirm_feed:	true,
                types:			'photo',
                fields:			{

                    component_behaviour: 	'#wx-facebook-photo-value'

                },
                defaultValue:	{

                    component_behaviour:	'http://facebook.com/'

                }

            },
            {

                id:				'facebook.events',
                name:			'Events',
                component:		'facebook.events',
                types:			'calendar',
                defaultTitle:	'Facebook Events',
                confirm_feed:	true,
                title:			true,
                fields:			{

                    component_behaviour: 	'#wx-facebook-calendar-value'

                },
                defaultValue: {
                    component_behaviour:	'http://facebook.com/'
                }
            }

        ]
        /*
         fields:			{

         component_behaviour: 	'#wx-facebook-user-value'

         },*/
        /*defaultValue:	{

         component_behaviour:	'http://facebook.com/'

         }*/

    },
    {

        id:				'tumblr',
        vertical:		'all',
        name:			'Tumblr',
        types:			'blog',
        unavailable:	'Tumblr Support is coming soon!'

    },
    {

        vertical:		'all',
        id:				'google_plus',
        name:			'Google +',
        types:			'social',
        unavailable:	'Google Plus Support is coming soon!'

    },
    {

        vertical:		'all',
        id:				'youtube',
        name:			'Youtube',
        url:			'http://youtube.com/',
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3><p>A YouTube <strong>Channel</strong> displays all videos associated with one <a href="http://youtube.com" target="_blank">YouTube</a> user account.  If you would like to show a collection of videos from around YouTube, add a YouTube <i>Playlist</i>.',

        items:			[

            {

                id:				'channel',
                name:			'User / Channel',
                types:			'video',
                title:			true,
                confirm_feed:	true,
                defaultTitle:	'Videos',
                component:		'youtube',
                fields:			{

                    component_behaviour:	'#wx-youtube-channel-url'

                },
                defaultValue:	{

                    component_behaviour:	'http://youtube.com/'

                }

            },
            {

                id:				'playlist',
                name:			'Playlist',
                types:			'video',
                component:		'youtube.playlists',
                title:			true,
                confirm_feed:	true,
                defaultTitle:	'Videos',
                fields:			{

                    component_behaviour:	'#wx-youtube-playlist-url'

                },
                defaultValue:	{

                    component_behaviour:	'http://youtube.com/playlist?list='

                }

            }

        ]

    },
    {

        vertical:		'all',
        id:				'vimeo',
        name:			'Vimeo',
        component:		'vimeo',
        url:			'http://vimeo.com/',
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3><p>Adding a Vimeo User shares all videos associated with one <a href="http://vimeo.com" target="_blank">Vimeo</a> user account.  To share a collections of videos add <i>channels</i>.  One Vimeo user can have multiple channels.',

        types:			'video',
        title:			true,
        confirm_feed:	true,
        defaultTitle:	'Videos',
        fields:			{

            component_behaviour:	'#wx-vimeo-channel-url'

        },
        defaultValue:	{

            component_behaviour:	'http://vimeo.com/'

        }


    },
    {

        vertical:		'all',
        id:				'wufoo',
        name:			'Wufoo Forms',
        component:		'wufoo',
        url:			'http://wufoo.com/',
        title:			true,
        confirm_feed:	true,
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3><p>Wufoo\'s free online form creator can power your app\'s contact forms, surveys, and event registrations. <b>To find your Wufoo API Key:</b></p>'+

            '<ol><li>Login to <a href="http://wufoo.com/" target="_blank">Wufoo.com</a> and navigate to a specific form.</li><li>Choose the \"Code\" link, then click the "API Information" button.</li></ol>'+

            '<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/network_48.png" class="wxui-helptip-icon">Connect a Form to Your Favourite Web Service!</h3>'+


            '<p>Wufoo Forms connects to many free and paid services on the web including MailChimp email newsletters, Campaign Monitor, PayPal Donations and Payments, SalesForce CRM, Freshbooks Accounting &amp; Billing, Highrise Contact Management and Twitter.</li>'+

            '</ul>'+

            '<p>For more information check out: <a href="http://wufoo.com/integrations" target="_blank">http://wufoo.com/integrations</a></p>',

        types:			'form',
        defaultTitle:	'Forms',
        tier:			2,
        fields:			{

            component_behaviour:	'#wx-wufoo-form-url',
            'var_value':					'#wx-wufoo-form-api-key'

        }

    },
    {

        vertical:		'all',
        id:				'flickr',
        name:			'Flickr',
        url:			'http://flickr.com/',
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3>'+
            '<p>Add a Flickr Photostream (stream all photos) for one <a href="http://flickr.com" target="_blank">Flickr</a> user account, or list all your Flickr Photo Sets (galleries).</p>'+

            '<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/gear_48.png" class="wxui-helptip-icon">Flickr Compatibility</h3>'+

            '<p>Only <em>publicly available</em> photos on Flickr will display. Photos uploaded prior to April 2011 may not display as gallery thumbnails – simply rotate and resave these photos to fix.</p>'+

            '<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/present_48.png" class="wxui-helptip-icon">Coming Soon</h3>'+

            '<p>Support for Flickr Group Pools (community galeries) and adding just one photo set at a time.</p>',

        items:			[

            {

                id:				'photostream',
                name:			'Latest Photos',
                title:			true,
                confirm_feed:	true,
                defaultTitle:	'Latest Photos',
                component:		'flickr',
                types:			'photo',
                fields:			{

                    component_behaviour:	'#wx-flickr-photostream-photo-url'

                },
                defaultValue:	{

                    component_behaviour:	'http://flickr.com/photos/'

                }

            },
            {

                id:				'photosets',
                name:			'All Photosets',
                defaultTitle:	'Photos',
                component:		'flickr.photosets',
                types:			'photo',
                title:			true,
                confirm_feed:	true,
                defaultValue:	{

                    component_behaviour:	'http://flickr.com/photos/'

                },
                fields:			{

                    component_behaviour:	'#wx-flickr-photosets-photo-url'

                }

            }

        ]

    },
    {

        id:				'picasa',
        vertical:		'all',
        name:			'Picasa',
        component:		'google.picasa',
        url:			'http://picasa.google.com/',
        title:			true,
        confirm_feed:	true,
        defaultTitle:	'Photos',
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3>'+
            '<p>Showcase all your <a href="http://picasa.google.com" target="_blank">Picasa</a> photo albums!</p>'+
            '<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/present_48.png" class="wxui-helptip-icon">Coming Soon</h3>'+
            '<p>Support for Flickr Group Pools (community galleries) and adding specific photo sets.</p>',

        types:			'photo',
        fields:			{

            component_behaviour:	'#wx-picasa-photo-url'

        }

    },
    {

        vertical:		'all',
        id:				'foursquare',
        name:			'Foursquare',
        component:		'foursquare',
        defaultTitle:	'Foursquare Photos',
        url:			'http://foursquare.com/',
        title:			true,
        confirm_feed:	true,
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3>'+
            '<p>Sharing a Live Stream of <strong><a href="http://foursquare.com" target="_blank">Foursquare</a> Venue Photos</strong> for a particular location is a great way to engage event attendees or share info about a specific place!</p>'+
            '<p>To find the URL (web address) for a Foursquare Venue:</p>'+
            '<ol><li>Search the web for \"Foursquare\" and the name of the location (venue)</li>'+
            '<li>Open the Foursquare Venue Page</li>'+
            '<li>Copy the URL of the page from your browser address bar</li></ol>',

        types:			'photo',
        /*labels:			{

         'photo':	new wx.labelText(null, 'This content will be displayed as a slideshow of photos')

         },*/
        fields:			{

            component_behaviour:	'#wx-foursquare-photo-url'

        },
        defaultValue:	{

            component_behaviour:	'https://foursquare.com/v/'

        }

    },
    {

        vertical:		'all',
        id:				'soundcloud',
        name:			'SoundCloud',
        unavailable:	'Sound Cloud support is coming soon!',
        items:			[

            {

                id:		'user',
                name:	'User',
                types:	'audio'

            },
            {

                id:		'set',
                name:	'Set',
                types:	'audio'

            }

        ]

    },
    {

        id:				'bandcamp',
        vertical:		['music', 'event'],
        name:			'BandCamp',
        unavailable:	'BandCamp support is coming soon!',
        items:			[

            {

                id:		'band',
                name:	'Band',
                types:	'audio'

            },
            {

                id:		'album',
                name:	'Album',
                types:	'audio'

            }

        ]

    },
    {

        id:				'google_calendar',
        name:			'Google Calendar',
        types:			'calendar',
        component:		'google.calendar',
        defaultTitle:	'Calendar',
        title:      	true,
        confirm_feed:	true,
        description:    '<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3>'+
            '<p>To add the <strong>Primary Calendar</strong> associated with a Google account, simply enter the email address associated with that account (example@mail.com)</p>'+

            '<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/gear_48.png" class="wxui-helptip-icon">How to Find the ID of a Group / Secondary Calendar</h3>'+

            '<ol><li>Login to <a href="www.google.com/calendar" target="_blank">www.google.com/calendar</a> if you are not logged in already</li><li>Highlight a specific calendar name and choose \'calendar settings\'</li><li>Copy and paste the calendar ID from this page.  It will be in a format like \"abc123@group.calendar.google.com\"</li></ol>'+

            '<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/gear_48.png" class="wxui-helptip-icon">Privacy Settings</h3>'+

            '<p>Only <em>publicly available</em> Google Calendars will display.  Choose \'share this calendar\' to confirm your calendars are public and allow for a one day delay on any changes.</p>',



        fields:			{

            component_behaviour: 	'#wx-google-calendar-email'

        }

    },
    {

        id:				'blogger',
        name:			'Blogger',
        component:		'blogger',
        title:			true,
        confirm_feed:	true,
        defaultTitle:	'Our Blog',
        types:			'blog',
        fields:			{

            component_behaviour: 	'#wx-add-blog-blogger-url-input'

        }

    },
    {

        id:				'identica',
        name:			'Identi.ca',
        component:		'identi.ca',
        title:			true,
        confirm_feed:	true,
        description:	'<h3 class="wxui-helptip-h3"><img src="' + wx.pluginUrl + '/static/images/icons/icons_library/help_48.png" class="wxui-helptip-icon">Help Tips:</h3><p>Identi.ca is a social microblogging service similar to Twitter, but built on open source tools and open standards.' +

            '<p>In Weever, you can display a search term or hashtag stream.</p>',
        types:			'social',
        defaultTitle:	'Identi.ca Status',
        fields:			{

            component_behaviour: 	'#wx-identica-social-value'

        }

    },
    {

        id:				'r3s',
        name:			'R3S Object',
        component:		'r3s',
        title:			true,
        types:			['blog', 'page', 'map', 'panel', 'directory', 'aboutapp', 'proximity'],
        component:		{

            'blog':			'blog',
            'directory':	'dir	ectory',
            'map':			'map',
            'proximity':	'proximity',
            'aboutapp':		'aboutapp',
            'page':			'page',
            'panel':		'panel'

        },
        fields:			{

            cms_feed: 	'#wx-add-page-r3s-url-input'

        }

    },
    {

        id:				'suggestion',
        name:			'What\'s Missing?'

    }

];
