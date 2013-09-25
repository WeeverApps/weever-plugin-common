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

    if ( typeof qq != 'undefined' ) {
        var weeverUploader = new qq.FileUploader({
            element: jQuery('#wx-file-uploader')[0],
            action: ajaxurl + '?action=ajaxHandleUpload',
            fileTemplate: fileUploadTemplate(),
            debug: true,
            onComplete: function(id, fileName, responseJSON){
                //console.debug(responseJSON);
            },
            callback: function(url) {
                tinyMCE.execCommand('mceFocus', false, 'wx-add-content-editor');

                jQuery("#wx-file-load").attr("src", url);
                jQuery("#wx-upload-info").remove();
                jQuery('#wx-add-content-editor-tmce').trigger('click');
                 ed = "wx-add-content-editor";
                 html = '<img src="' + url + '" />';
                 tinyMCE.execInstanceCommand( ed, "mceInsertContent", false, html );
                 return false;
            }
        });
    }

        function fileUploadTemplate(text) {
			return '<div class="qq-uploader">' + 
		    	'<div class="qq-upload-drop-area '+text.dropClass+'"><span>'+text.dropUpload+'</span></div>' +
		        '<div class="qq-upload-button"><img src="http://joomla.brianhogg.ca/administrator/components/com_weever/assets/icons/upload.png" class="qq-upload-icon" />Upload Image</div>' +
		        '<ul class="qq-upload-list"></ul>' + 
		     	'</div>';
		};

        function fileUploadTemplate() {
			return '<li id="wx-upload-info">' +
		        '<div class="qq-upload-file"></div>' +
		        '<div class="qq-upload-spinner"></div>' +
		        '<div class="qq-upload-size"></div>' +
		        '<button class="qq-upload-cancel"><a href="#">Cancel</a></button>' +
		        '<div class="qq-upload-failed-text">Upload Failed</div>' +
		    '</li>';
		};

    /**
     * Button to edit items from the add dialog
     * Simply triggers a click on the Edit link in the tabs for each item
     */
    jQuery('.wx-edit-choice').live("click", function(event) {
        event.preventDefault();

        // Hide the current dialog
        // TODO: Find way to find proper element to call .dialog('close') on
        jQuery(this).parents('.ui-dialog').find("button:contains('Cancel')").trigger('click');

        // Show the dialog for this edit item
        // Get value from the select dropdown beside the button (.prev())
        var itemid = jQuery(this).prev().find(':selected').val();
        jQuery('#' + itemid).trigger('click');
    });

    /**
	 * Link to delete selected item
     * Simply triggers the delete link from the tabs
	 */
	jQuery('.wx-delete-choice').live("click", function(event) {
		event.preventDefault();
		
		// Hide the current dialog
		// TODO: Find way to find proper element to call .dialog('close') on
		//jQuery(this).parents('.ui-dialog').find("button:contains('Cancel')").trigger('click');
		
		// Show the dialog for this edit item
		// Get value from the select dropdown beside the button (.prev())
		var itemid = jQuery(this).prevAll('.edit-item-choice').find(':selected').val().replace('edit', '');
		jQuery('#delete' + itemid).trigger('click');
	});
	
	jQuery('.wx-hide-message').click(function(event) {
		event.preventDefault();
		
		// Hide the div box
		var message = jQuery(this).attr('rel');
		jQuery('#' + message).hide();
		
		// Ping to not show this again
		jQuery.ajax({
			url: ajaxurl,
			type: 'POST',
			data: {
				action: 'ajaxHideMessage',
				message: message,
				nonce: jQuery('input#nonce').val()
			}
		});
	});
	
	jQuery('.wx-delete-content-item').live("click", function(event) {
		event.preventDefault();
		
		var conf_delete = confirm('Are you sure you want to delete this item?');
		
		if ( ! conf_delete )
			return;
		
		// Close any open dialogs
		jQuery('.ui-dialog-content').dialog('close');
		
		post_id = jQuery(this).attr('rel');
		
		// Delete this blog item
		jQuery.ajax({
			url: ajaxurl,
			type: 'POST',
			data: {
				action: 'ajaxDeletePost',
				post_id: post_id,
				nonce: jQuery("input#nonce").val()
			},
			success: function(msg) {
			    //jQuery('#wx-modal-loading-text').html(msg);
			    jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
				document.location.reload();
			},
			error: function(v,msg) {
				jQuery('#wx-modal-loading-text').html(msg);
	  		   
				jQuery('#wx-modal-secondary-text').html('');
				jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
			}
		})
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
	
	function addTinyMCE() {
		jQuery('#wx-add-content-editor').tinymce({
			// Location of TinyMCE script
			script_url : '../jscripts/tiny_mce/tiny_mce.js',

			// General options
			theme : "advanced",
			plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

			// Theme options
			theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
			theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
			theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : true,

			// Example content CSS (should be your site CSS)
			content_css : "css/content.css",

			// Drop lists for link/image/media/template dialogs
			template_external_list_url : "lists/template_list.js",
			external_link_list_url : "lists/link_list.js",
			external_image_list_url : "lists/image_list.js",
			media_external_list_url : "lists/media_list.js",

			// Replace values for the template plugin
			template_replace_values : {
				username : "Some User",
				staffid : "991234"
			}
		});
	}
	
    function removeTinyMCE() {
        //tinyMCE.execCommand('mceFocus', false, 'wx-add-content-editor');
        tinyMCE.execCommand('mceRemoveControl', false, 'wx-add-content-editor');
    }

// });

// jQuery(document).ready(function(){ 

	// Functions with selected list elements
	jQuery("#wx-delete-selected, #wx-publish-selected, #wx-unpublish-selected").click(function(e) {
		var nonce = jQuery("input#nonce").val();
		var clickedAction = jQuery(this).attr('title');
		var action = 'ajax'+clickedAction+'Selected';
		var unpublishedIcon = 'Unpublished'; //'<img src="'+WPText.WEEVER_JS_STATIC_PATH+'images/icons/publish_x.png" border="0" alt="Unpublished">';
		var publishedIcon = 'Published'; //'<img src="'+WPText.WEEVER_JS_STATIC_PATH+'images/icons/tick.png" border="0" alt="Published">';
		
		// Verify at least one item is selected on the current form
		var items = jQuery("input[name^='cid[]']:visible:checked");
		
		if (items.length == 0) {
			alert(WPText.WEEVER_JS_SELECT_AN_ELEMENT);
		} else {
			if (confirm(WPText.WEEVER_JS_CONFIRM_LIST_ACTION.replace('%s', clickedAction))) {
				var ids = [];
				items.each(function() {
					ids.push(jQuery(this).val());
				});
				
				jQuery.ajax({
				   type: "POST",
				   url: ajaxurl,
				   data: {
					   action: action,
					   nonce: nonce,
					   ids: String(ids)
				   },
				   success: function(msg){
				     jQuery('#wx-modal-loading-text').html(msg);
				     	jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
				     	
				     switch (clickedAction) {
				     	case 'Publish':
				     	case 'Unpublish':
				     		// Step through each checkbox item and get the a.wx-subtab-publish element to display the right icon
				     		items.each(function () {
				     			// Status text
				     			var text = jQuery(this).parent("td:first").parent("tr:first").find(".wx-subtab-publish-text:first");
				     			text.html((clickedAction == 'Publish' ? publishedIcon : unpublishedIcon));
				     			
				     			// Toggle link
				     			var text = jQuery(this).parent("td:first").parent("tr:first").find(".wx-subtab-publish:first");
				     			text.attr('rel', (clickedAction == 'Publish' ? 1 : 0));
				     		});
				     		break;
				     	case 'Delete':
				     		items.each(function () {
				     			jQuery(this).parent("td:first").parent("tr:first").remove();
				     		});
				     		break;
				     }
					document.location.reload();
				   },
				   error: function(v,msg){
				     jQuery('#wx-modal-loading-text').html(msg);
		
				     	jQuery('#wx-modal-secondary-text').html('');
				     	jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
				   }
				});
			}
		}
		
	});
	
	jQuery("li.wx-nav-tabs").bind("mouseover", function(){
	
		
		
		if(jQuery(this).attr("rel") == "unpublished")
		{
			jQuery("#wx-overlay-drag-img").hide();
			jQuery("#wx-overlay-unpublished").show();
		}
		
		jQuery("#wx-overlay-drag").show();
		
		
	
	});
	
	jQuery("li.wx-nav-tabs").bind("mouseout", function(){
	
		jQuery("#wx-overlay-drag").hide();
		jQuery("#wx-overlay-unpublished").hide();
		jQuery("#wx-overlay-drag-img").show();
	
	});
	
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
	
	jQuery('li.wx-nav-tabs a').click(function() {
    });

	jQuery('a.wx-nav-icon-edit').click(function(event){
		var tab_id = jQuery(this).attr('rel');
		jQuery('#' + tab_id + 'TabID .wx-nav-icon').dblclick();
		event.preventDefault();
	});

	jQuery('a.wx-nav-label-edit').click(function(event){
		var tab_id = jQuery(this).attr('rel');
		jQuery('#'+ tab_id + 'TabID .wx-nav-label').dblclick();
		event.preventDefault();
	});

    wx.updateTitleDialog = function(clickedElem) {
        //var tabId = clickedElem.attr('title');
        var tabId = clickedElem.attr('data-tab-id');
        tabId = tabId.substring(4);
        var siteKey = jQuery("input#wx-site-key").val();
        var htmlName = clickedElem.html();
        htmlName = jQuery.trim(htmlName);
        var nonce = jQuery("input#nonce").val();
        var txt = 	'<h3 class="wx-imp-h3">'+WPText.WEEVER_JS_ENTER_NEW_APP_ICON_NAME+'</h3>'+
            '<input type="text" id="alertName" name="alertName" value="'+htmlName+'" />';

        myCallbackForm = function(v,m,f) {

            if(v != undefined && v == true)
            {
                tabName = f["alertName"];
            }
        };

        submitCheck = function(v,m,f){

            an = m.children('#alertName');

            if(f.alertName == "" && v == true){
                an.css("border","solid #ff0000 1px");
                return false;
            }

            return true;

        };

        var tabName = jQuery.prompt(txt, {
            callback: myCallbackForm,
            submit: submitCheck,
            overlayspeed: "fast",
            buttons: {  Cancel: false, Submit: true },
            focus: 1
        });

        jQuery('input#alertName').select();
        // hit 'enter/return' to save
        jQuery("input#alertName").bind("keypress", function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                jQuery('button#jqi_state0_buttonSubmit').click();
                return false;
            } else {
                return true;
            }
        });
    }

	jQuery('a.wx-subtab-link').click(function() {
	
		event.preventDefault();
		
		var clickedElem = jQuery(this).parents("td:first").find(".wx-subtab-link-text:first");
		var tabId = jQuery(this).attr('title');
		tabId = tabId.substring(4);
		var htmlName = clickedElem.attr('title');
		var txt = 	'<h3 class="wx-imp-h3">'+WPText.WEEVER_JS_ENTER_NEW_APP_ITEM+'</h3>'+
					'<input type="text" id="alertName" name="alertName" value="'+htmlName+'" />';
		var nonce = jQuery("input#nonce").val();		
					
		myCallbackForm = function(v,m,f) {
		
			if(v != undefined && v == true)
			{
				tabName = f["alertName"];
			}
		}	
		
		submitCheck = function(v,m,f){
			
			an = m.children('#alertName');
		
			if(f.alertName == "" && v == true){
				an.css("border","solid #ff0000 1px");
				return false;
			}
			
			return true;
		
		}		
		
		var tabName = jQuery.prompt(txt, {
				callback: myCallbackForm, 
				submit: submitCheck,
				overlayspeed: "fast",
				buttons: {  Cancel: false, Submit: true },
				focus: 1
				});
				
		jQuery('input#alertName').select();
		// hit 'enter/return' to save
		jQuery("input#alertName").bind("keypress", function (e) {
		        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		            jQuery('button#jqi_state0_buttonSubmit').click();
		            return false;
		        } else {
		            return true;
		        }
		    });

	});
});
