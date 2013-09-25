/*	
*	Weever Apps Administrator Component for Joomla
*	(c) 2010-2011 Weever Apps Inc. <http://www.weeverapps.com/>
*
*	Author: 	Robert Gerald Porter (rob.porter@weever.ca)
*	Version: 	0.9.3
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


jQuery(document).ready(function(){ 

	jQuery('#wx-select-social').change(function() {
		
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-social-title').attr('name','name');
		jQuery('.wx-component-select').attr('name', 'noname');
		jQuery('#wx-select-social').attr('name', 'component');
		jQuery('.wx-social-help').hide();
		jQuery('.wx-social-label').hide();
		jQuery('.wx-dummy').hide();
		
		jQuery('.wx-blog-item-choose').hide();

		if (jQuery(this).val() == "") {
			jQuery('.wx-dummy').show();
			jQuery('.wx-social-reveal').hide();
		} else {
			if(jQuery(this).val() == "twitteruser") 
			{
				jQuery('#wx-add-social-twitter-user-help').show();
				jQuery('label#wx-twitter-user').show();
				jQuery('input#wx-social-value').val('@');
				jQuery('input#wx-social-title').val('Twitter');
			}
			
			if(jQuery(this).val() == "twitterhashtag") 
			{
				jQuery('#wx-add-social-twitter-hashtag-help').show();
				jQuery('label#wx-twitter-hashtag').show();
				jQuery('input#wx-social-value').val('#');
				jQuery('input#wx-social-title').val('Twitter');
			}
			
			if(jQuery(this).val() == "twitterquery") 
			{
				jQuery('#wx-add-social-twitter-query-help').show();
				jQuery('label#wx-twitter-query').show();
				jQuery('input#wx-social-value').val('');
				jQuery('input#wx-social-title').val('Twitter');
			}
			
			if(jQuery(this).val() == "identi.ca") 
			{
				jQuery('#wx-add-social-identica-query-help').show();
				jQuery('label#wx-identica-query').show();
				jQuery('input#wx-social-value').val('');
				jQuery('input#wx-social-title').val('Identi.ca');
			}
			
			if(jQuery(this).val() == "facebook") 
			{
				jQuery('#wx-add-social-facebook-help').show();
				jQuery('label#wx-facebook-url').show();
				jQuery('input#wx-social-value').val('');
				jQuery('input#wx-social-value').attr('placeholder', 'http://');
				jQuery('input#wx-social-title').val('Facebook');
			}
			
			jQuery('.wx-social-reveal').show();
		}		
	});
	
	jQuery('#wx-select-calendar').change(function() {
	
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-calendar-title').attr('name','name');
		jQuery('.wx-component-select').attr('name', 'noname');
		jQuery('#wx-select-calendar').attr('name', 'component');
		jQuery('.wx-calendar-help').hide();
		jQuery('.wx-calendar-label').hide();
		jQuery('.wx-dummy').hide();

		if (jQuery(this).val() == "") {
			jQuery('.wx-reveal').hide();
			jQuery('.wx-dummy').show();
		} else {
			jQuery('.wx-calendar-reveal').show();
			
			if(jQuery(this).val() == "google.calendar") 
			{
				jQuery('label#wx-google-calendar-email-label').show();
				jQuery('label#wx-facebook-calendar-url-label').hide();
				jQuery('div.wx-facebook-calendar-reveal').hide();
				jQuery('div.wx-google-calendar-reveal').show();
				jQuery('input#wx-google-calendar-email').val('');
				jQuery('input#wx-google-calendar-email').attr('placeholder', 'yourname@email.com');
				jQuery('input#wx-calendar-title').val('Google Calendar');
			}
			
			if(jQuery(this).val() == "facebook.events") 
			{
				jQuery('label#wx-facebook-calendar-url-label').show();
				jQuery('label#wx-google-calendar-email-label').hide();
				jQuery('div.wx-google-calendar-reveal').hide();
				jQuery('div.wx-facebook-calendar-reveal').show();
				jQuery('input#wx-facebook-calendar-url').val('');
				jQuery('input#wx-facebook-calendar-url').attr('placeholder', 'http://');
				jQuery('input#wx-calendar-title').val('Facebook Events');
			}
		}		
	});
	
	
	
	jQuery('#wx-select-form').change(function() {
	
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-form-title').attr('name','name');
		jQuery('.wx-component-select').attr('name', 'noname');
		jQuery('#wx-select-form').attr('name', 'component');
		jQuery('.wx-form-help').hide();
		jQuery('.wx-form-label').hide();
		jQuery('.wx-dummy').hide();
		jQuery('.wx-form-reveal').show();
		
		if (jQuery(this).val() == '') {
			jQuery('.wx-dummy').show();
			jQuery('.wx-form-reveal').hide();
		} else {
			if(jQuery(this).val() == "wufoo") 
			{
				jQuery('input#wx-form-url').attr('placeholder', 'http://');
				jQuery('input#wx-form-api-key').attr('placeholder', 'WXYZ-1234-ABCD-9876');
			}
		}
	});
	
	
	
	jQuery('#wx-select-photo').change(function() {
	
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-photo-title').attr('name','name');
		jQuery('.wx-component-select').attr('name', 'noname');
		jQuery('#wx-select-photo').attr('name', 'component');
		jQuery('.wx-photo-help').hide();
		jQuery('.wx-photo-label').hide();
		jQuery('.wx-dummy').hide();
		
		if (jQuery(this).val() == '') {
			jQuery('.wx-dummy').show();
			jQuery('.wx-photo-reveal').hide();
		} else {
			if(jQuery(this).val() == "flickr") 
			{
				jQuery('#wx-add-photo-flickr-help').show();
				jQuery('label#wx-flickr-url').show();
				jQuery('input#wx-photo-url').val('');
				jQuery('input#wx-photo-url').attr('placeholder', 'http://');
				jQuery('input#wx-photo-title').val('Flickr Latest');
			}
			
			if(jQuery(this).val() == "flickr.photosets") 
			{
				jQuery('label#wx-flickr-url').show();
				jQuery('input#wx-photo-url').val('');
				jQuery('input#wx-photo-url').attr('placeholder', 'http://');
				jQuery('input#wx-photo-title').val('Flickr');
			}
			
			if(jQuery(this).val() == "foursquare") 
			{
				jQuery('#wx-add-photo-foursquare-help').show();
				jQuery('label#wx-foursquare-url').show();
				jQuery('input#wx-photo-url').val('');
				jQuery('input#wx-photo-url').attr('placeholder', 'http://');
				jQuery('input#wx-photo-title').val('Foursquare');
			}
			
			if(jQuery(this).val() == "google.picasa") 
			{
				jQuery('label#wx-google-picasa-email').show();
				jQuery('input#wx-photo-url').val('');
				jQuery('input#wx-photo-url').attr('placeholder', 'https://picasa… OR you@gmail.com');
				jQuery('input#wx-photo-title').val('Picasa');
			}
			
			if(jQuery(this).val() == "facebook.photos")
			{
				jQuery('label#wx-facebook-photos-url').show();
				jQuery('input#wx-photo-url').val('');
				jQuery('input#wx-photo-url').attr('placeholder', 'http://facebook.com/yourprofile');
				jQuery('input#wx-photo-title').val('Facebook');		
			}
			
			
			jQuery('.wx-photo-reveal').show();
		}			
	});
	
	
	jQuery('#wx-select-video').change(function() {
	
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-video-title').attr('name','name');
		jQuery('.wx-component-select').attr('name', 'noname');
		jQuery('#wx-select-video').attr('name', 'component');
		jQuery('.wx-video-help').hide();
		jQuery('.wx-video-label').hide();
		jQuery('.wx-dummy').hide();
		
		if (jQuery(this).val() == '') {
			jQuery('.wx-video-reveal').hide();
			jQuery('.wx-dummy').show();
		} else {
			
			if(jQuery(this).val() == "youtube") 
			{
				jQuery('#wx-add-video-youtube-help').show();
				jQuery('label#wx-youtube-url').show();
				jQuery('input#wx-video-url').val('');
				jQuery('input#wx-video-url').attr('placeholder', 'http://');
				jQuery('input#wx-video-title').val('YouTube');
			}
			
			if(jQuery(this).val() == "vimeo") 
			{
				jQuery('#wx-add-video-vimeo-help').show();
				jQuery('label#wx-vimeo-url').show();
				jQuery('input#wx-video-url').val('');
				jQuery('input#wx-video-url').attr('placeholder', 'http://');
				jQuery('input#wx-video-title').val('Vimeo');
			}
			
			jQuery('.wx-video-reveal').show();
		}
	});
	
	jQuery('#wx-select-page').change(function() {

		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-page-title').attr('name','name');
		jQuery('.wx-cms-feed-select').attr('name','noname');
		jQuery('.wx-page-help').hide();
		jQuery('.wx-dummy').hide();
		//jQuery('select.wx-cms-feed-select option[value="0"]').removeAttr('disabled');
		
		if (jQuery(this).val() == '') {
			jQuery('.wx-page-reveal').hide();
			jQuery('.wx-dummy').show();
		} else {
			// Hide all items initially, then show the options for the selected one
			jQuery('.wx-page-reveal').show();
			jQuery('.wx-page-item-choose').hide();
				
			if(jQuery(this).val() == "menu") 
			{
				jQuery('.wx-add-page-menu-item').show();
				jQuery('#wx-add-page-menu-item-select').attr('name', 'cms_feed');
				jQuery('#wx-add-page-menu-item-help').show();
				jQuery('.wx-page-reveal').show();
			} else if (jQuery(this).val() == "weever-cmsfeed") {
				jQuery('#wx-add-page-' + jQuery(this).val() + '-item').show();
				jQuery('#wx-add-page-' + jQuery(this).val() + '-item select').attr('name', 'cms_feed');
				jQuery('.wx-page-reveal').show();
			}			
		}
	});

	
	jQuery('#wx-select-aboutapp').change(function() {

		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-aboutapp-title').attr('name','name');
		jQuery('.wx-cms-feed-select').attr('name','noname');
		jQuery('.wx-aboutapp-help').hide();
		jQuery('.wx-dummy').hide();
		//jQuery('select.wx-cms-feed-select option[value="0"]').removeAttr('disabled');
		
		if (jQuery(this).val() == '') {
			jQuery('.wx-aboutapp-reveal').hide();
			jQuery('.wx-dummy').show();
		} else {
			// Hide all items initially, then show the options for the selected one
			jQuery('.wx-aboutapp-reveal').show();
			jQuery('.wx-aboutapp-item-choose').hide();
				
			if(jQuery(this).val() == "menu") 
			{
				jQuery('.wx-add-aboutapp-menu-item').show();
				jQuery('#wx-add-aboutapp-menu-item-select').attr('name', 'cms_feed');
				jQuery('#wx-add-aboutapp-menu-item-help').show();
				jQuery('.wx-aboutapp-reveal').show();
			} else if (jQuery(this).val() == "weever-cmsfeed") {
				jQuery('#wx-add-aboutapp-' + jQuery(this).val() + '-item').show();
				jQuery('#wx-add-aboutapp-' + jQuery(this).val() + '-item select').attr('name', 'cms_feed');
				jQuery('.wx-aboutapp-reveal').show();
			}			
		}
	});
	
	
	jQuery('#wx-select-panel').change(function() {

		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-panel-title').attr('name','name');
		jQuery('.wx-cms-feed-select').attr('name','noname');
		jQuery('.wx-panel-help').hide();
		jQuery('.wx-dummy').hide();
		//jQuery('select.wx-cms-feed-select option[value="0"]').removeAttr('disabled');
		
		if (jQuery(this).val() == '') {
			jQuery('.wx-panel-reveal').hide();
			jQuery('.wx-dummy').show();
		} else {
			// Hide all items initially, then show the options for the selected one
			jQuery('.wx-panel-reveal').show();
			jQuery('.wx-panel-item-choose').hide();
				
			if(jQuery(this).val() == "menu") 
			{
				jQuery('#wx-add-panel-menu-item-select').show();
				jQuery('#wx-add-panel-menu-item-select').attr('name', 'cms_feed');
				jQuery('#wx-add-panel-menu-item-help').show();
				jQuery('.wx-panel-reveal').show();
			} else if (jQuery(this).val() == "weever-cmsfeed") {
				jQuery('#wx-add-panel-' + jQuery(this).val() + '-item').show();
				jQuery('#wx-add-panel-' + jQuery(this).val() + '-item select').attr('name', 'cms_feed');
				jQuery('.wx-panel-reveal').show();
			}			
			
			jQuery('.wx-panel-reveal').show();
		}		
	});
	
	jQuery('#wx-select-proximity').change(function() {
		
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-proximity-title').attr('name','name');
		jQuery('.wx-cms-feed-select').attr('name','noname');
		jQuery('.wx-blog-help').hide();
		jQuery('.wx-dummy').hide();
		
		// Hide all items initially, then show the options for the selected one
		jQuery('.wx-proximity-item-choose').hide();
		jQuery('.wx-proximity-item-choose select').attr('name', 'unnamed');
		
		if (jQuery(this).val() == "") {
			jQuery('.wx-dummy').show();
			jQuery('.wx-proximity-reveal').hide();
		} else {
			jQuery('#wx-add-proximity-' + jQuery(this).val() + '-item').show();
			jQuery('#wx-add-proximity-' + jQuery(this).val() + '-item select').attr('name', 'proximity_cms_feed');
			jQuery('.wx-proximity-reveal').show();
		}	

	});
	
	jQuery('.wx-proximity-item-select').change(function() {
		if (jQuery(this).val() != "") {
			jQuery('input#wx-proximity-title').val(jQuery('option:selected', this).text());
		}
	});
		
	
	jQuery('#wx-select-map').change(function() {
		
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-map-title').attr('name','name');
		jQuery('.wx-cms-feed-select').attr('name','noname');
		jQuery('.wx-blog-help').hide();
		jQuery('.wx-dummy').hide();
		
		// Hide all items initially, then show the options for the selected one
		jQuery('.wx-map-item-choose').hide();
		jQuery('.wx-map-item-choose select').attr('name', 'unnamed');
		
		if (jQuery(this).val() == "") {
			jQuery('.wx-dummy').show();
			jQuery('.wx-map-reveal').hide();
		} else {
			jQuery('#wx-add-map-' + jQuery(this).val() + '-item').show();
			jQuery('#wx-add-map-' + jQuery(this).val() + '-item select').attr('name', 'map_cms_feed');
			jQuery('.wx-map-reveal').show();
		}	

	});
	
	jQuery('.wx-map-item-select').change(function() {
		if (jQuery(this).val() != "") {
			jQuery('input#wx-map-title').val(jQuery('option:selected', this).text());
		}
	});
		
	
	jQuery('.wx-panel-feed-select').change(function() {
		if (jQuery(this).val() != "") {
			jQuery('input#wx-panel-title').val(jQuery('option:selected', this).text());
		}
	});	
	
	jQuery('.wx-cms-feed-select').change(function() {
		if (jQuery(this).val() != "") {
			jQuery('input#wx-page-title').val(jQuery('option:selected', this).text());
		}
	});	
	
	/*
	 * User interface for the Blogs tab
	 */
	jQuery('#wx-select-blog').change(function() {
	
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-blog-title').attr('name','name');
		jQuery('.wx-cms-feed-select').attr('name','noname');
		jQuery('.wx-blog-help').hide();
		jQuery('.wx-dummy').hide();
		
		// Hide all items initially, then show the options for the selected one
		jQuery('.wx-blog-item-choose').hide();
		jQuery('.wx-blog-item-choose select').attr('name', 'unnamed');
		
		if (jQuery(this).val() == "") {
			jQuery('.wx-dummy').show();
			jQuery('.wx-blog-reveal').hide();
		} else if (jQuery(this).val() == "weever_all") {
			jQuery('.wx-dummy').hide();
			jQuery('#wx-blog-title').attr('value', 'All');
			jQuery('.wx-blog-reveal').show();
		} else {
			jQuery('#wx-add-blog-' + jQuery(this).val() + '-item').show();
			jQuery('#wx-add-blog-' + jQuery(this).val() + '-item select').attr('name', 'cms_feed');
			jQuery('.wx-blog-reveal').show();
		}	

	});
	
	jQuery('.wx-blog-item-select').change(function() {
		if (jQuery(this).val() != "") {
			jQuery('input#wx-blog-title').val(jQuery('option:selected', this).text());
		}
	});

	/*
	 * User interface for the Directory tab
	 */
	jQuery('#wx-select-directory').change(function() {
	
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-directory-title').attr('name','name');
		jQuery('.wx-cms-feed-select').attr('name','noname');
		jQuery('.wx-blog-help').hide();
		jQuery('.wx-dummy').hide();
		
		// Hide all items initially, then show the options for the selected one
		jQuery('.wx-directory-item-choose').hide();
		jQuery('.wx-directory-item-choose select').attr('name', 'unnamed');
		
		if (jQuery(this).val() == "") {
			jQuery('.wx-dummy').show();
			jQuery('.wx-directory-reveal').hide();
		} else {
			jQuery('#wx-add-directory-' + jQuery(this).val() + '-item').show();
			jQuery('#wx-add-directory-' + jQuery(this).val() + '-item select').attr('name', 'cms_feed');
			jQuery('.wx-directory-reveal').show();
		}	

	});
	
	jQuery('.wx-directory-item-select').change(function() {
		if (jQuery(this).val() != "") {
			jQuery('input#wx-directory-title').val(jQuery('option:selected', this).text());
		}
	});
	
	
	jQuery('#wx-select-contact').change(function() {
	
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-contact-title').attr('name','name');
		jQuery('.wx-contact-help').hide();
		jQuery('.wx-dummy').hide();
		
		if (jQuery(this).val() == '') {
			jQuery('.wx-dummy').show();
			jQuery('.wx-contact-reveal').hide();
		} else {
			if(jQuery(this).val() == "jcontact") 
			{
				jQuery('#wx-add-contact-joomla').show();
				jQuery('#wx-add-contact-joomla-help').show();
			}
			
			jQuery('.wx-contact-reveal').show();
		}
	});
	
	jQuery('.wx-component-id-select').change(function() {
		if (jQuery(this).val() != "") {
			jQuery('input#wx-contact-title').val(jQuery('option:selected', this).text());
		}
	});
	
	
	jQuery('#wx-select-component').change(function() {
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-component-title').attr('name','name');
		jQuery('.wx-component-reveal').show();
		jQuery('.wx-dummy').hide();
	});

	jQuery('#wx-select-listingcomponent').change(function() {
		jQuery('.wx-title').attr('name','noname');
		jQuery('#wx-listingcomponent-title').attr('name','name');
		jQuery('.wx-listingcomponent-reveal').show();
		jQuery('.wx-dummy').hide();
	});
});