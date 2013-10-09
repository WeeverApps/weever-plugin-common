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

jQuery( document ).ready( function() {

	jQuery('select.wx-cms-feed-select').change( function() {

		var actionButton = 'div.ui-dialog-buttonset button#wxui-action';

		// if no value='', some browsers take the text inside the option
		
	    if(jQuery(this).val() != jQuery(this).find("option:selected").text() && jQuery(this).val() != '') {
	    
			jQuery(actionButton).removeAttr('disabled');
			jQuery(actionButton).removeClass('white');
			jQuery(actionButton).addClass('blue');
	       
		}
		else {
		
			jQuery(actionButton).attr('disabled', 'disabled');
			jQuery(actionButton).removeClass('blue');
			jQuery(actionButton).addClass('white');
			
		}
	    
	});
	
	jQuery('input.wx-dialog-input').keyup( function() {
	
		var actionButton = 'div.ui-dialog-buttonset button#wxui-action';
	
	    if( jQuery(this).val() != '' ) {
	    
	    	jQuery(actionButton).removeAttr('disabled');
	    	jQuery(actionButton).removeClass('white');
	    	jQuery(actionButton).addClass('blue');
	    
	    } else {
	    
		    jQuery(actionButton).attr('disabled', 'disabled');
		    jQuery(actionButton).removeClass('blue');
		    jQuery(actionButton).addClass('white');
	    
	    }
	    
	});
	
});