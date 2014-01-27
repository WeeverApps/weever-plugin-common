/*	
*	Weever Apps Administrator Component for Joomla
*	(c) 2010-2011 Weever Apps Inc. <http://www.weeverapps.com/>
*
*	Author: 	Robert Gerald Porter (rob.porter@weeverapps.com)
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
*/

// Navigation tabs
jQuery(document).ready(function() {
    
	jQuery('input[name="switch-x"]').click(function() {
        if (this.id == 'on') {
            app_enabled = 1;
        } else {
            app_enabled = 0;
        }

        jQuery('#status-loading').show();
		
		console.log('ajaxurl...');
		
        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: { 
                action: 'ajaxToggleAppStatus',
                nonce: jQuery('input#nonce').val(),
                app_enabled: app_enabled
            },
            success: function(msg) {
                console.log('OK');
                var status = app_enabled ? 'online' : 'offline';
                status = '<b>' + status + '</b>';
                jQuery('#appStatus').html( status );
                jQuery('#status-loading').fadeOut();
            },
            error: function(v, msg) { alert(msg); }
        });
    });

    jQuery('input[name="switch-tablet"]').click(function() {
        console.log('Switch tablet.');
        if (this.id == 'on') {
            tablets_enabled = 1;
        } else {
            tablets_enabled = 0;
        }
        console.log(tablets_enabled);

        jQuery('#switch-tablet-loading').show();

        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: { 
                action: 'ajaxToggleTabletStatus',
                nonce: jQuery('input#nonce').val(),
                tablets_enabled: tablets_enabled
            },
            success: function(msg) {
                console.log('Tablet status saved');
                var status = tablets_enabled ? 'yes' : 'no';
                jQuery('#switch-tablet-loading').fadeOut();
            },
            error: function(v, msg) { alert(msg); }
        });
    });

    // This is strange... The '.on' method on its own doesn't work. The 
    // '.click' method on its own doesn't work... But when they're both present
    // the refresh fires twice.
    jQuery('#refresh_preview').on('click', function() {
        console.log('Refresh Clicked.');
        wx.refreshAppPreview();
    });

    jQuery('#refresh_preview').click( function() {
        console.log('Refresh Clicked.');
        wx.refreshAppPreview();
    });
    

});			
