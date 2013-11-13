/*	
*	Weever Apps Administrator Component for Joomla
*	(c) 2010-2011 Weever Apps Inc. <http://www.weeverapps.com/>
*
*	Author: 	Robert Gerald Porter (rob.porter@weever.ca)
*	Version: 	0.9.2
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
*	NOTE - Most (if not all) of this script can be removed.
*/

function loadImageUploaders() {
	jQuery('.wx-theme-file-uploader').each(function() {
		var image_id = jQuery(this).attr('ref');
		var input_name = jQuery(this).attr('rel');
	    var weeverUploader = new qq.FileUploader({
	        element: jQuery(this)[0],
	        action: ajaxurl + '?action=ajaxHandleUpload',
	        debug: true,
	        onSubmit: function() {
	        	jQuery('#' + image_id).fadeOut({ duration: 500, queue: true });
	        },
	        callback: function(url) {
	        	jQuery("#wx-upload-info").remove();
	        	jQuery('.qq-upload-success').hide();

	        	// Assign the new URL
				jQuery("#" + image_id).attr("src", url).load(function() {
					jQuery('#' + image_id).fadeIn({ queue: true });
				});

				var hidden = jQuery('input[name=' + input_name + ']');
	        	hidden.attr('value', url);
	        	Backbone.Events.trigger( 'image:change', hidden );

	        	return false;
	        }
	    });		
	});
}