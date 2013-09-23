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
        //if ( typeof(paramsObj) === 'string' ) {
        //    data = paramsObj;
        //} else {
            for ( var p in paramsObj ) {
                queryStr.push( encodeURIComponent(p) + '=' + encodeURIComponent(paramsObj[p]) );
            }
            if ( queryStr.length ) {
    			data = queryStr.join('&');
    		}
        //}
//		console.log( data );
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
    }
})(jQuery);

wx.log = function(message) {
    if ( !! console.log ) {
//		console.log('[wx.log.caller] ' + wx.log.caller);
        console.log(message);
	}
}

jQuery(document).ready(function() {

    wx.updateIconDialog = function(tab_id, default_icon_id, update_icon_elem) {
        var nonce = jQuery("input#nonce").val();

        wx.update_icon_preview(default_icon_id);

        jQuery('#wx-change-icon-dialog').dialog({
            modal: 		true,
            resizable: 	false,
            width: 		'auto',
            height: 	'auto',
            title:		'Change Icon',
            show:		'fade',
            hide:		'drop',
            buttons: 	{
                'Finish': function() {
                    jQuery.ajax({
                        type: "POST",
                        url: ajaxurl,
                        data: {
                            action: 'ajaxSaveTabIcon',
                            icon_id: jQuery('#wx-change-icon-dialog select.wx-icon-picker').val(),
                            tab_id: tab_id,
                            nonce: nonce
                        },
                        success: function(msg){
                            jQuery('#wx-modal-loading-text').html(msg);
                            jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
                            if ( typeof update_icon_elem != 'undefined' )
                                update_icon_elem.html('<img class="wx-nav-icon-img" src="' + jQuery('#wx-change-icon-dialog img.wx-icon-picker-preview').attr('src') + '" />');
                            jQuery('#wx-change-icon-dialog').dialog('close');
                        },
                        error: function(v,msg){
                            jQuery('#wx-modal-loading-text').html(msg);
                            jQuery('#wx-modal-secondary-text').html('');
                            jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
                        }
                    });
                },
                'Cancel': function() {
                    jQuery(this).dialog('close');
                }
            }
        });
    }

    wx.update_icon_preview = function(icon_id) {
        // Update the icon preview
        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'ajaxGetIconSrc',
                icon_id: icon_id,
                nonce: jQuery('input#nonce').val()
            },
            success: function (msg) {
                try {
                    icon = JSON.parse(msg).icon_src;
                    jQuery("img.wx-icon-picker-preview").attr('src', icon);
                } catch (e) {

                }
            },
            error: function (v, msg) {
                jQuery("img.wx-icon-picker-preview").attr('src', '');
            }
        });        
    }
    
    // Icon picker
    jQuery('.wx-icon-picker').change(function(event){
        event.preventDefault();
        wx.update_icon_preview(jQuery(this).val());
    });

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
            /*template: '<div class="qq-uploader">' +
            '<div class="qq-upload-drop-area"><span>Drop files here to upload</span></div>' +
            '<div class="qq-upload-button">Upload a file</div>' +
            '<ul class="qq-upload-list"></ul>' +
         '</div>',*/
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
	
	jQuery('.wx-edit-content-item-feed').each(function(index,elem){
		feed = jQuery(this).attr('cmsfeed') + '&limit=300&t=' + Math.random(); 
		type = jQuery(this).attr('type');
		jQuery.get(feed, {}, function(results){
			jQuery.each(results.items, function(key,value){
				jQuery(elem).append('<li id="' + value.uuid + '" class="wx-feed-edit-item-container"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + value.name + ' - <a id="editpage-' + value.uuid + '" class="wx-edit-content-item" type="' + type + '" rel="' + value.uuid + '" href="#">Edit</a>' + ( type == 'blog' || type == 'map' ? ' | <a id="deletepage-' + value.uuid + '" class="wx-delete-content-item" rel="' + value.uuid + '">Delete</a>' : '' ) + '</li>');
				
			});
			
			jQuery(elem).sortable({
				update: function(event,ui){
					var order = jQuery(elem).sortable('toArray');
					
					jQuery.ajax({
						type: "POST",
						url: ajaxurl,
						data: {
							action: 'ajaxSortPosts',
							nonce: jQuery("input#nonce").val(),
							order: order
						}
					});
				}
			});
			jQuery(elem).disableSelection();
		});
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

//        // Select the default icon (if any)
//        jQuery('#wx-add-title-tab-dialog select.wx-icon-picker').val(wx.default_icon_id.toString());
//
//        // Load currently selected icon
//        wx.update_icon_preview(jQuery('#wx-add-title-tab-dialog select.wx-icon-picker').val());

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

		// Select the right default
//		jQuery('#wx-add-source-check-blog').trigger('click');
		
		// Show the edit dropdown (if any)
//		jQuery('.wx-edit-choices').show();
		
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

		
		    /*jQuery('#wx-add-content-editor').tinyMCE({
		        //script_url: '/js/tiny_mce_3.2.7_jquery/jscripts/tiny_mce/tiny_mce.js',
		        width: "550px",
		        height: "290px",
		        mode: "none",
		        // General options
		        theme : "simple",
		    });*/
		//tinyMCE.execCommand('mceAddControl', true, 'wx-add-content-editor');
	}
	
    function removeTinyMCE() {
        //tinyMCE.execCommand('mceFocus', false, 'wx-add-content-editor');
        tinyMCE.execCommand('mceRemoveControl', false, 'wx-add-content-editor');
    }


    /**
     * Ability to drag a subitem into the main tabs area, and drop onto an existing tab
     */
    //jQuery( ".list-add-content-items" ).sortable();
    jQuery( ".list-sub-items" ).sortable({
        start: function(event, ui) {
            jQuery('#dropTab').show();
            ui.item.addClass('wx-subtab-drag-active');
        },
        stop: function(event, ui) {
            jQuery('#dropTab').hide();
            ui.item.removeClass('wx-subtab-drag-active');
        },
        update: function(event, ui) {
            var nonce = jQuery("input#nonce").val();
            var order = String(jQuery(this).sortable('toArray'));

            jQuery.ajax({
                type: "POST",
                url: ajaxurl,
                data: {
                    action: 'ajaxSaveSubtabOrder',
                    order: order,
                    nonce: nonce
                },
                success: function(msg){
                    jQuery('#wx-modal-loading-text').html(msg);
                    jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
                    //document.location.reload();
                },
                error: function(v,msg){
                    jQuery('#wx-modal-loading-text').html(msg);

                    jQuery('#wx-modal-secondary-text').html('');
                    jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
                }
            });
        }
    }).disableSelection();


    jQuery("#listTabsSortable li a").click(function() {
		/*
		item = jQuery(this).parent('li:first');
		if (item.attr('rel') != 'unpublished')
			item.removeAttr('style');
		else
			item.attr('style', 'float:right;');
			*/
	});

});

jQuery(document).ready(function(){ 

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
	/*
	jQuery("#wx-app-status-button").click(function(e) {
	
		var siteKey = jQuery("input#wx-site-key").val();
		var nonce = jQuery("input#nonce").val();
		
		if( jQuery("#wx-app-status-online").hasClass("wx-app-hide-status") ) {
			
			
			jQuery.ajax({
			   type: "POST",
			   url: ajaxurl,
				   data: {
					   action: 'ajaxToggleAppStatus',
					   app_enabled: 1,
					   nonce: nonce
				   },
			   success: function(msg){
			     jQuery('#wx-modal-loading-text').html(msg);

			     	jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_ONLINE);
			     	jQuery("#wx-app-status-online").removeClass("wx-app-hide-status");
			     	jQuery("#wx-app-status-offline").addClass("wx-app-hide-status");
			     	jQuery("#wx-app-status-button").removeClass("wx-app-status-button-offline");
			     	jQuery(".wx-app-admin-link-enabled").show();
			     	jQuery(".wx-app-admin-link-disabled").hide();
			   },
			   error: function(v,msg){
				     jQuery('#wx-modal-loading-text').html(msg);
			     	jQuery('#wx-modal-secondary-text').html('');
			     	jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
			   }
			 });
			
			
		}
		else {
			jQuery.ajax({
			   type: "POST",
			   url: ajaxurl,
			   data: {
				   action: 'ajaxToggleAppStatus',
				   app_enabled: 0,
				   nonce: nonce
			   },
			   success: function(msg){
			     jQuery('#wx-modal-loading-text').html(msg);

			     	jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_OFFLINE);
			     	jQuery("#wx-app-status-online").addClass("wx-app-hide-status");
			     	jQuery("#wx-app-status-offline").removeClass("wx-app-hide-status");
			     	jQuery("#wx-app-status-button").addClass("wx-app-status-button-offline");
			     	jQuery(".wx-app-admin-link-enabled").hide();
			     	jQuery(".wx-app-admin-link-disabled").show();
			   },
			   error: function(v,msg){
				     jQuery('#wx-modal-loading-text').html(msg);
			     	jQuery('#wx-modal-secondary-text').html('');
			     	jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
			   }
			 });
		}
	
	});
	*/
	
	
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

    jQuery('a.wx-edit-subtab-icon').click(function(event){
        var tab_id = jQuery(this).attr('tab_id');
        var icon_id = jQuery(this).attr('icon_id');
        event.preventDefault();
        wx.updateIconDialog(tab_id, icon_id);
    })

	jQuery('a.wx-nav-icon-edit').click(function(event){
		var tab_id = jQuery(this).attr('rel');
		jQuery('#' + tab_id + 'TabID .wx-nav-icon').dblclick();
		event.preventDefault();
	});

	jQuery('a.wx-nav-map-options-edit').click(function(event){
		var tabId = jQuery(this).attr('rel');
		var nonce = jQuery("input#nonce").val();

		jQuery.ajax({
			type: "POST",
			url: ajaxurl,
			data: {
				nonce: nonce,
				action: 'ajaxGetMapOptions',
				tab_id: tabId
			},
			success: function(result) {
				try {
					result = JSON.parse(result);
					jQuery('#map_options_cluster').prop('checked', ( parseInt( result.cluster ) ? true : false ) );
					jQuery('#map_options_autoGPS').prop('checked', ( parseInt( result.autoGPS ) ? true : false ) );
					jQuery('#map_options_start_latitude').val(result.start_latitude);
					jQuery('#map_options_start_longitude').val(result.start_longitude);
					jQuery('#map_options_start_zoom').val(result.start_zoom);
					jQuery('#map_options_start_zoom_enabled').prop('checked', ( parseInt( result.start_zoom_enabled ) ? true : false ) );
					jQuery('#map_options_maxZoom').val(result.maxZoom);
					jQuery('#map_options_minZoom').val(result.minZoom);
					jQuery('#map_options_gpsRadius').val(result.gpsRadius);
					jQuery('#map_options_gpsRadius_colour').val(result.gpsRadius_colour);
					jQuery('#map_options_marker').val(result.marker);
                    jQuery('#map_options_distance').val(result.distance);
                    jQuery('#map_options_display').val(result.display);

					jQuery('#wx-change-map-options-dialog').dialog({
						modal: 		true,
						resizable: 	false,
						width: 		'auto',
						height: 	'auto',
						title:		'Change Map Options',
						show:		'fade',
						hide:		'drop',
						buttons: 	{
							'Finish': function() {
								jQuery.ajax({
									type: "POST",
									url: ajaxurl,
									data: {
										action: 'ajaxSaveMapOptions',
										options: {
											cluster: ( jQuery('#map_options_cluster').prop('checked') ? 1 : 0 ),
											autoGPS: ( jQuery('#map_options_autoGPS').prop('checked') ? 1 : 0 ),
											start_latitude: jQuery('#map_options_start_latitude').val(),
											start_longitude: jQuery('#map_options_start_longitude').val(),
											start_zoom: jQuery('#map_options_start_zoom').val(),
											start_zoom_enabled: ( jQuery('#map_options_start_zoom_enabled').prop('checked') ? 1 : 0 ),
											maxZoom: jQuery('#map_options_maxZoom').val(),
											minZoom: jQuery('#map_options_minZoom').val(),
											gpsRadius: jQuery('#map_options_gpsRadius').val(),
											gpsRadius_colour: jQuery('#map_options_gpsRadius_colour').val(),
											marker: jQuery('#map_options_marker').val(),
                                            distance: jQuery('#map_options_distance').val(),
                                            display: jQuery('#map_options_display').val()
										},
										tab_id: tabId,
										nonce: nonce
									},
									success: function(msg){
										jQuery('#wx-modal-loading-text').html(msg);
										jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
										jQuery('#wx-change-map-options-dialog').dialog('close');
									},
									error: function(v,msg){
										jQuery('#wx-modal-loading-text').html(msg);
										jQuery('#wx-modal-secondary-text').html('');
										jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
									}
								});
							},
							'Cancel': function() {
								jQuery(this).dialog('close');
							}
						}
					});
				} catch (e) {
					jQuery('#wx-modal-loading-text').html('Error getting map options');
					jQuery('#wx-modal-secondary-text').html('');
					jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
				}
			}
		});
	});

    jQuery('a.wx-nav-layout-edit').click(function(event){
        var layout_item = jQuery(this);
        var tab_id = jQuery(this).attr('rel');
        var current_layout = jQuery(this).attr('layout');
        var nonce = jQuery("input#nonce").val();
        jQuery('#wx-change-layout-dialog #tab_layout_' + current_layout).attr('checked', 'checked');

        jQuery('#wx-change-layout-dialog').dialog({
            modal: 		true,
            resizable: 	false,
            width: 		'auto',
            height: 	'auto',
            title:		'Change Layout',
            show:		'fade',
            hide:		'drop',
            buttons: 	{
                'Finish': function() {
                    selected_layout = jQuery('#wx-change-layout-dialog input[name="tab_layout"]:checked').val();

                    jQuery.ajax({
                        type: "POST",
                        url: ajaxurl,
                        data: {
                            action: 'ajaxSaveTabLayout',
                            layout: selected_layout,
                            tab_id: tab_id,
                            nonce: nonce
                        },
                        success: function(msg){
                            jQuery('#wx-modal-loading-text').html(msg);
                            jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
                            layout_item.attr('layout', selected_layout);
                            jQuery('#wx-change-layout-dialog').dialog('close');
                        },
                        error: function(v,msg){
                            jQuery('#wx-modal-loading-text').html(msg);
                            jQuery('#wx-modal-secondary-text').html('');
                            jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
                        }
                    });
                },
                'Cancel': function() {
                    jQuery(this).dialog('close');
                }
            }
        })

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
                jQuery.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: {
                        name: tabName,
                        id: tabId,
                        nonce: nonce,
                        action: 'ajaxSaveTabName'
                    },
                    success: function(msg){

                        jQuery('#wx-modal-loading-text').html(msg);
                        jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
                        clickedElem.html(tabName);
                    },
                    error: function(v,msg){
                        jQuery('#wx-modal-loading-text').html(msg);

                        jQuery('#wx-modal-secondary-text').html('');
                        jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
                    }
                });

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
				
				jQuery.ajax({
				   type: "POST",
				   url: ajaxurl,
				   data: {
					   name: tabName,
					   id: tabId,
					   nonce: nonce,
					   action: 'ajaxSaveTabName'					   
				   },
				   success: function(msg){

					    jQuery('#wx-modal-loading-text').html(msg);
				     	jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
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
	
	jQuery("a.wx-subtab-publish").click(function(event) {
	
		var nonce = jQuery("input#nonce").val();		
		var tabId = jQuery(this).attr('title');
		tabId = tabId.substring(4);
		var clickedElem = jQuery(this);
		var statustext = jQuery(this).parents("tr:first").find(".wx-subtab-publish-text:first");
		var pubStatus = jQuery(this).attr('rel');
		var unpublishedIcon = 'Unpublished'; //'<img src="'+WPText.WEEVER_JS_STATIC_PATH+'images/icons/publish_x.png" border="0" alt="Unpublished">';
		var publishedIcon = 'Published'; //'<img src="'+WPText.WEEVER_JS_STATIC_PATH+'images/icons/tick.png" border="0" alt="Published">';

		event.preventDefault();
		
		jQuery.ajax({
		   type: "POST",
		   url: ajaxurl,
		   data: {
			   action: 'ajaxTabPublish',
			   status: pubStatus,
			   id: tabId,
			   nonce: nonce
		   },
		   success: function(msg){
		     jQuery('#wx-modal-loading-text').html(msg);
		     
	     	jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
	     	
	     	if(pubStatus == 1)
	     	{
	     		//clickedElem.html(unpublishedIcon);
	     		clickedElem.attr('rel', 0);
     			// Status text
     			statustext.html(unpublishedIcon);
	     	}
	     	else
	     	{
	     		//clickedElem.html(publishedIcon);
	     		clickedElem.attr('rel', 1);
     			// Status text
     			statustext.html(publishedIcon);
	     	}
		   },
		   error: function(v,msg){
			     jQuery('#wx-modal-loading-text').html(msg);
		   
		     	jQuery('#wx-modal-secondary-text').html('');
		     	jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
		   }
		 });
	
	});
	
		jQuery("a.wx-subtab-delete").click(function() {
		
			var tabId = jQuery(this).attr('title');
			tabId = tabId.substring(4);
			var nonce = jQuery("input#nonce").val();
			var tabName = jQuery(this).attr('alt');
			var deleteButton = this;
			var confDelete = confirm(WPText.WEEVER_JS_ARE_YOU_SURE_YOU_WANT_TO+tabName+WPText.WEEVER_JS_QUESTION_MARK);
			
			if(!confDelete)
				return false;
			
			// Close any open dialogs
			jQuery('.ui-dialog-content').dialog('close');
			
			jQuery.ajax({
			   type: "POST",
			   url: ajaxurl,
			   data: { 
				   id: tabId, 
				   nonce: nonce, 
				   action: 'ajaxSubtabDelete' 
			   },
			   success: function(msg){
			     jQuery('#wx-modal-loading-text').html(msg);
			     
			     	jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
			     	// Delete the table row this delete image is in
			     	jQuery(deleteButton).parents("tr:first").remove();
					document.location.reload();
		     		//document.location.href = WPText.WEEVER_JS_ADMIN_LIST_URL+'#'+tabType+'Tab';
		     		//setTimeout("document.location.reload(true);",20);
			   },
			   error: function(v,msg){
			     jQuery('#wx-modal-loading-text').html(msg);
			     
			     	jQuery('#wx-modal-secondary-text').html('');
			     	jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
			   }
			 });
		
		});
	
	
	jQuery("a.wx-subtab-up, a.wx-subtab-down").click(function() {
	
		var tabId = jQuery(this).attr('title');
		tabId = tabId.substring(4);
		var siteKey = jQuery("input#wx-site-key").val();
		var tabType = jQuery(this).attr('rel');
		var nonce = jQuery("input#nonce").val();
		var dir = (jQuery(this).hasClass('wx-subtab-up') ? 'up' : 'down');
		var row = jQuery(this).parent("td:first").parent("tr:first");
		
		jQuery.ajax({
		   type: "POST",
		   url: ajaxurl,
		   data: {
			   action: 'ajaxSaveSubtabOrder',
			   type: tabType,
			   dir: dir,
			   id: tabId,
			   nonce: nonce
		   },
		   success: function(msg){
		     jQuery('#wx-modal-loading-text').html(msg);
		     
		     	jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
		     	
		     	// Swap them without refresh
		     	if (dir == 'up') {
		     		row.after(row.prev("tr.wx-ui-row:visible"));
		     	} else {
		     		row.next("tr.wx-ui-row:visible").after(row);
		     	}

		     	// Recolor the rows properly
		     	rowClass = "row0";
		     	row.parent().find("tr.wx-ui-row:visible").each(function(){
		     		jQuery(this).removeClass("row0").removeClass("row1").addClass(rowClass);
		     		rowClass = rowClass == "row0" ? "row1" : "row0";
		     	});
		     	
		     	/*document.location.href = WPText.WEEVER_JS_ADMIN_LIST_URL+"#"+tabType+"Tab";
		     	setTimeout("document.location.reload(true);",20);*/
		     },
		   error: function(v,msg){
  		     jQuery('#wx-modal-loading-text').html(msg);
		     	jQuery('#wx-modal-secondary-text').html('');
		     	jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
		   }
		 });
	
	});
});
