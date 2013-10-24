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

/*
 * Image uploader script
 */

var coords = false;
var imgselect = false;

function cropper_show(image_width, image_height) {
	// Make sure upload drop area is hidden
	jQuery('.qq-upload-drop-area').hide();
	
    if (jQuery('#wx-jcrop-dialog-img').is(':visible')) {
    	if ( imgselect === false ) {
    		imgselect = jQuery('#wx-jcrop-dialog-img').imgAreaSelect({ 
    			//x1: 0, y1: 0, x2: 10000, y2: 10000,
    			handles: true,
    			instance: true,
    			parent: '#wx-jcrop-dialog',
    			onSelectChange: function(img, selection) {
    				coords = selection;
    				console.debug(coords);
    			}
    		});
    	} else {
    		imgselect.cancelSelection();
    		imgselect.update();
    	}
    }
    else
        setTimeout( function() { cropper_show(image_width, image_height); }, 50);
}



jQuery(document).ready(function(){ 

	// Loading for image cropper
	jQuery('#wx-jcrop-dialog-loading').ajaxStart(function() {
		jQuery(this).show();
	});
	jQuery('#wx-jcrop-dialog-loading').ajaxStop(function() {
		jQuery(this).hide();
	});
	
	jQuery('#wx-modal-loading')
	    .hide()  
	    .ajaxStart(function() {
	    	jQuery('#wx-modal-error-text').html('');
	        jQuery(this).fadeIn(200);
	        jQuery('#wx-modal-loading-text').html(WPText.WEEVER_JS_SAVING_CHANGES);
	        jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_PLEASE_WAIT);
	    })
	    .ajaxStop(function() {
	    	var jObj = jQuery(this);
	    	setTimeout( function() {
	    			jObj.fadeOut(750);
	    		}, 600 );
	    });
	
	// Load JSColor.
	Modernizr.load([{
		// Test if Input Color is supported using Modernizr
		test: Modernizr.inputtypes.color,
		// If colors are not supported, load the jscolor.js script
		// TODO - Figure out way to make this URL more generic.
		nope: '../wp-content/plugins/wp_weeverapps/static/js/jscolor/jscolor.js',
		// Initialize jscolor once its loaded, 
		// because the builtin jscolor.install hook is bind to window.load,
		// which has already happend
		callback: function(id, testResult) {
			jscolor.init();
		}
	}]);

	// Preview code
	setTimeout(function(){
		// if (jQuery.browser.webkit) {
		if (true) {
			jQuery('#preview-app-dialog-no-webkit').hide();
	        jQuery('#preview-app-dialog-frame').attr('src', jQuery('#preview-app-dialog-frame').attr('rel'));
			jQuery('#preview-app-dialog-webkit').show();
	    } else if (jQuery.browser.webkit == undefined || jQuery.browser.webkit == false) {
			jQuery('#preview-app-dialog-no-webkit').show();
	    }		
	}, 300);

	// Uploaders

	/* uploader for the banner / logo image */
	
	jQuery('.wx-theme-file-uploader').each(function() {
		//console.log('loading theme uploader');
		var image_id = jQuery(this).attr('ref');
		var input_name = jQuery(this).attr('rel');
		var image_width = jQuery(this).attr('img_width');
		var image_height = jQuery(this).attr('img_height');
	    var weeverUploader = new qq.FileUploader({
	        element: jQuery(this)[0],
	        action: ajaxurl + '?action=ajaxHandleUpload',
	        debug: true,
	        onComplete: function(id, fileName, responseJSON){
	        	//console.debug(responseJSON);
	        },
	        callback: function(url) {
	        	jQuery("#wx-upload-info").remove();
	        	jQuery('.qq-upload-success').hide();

	        	// Call the cropper
	        	jQuery('#wx-jcrop-dialog-img').attr('src', url);
	        	
	        	coords = false;
	        	
	        	jQuery('#wx-jcrop-dialog').foundation('reveal', 'open');
	        	setTimeout(function() { cropper_show(image_width, image_height); }, 500);
	        	jQuery('#finish-crop').one('click', function() {
	        		console.log('Saving cropped image...');
	        		console.log(coords);

	        		jQuery.ajax({
    					url: ajaxurl,
    					type: 'POST',
    					data: {
    						action: 'ajaxCropImage',
    						selection: coords,
    						image_width: image_width,
    						image_height: image_height
    					},
    					success: function(msg) {
    						jQuery("#" + image_id).attr("src", msg);
	        	        	jQuery('input[name=' + input_name + ']').attr('value', msg);
	        	        	//jQuery('#wx-jcrop-dialog').dialog('close');
    					},
    					error: function(v,msg) {
    						alert('There was an error saving the image, please try again');
    					}
    				});

    				jQuery('#wx-jcrop-dialog').foundation('reveal', 'close');
	        	})


	        	/*jQuery('#wx-jcrop-dialog').dialog({
	        		modal: true,
	        		resizable: false,
	        		width: 'auto',
	        		height: 'auto',
	        		title: 'Crop Image (click and drag on image to crop)',
	        		//show: 'fade',
	        		hide: 'drop',
	        		open: function(event, ui) {
	        			setTimeout(function() { cropper_show(image_width, image_height); }, 500);
	        		},
	        		buttons: {
	        			'Finish': function() {
	        				//if ( false === coords || isNaN(coords.x1) ) {
	        				//	alert('Please make a selection on the image first');
	        				//} else {

	        					// Call the script to crop and fetch back the url
		        				jQuery.ajax({
		        					url: ajaxurl,
		        					type: 'POST',
		        					data: {
		        						action: 'ajaxCropImage',
		        						selection: coords,
		        						image_width: image_width,
		        						image_height: image_height
		        					},
		        					success: function(msg) {
		        						jQuery("#" + image_id).attr("src", msg);
		    	        	        	jQuery('input[name=' + input_name + ']').attr('value', msg);
		    	        	        	jQuery('#wx-jcrop-dialog').dialog('close');
		        					},
		        					error: function(v,msg) {
		        						alert('There was an error saving the image, please try again');
		        					}
		        				});
	        				//}
	        			},
	        			'Cancel': function() {
	        				jQuery(this).dialog('close');
	        			}
	        		}
	        	});*/
	        	
	        	//jQuery("#wx-theme-tablet-load-link").attr("href", url);
	        	return false;

	        	//jQuery("#wx-image-size-tablet").hide();
	        	//weever.checkTabletImg(url);
	        }
	    });		
	});
 
		
});