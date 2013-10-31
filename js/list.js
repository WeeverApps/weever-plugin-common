/*	
*	Weever Apps
*	(c) 2010-2013 Weever Apps Inc. <http://www.weeverapps.com/>
*
*	Author: 	Brian Hogg
*	Version: 	1.0
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

var wx = wx || {};
var wxApp = wxApp || {};

(function($){
    wx.makeApiCall = function(endpoint, paramsObj, successCallback) {
		var method = 'POST', data = '';
        var apiUrl = wx.apiUrl + endpoint + '?site_key=' + wx.siteKey;
        var queryStr = [];

        for ( var p in paramsObj ) {
            queryStr.push( encodeURIComponent(p) + '=' + encodeURIComponent(paramsObj[p]) );
        }
        if ( queryStr.length ) {
			data = queryStr.join('&');
		}

        $.ajax({
            url: apiUrl,
            type: method,
			data: data,
            datatype: 'json',
            success: function(v) {
                wx.apiSuccess( v, successCallback );
            },
            error: function(v, message) {
                // Sometimes the call appears to be an error because we get PHP
                // warnings prior to the JSON. Let's make sure that didn't happen.
                if ( v.responseText[0] !== '{' ) {
                    var i = v.responseText.indexOf('{');
                    if (i > -1) {
                        var responseJson = v.responseText.substring( i );
                        responseJson = JSON.parse( responseJson );
                        wx.apiSuccess( responseJson, successCallback );
                        return;
                    }
                }

                jQuery('#wx-modal-loading-text').html(message);
                jQuery('#wx-modal-secondary-text').html('');
                jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
            }
        });
    };

    wx.apiSuccess = function( v, successCallback ) {
        if ( ! v.error && v.success )
            successCallback(v);
        else {
            jQuery('#wx-modal-loading-text').html(v.message ? v.message : 'Error');
            jQuery('#wx-modal-secondary-text').html('');
            jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
        }
        Backbone.Events.trigger( 'api:success' );
    };

    wx.refreshAppPreview = function() {
        console.log('Refreshing Preview');
        if ( $.browser.webkit ) {
            $('#preview-app-dialog-no-webkit').hide();
            $('#preview-app-dialog-frame').attr( 'src', $('#preview-app-dialog-frame').attr('rel') );
            $('#preview-app-dialog-webkit').show();
        } else if ( $.browser.webkit == undefined || $.browser.webkit == false ) {
            $('#preview-app-dialog-no-webkit').show();
        }
    };

    // Gets rid of params from an image URL.
    // Input:  http://example.com/images/logo.png?nocache=0.23158600 1379945989
    // Output: http://example.com/images/logo.png
    wx.cleanUrl = function( url ) {
        var i = url.indexOf('?');
        if ( i > -1 ) {
            url = url.substring(0, i);
        }
        return url;
    }
})(jQuery);

wx.log = function(message) {
    if ( !! console.log ) {
        console.log(message);
	}
}

jQuery(document).ready(function() {
	// All of the things below to do with .wx_box are used on wx.swipepages.js which may no longer be needed.

	// Initial collapse
	if ( window.location.hash.indexOf('wxnavtip-') > -1 )
		hide_other_boxes(window.location.hash.replace('#wxnavtip-', ''));
	else	
		hide_other_boxes('content');
	
	function hide_other_boxes(keep_box_id) {
		if ( keep_box_id == undefined )
			keep_box_id = '';
			
		jQuery('.wx_box').each(function(event){
			var id = jQuery(this).attr('id').replace('wxnavtip-', '');
			if ( id != 'empty' && jQuery(this).attr('rel') != 'empty' && id != keep_box_id ) {
				jQuery('#wxui-addbuttons-' + id).hide();
				jQuery(this).addClass('wx_box_hidden');
			}
		});
	}	
	
	// Code to expand/collapse sections of the new content area
	jQuery('.wx_box').click(function(event){
		var id = jQuery(this).attr('id').replace('wxnavtip-', '');
		if ( id != 'empty' ) {
			// Add/remove appropriate class
			var content_box = jQuery('#wxui-addbuttons-' + id);
			
			// Hide other boxes
			hide_other_boxes(id);
			
			if (content_box.is(':visible'))
				jQuery(this).addClass('wx_box_hidden');
			else
				jQuery(this).removeClass('wx_box_hidden');
			
			// Toggle
			jQuery('#wxui-addbuttons-' + id).slideToggle();
		}
	});

	jQuery('[name="wx-add-source-radio"]').click(function() {
		if ( 'map' == jQuery(this).val() ) {
			showMap();
		} else {
			hideMap();
		}
		
		// Show the right preview image
		jQuery('.wx-add-source-image').hide();
		jQuery('#' + jQuery(this).attr('id') + '-image').show();
	});

	jQuery('.wx-add-new-content-button').click(function(event){
		event.preventDefault();
        wx.add_new_content_dialog_start(jQuery(this));
    });

	// May be able to remove after theme.php and config.php are cleared?
    /**
     * Function to submit the content to the tab
     */
    wx.add_new_content_tab = function() {
        // Add the post
        var tabName = jQuery('input#wx-add-content-title').val();
        var component = jQuery("select#wx-select-form").val();
        var nonce = jQuery("input#nonce").val();

        var content_type = jQuery('[name="wx-add-content-type"]').val();

        if ( 'map' == content_type ) {
            geolat = jQuery('#geolocation-latitude').val();
            geolon = jQuery('#geolocation-longitude').val();
        } else {
            geolat = geolon = false;
        }

        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: 'ajaxAddNewContent',
                content: tinyMCE.activeEditor.getContent(), //{format : 'raw'}), //jQuery('#wx-add-content-editor').val(),
                name: tabName,
                published: 1,
                component: component,
                nonce: nonce,
                content_type: content_type,
                geolat: geolat,
                geolon: geolon,
                parent_id: wx.current_parent_id // parent id dragged onto (if any)
                /*page: (content_type == 'page' ? 1 : 0), //jQuery('#wx-add-source-check-page').attr('checked'),
                 blog: (content_type == 'blog' ? 1 : 0), //jQuery('#wx-add-source-check-blog').attr('checked'),
                 panel: (content_type == 'panel' ? 1 : 0), //jQuery('#wx-add-source-check-panel').attr('checked'),
                 aboutapp: (content_type == 'aboutapp' ? 1 : 0) //jQuery('#wx-add-source-check-aboutapp').attr('checked')*/
            },
            success: function(msg){
                jQuery('#wx-modal-loading-text').html(msg);

                jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
                document.location.href = WPText.WEEVER_JS_ADMIN_LIST_URL+"#wxnavtip-content";
                document.location.reload(true);
            },
            error: function(v,msg){
                jQuery('#wx-modal-loading-text').html(msg);

                jQuery('#wx-modal-secondary-text').html('');
                jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
            }
        });
    };

    wx.add_new_content_dialog_start = function(item, parent_id) {
		dialogId = '#wx-add-new-content-dialog';

        wx.current_parent_id = parent_id;

        // Page icon
        wx.default_icon_id = 28;

        // show the checkboxes (use the button rel to determine the type now)
		jQuery('#wx-add-new-content-dialog .wx-add-source-check-container').show();
		jQuery('.wxui-howtoadd').hide();
		
        // Show the map editor if this button is a map
        if ( 'map' == item.attr('rel') ) {
            setTimeout(function() {
                showMap();
            }, 1500);
        } else {
            hideMap();
        }
        
        // Set the content type
        jQuery('input[name="wx-add-content-type"]').attr('value', item.attr('rel'));

        // Hide mobile coupon area initially if they clicked 'add page'
        if ( item.hasClass('wx-add-new-coupon') ) {
            jQuery('#wx-mobile-coupon-generator').show();
            jQuery('#wx-add-content-action-buttons').hide();
            jQuery('#wx-add-content-editor-container').hide();
            jQuery('#wx-add-content-title-container').hide();
            jQuery('#wx-inject-mobile-coupon').hide();
        } else {
            jQuery('#wx-mobile-coupon-generator').hide();
            jQuery('#wx-add-content-action-buttons').show();
            jQuery('#wx-add-content-editor-container').show();
            jQuery('#wx-add-content-title-container').show();
            jQuery('#wx-inject-mobile-coupon').show();
        }

		// Clear the content, if any
		jQuery('#wx-add-content-editor').val('');		
		
		// Save the type of content to add
		//var content_type = jQuery(this).attr('rel');

		if ( item.is('.wx-upgrade-prompt-premium') ) {
			dialogId = '#wx-upgrade-notice-premium';
			wx.localizedConditionalDialog( ["Cancel"], dialogId );
			return;
		}
		
		//console.debug('opening dialog');
		jQuery(dialogId).dialog({
			
			modal: 		true, 
			resizable: 	false,
			width: 		'auto',
			height: 	'auto',
			title:		'Add New ' + ( item.hasClass('wx-add-new-coupon') ? 'Mobile Coupon' : 'Content' ),
			show:		'fade',
			hide:		'drop',
			buttons: 	{
				'Finish': function() {
                    if ( item.hasClass('wx-add-new-coupon') )
                        wx.generate_mobile_coupon( wx.add_new_content_tab, { copy_title: true } );
                    else
                        wx.add_new_content_tab();
                },
				'Cancel': function() {
					removeTinyMCE();
					jQuery(this).dialog('destroy');
				}
			},
			beforeclose: function(event, ui) {
				removeTinyMCE();
			},
			open:		function(e, ui) {
				setTimeout(function(){
					box_id = jQuery('#wx-add-content-editor').attr('id');
					var ed = new tinyMCE.Editor(box_id, wx.tinymce_options);
					ed.render();
				}, 400);
			},
			close: function() {
				removeTinyMCE();
				jQuery(this).dialog('destroy');
			}
		});
	}
	
    function removeTinyMCE() {
        //tinyMCE.execCommand('mceFocus', false, 'wx-add-content-editor');
        tinyMCE.execCommand('mceRemoveControl', false, 'wx-add-content-editor');
    }	

    // wx-modal-loading is on config.php?
	jQuery('#wx-modal-loading')
	    .hide()  
	    .ajaxStart(function() {
	    	jQuery('#wx-modal-error-text').html('');
	        jQuery(this).fadeIn(200);
	        jQuery('#wx-modal-loading-text').html(WPText.WEEVER_JS_SAVING_CHANGES);
	        jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_PLEASE_WAIT);

			// Disable any finish buttons
	        setTimeout( function() {
	        	jQuery('.ui-dialog-buttonpane').find("button:contains('Finish')").button('disable');
	        }, 300 );
	    })
	    .ajaxStop(function() {
	    	var jObj = jQuery(this);
	    	setTimeout( function() {
	    			jObj.fadeOut(750);
	    			// Re-enable any finish buttons
	    	    	jQuery('.ui-dialog-buttonpane').find("button:contains('Finish')").button('enable');
	    		}, 600 );    	
    });

});