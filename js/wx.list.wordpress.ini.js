/*	
*	Weever Apps Administrator Component for Joomla
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

jQuery(function() {

	jQuery('div#wx-list-workspace').css({ 'opacity': 1 });
	
	// Add link for theme tab
	jQuery('#wx-weever-theme-link').click(function(event){
		event.preventDefault();
		window.location = jQuery('#wx-logo-images-theme-tab').attr('href');
	});
});


/* Assembles the URL params */

wx.ajaxUrl			= function(a) {

	this.title					= "&name=" + encodeURIComponent( jQuery('#wx-add-title-tab-item').val() );
	this.type 					= "&type=" + a.type;
	this.component				= "&component=" + a.component;
	this.appKey					= "&site_key=" + jQuery("input#wx-site-key").val();
	this.var_value				= "";
	this.component_behaviour	= "";
	this.published				= "&published=" + a.published;
	this.component_id			= "";
	this.extra					= "";
	this.cms_feed				= "";
		
	this.getParams		= function() {
	
		if(this.component_behaviour)
			this.component_behaviour 	= "&component_behaviour=" + encodeURIComponent(this.component_behaviour);
		if(a.type == 'contact') {
			this.var_value					= "&name=" + encodeURIComponent(this.name) + "&phone=" + encodeURIComponent(this.phone) + "&email=" + encodeURIComponent(this.email) + "&address=" + encodeURIComponent(this.address) + "&town=" + encodeURIComponent(this.town) + "&state=" + encodeURIComponent(this.state) + "&country=" + encodeURIComponent(this.country) + "&image=" + encodeURIComponent(this.image) + "&misc=" + encodeURIComponent(this.misc);  
		} else if (this.id == 'searchterm') {
			this.cms_feed				= 'index.php?feed=r3s&s=' + this.s; 
		} else if(this.var_value)
			this.var_value					= "&var=" + encodeURIComponent(this.var_value);
			
		if(this.component_id)
			this.component_id			= "&component_id=" + this.component_id;
			
		if(this.cms_feed)
			this.cms_feed				= "&cms_feed=" + encodeURIComponent(this.cms_feed);
	
		
		return "option=com_weever&action=ajaxSaveNewTab" + this.title + this.type +
						this.component + this.component_behaviour + this.var_value + "&weever_action=add" +
					 	this.appKey + this.published + this.component_id + this.cms_feed + this.extra;			

	}
	
}
