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

    jQuery( "#tabs" ).tabs();
	
    jQuery('#preview-iphone').click(function() {

        jQuery('#preview-bg').attr('class', 'iphone');
        jQuery('#preview-app-dialog-webkit iframe').attr('width', '300');
        jQuery('#preview-app-dialog-webkit iframe').attr('height', '520');
        jQuery('#preview-iphone').attr('class', 'active');
        jQuery('#preview-android, #preview-blackberry').attr('class', '');

        jQuery('#preview-app-padding-box').attr('style', 'padding-top:45px; padding-left: 10px;');
        jQuery('#preview-app ').attr('style', 'width: 400px !important; height: 550px !important;');

    });
    jQuery('#preview-android').click(function() {

        jQuery('#preview-bg').attr('class', 'android');
        jQuery('#preview-app-dialog-webkit iframe').attr('width', '310');
        jQuery('#preview-app-dialog-webkit iframe').attr('height', '505');
        jQuery('#preview-android').attr('class', 'active');
        jQuery('#preview-iphone, #preview-blackberry').attr('class', '');

        jQuery('#preview-app-padding-box').attr('style', 'padding-top: 68px; padding-left: 0px;');
        jQuery('#preview-app-dialog-webkit #preview-app ').attr('style', 'width: 310px; height: 550px;')

    });
    jQuery('#preview-blackberry').click(function() {

        jQuery('#preview-bg').attr('class', 'blackberry');
        jQuery('#preview-app-dialog-webkit iframe').attr('width', '290');
        jQuery('#preview-app-dialog-webkit iframe').attr('height', '390');
        jQuery('#preview-blackberry').attr('class', 'active');
        jQuery('#preview-iphone, #preview-android').attr('class', '');

        jQuery('#preview-app-dialog-webkit #preview-app ').attr('style', 'width: 290px; height: 390px;');

        jQuery('#preview-app-padding-box').attr('style', 'padding-top: 55px; padding-left: 14px;');
        jQuery('#preview-app ').attr('style', 'width: 400px !important; height: 550px !important;');

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
