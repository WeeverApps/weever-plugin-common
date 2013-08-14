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

    /**
     * Function called when a button is clicked.
     * Call this function with the int parent_id of the item the
     * featured was dragged onto, if applicable
     * 
     * @param item jquery object of the item with class .wx-add-source-icon clicked
     * @param int|bool parent_id or false if adding a parent tab
     */
    wx.add_edit_dialog_start = function( item, parent_id ) {
		return;
        var typeRef 		= item.attr('ref'),
            typeRel			= item.attr('rel'),
            dialogId,
            buttonNames		= ["Cancel", "Confirm"],
            backAction,
            buttons			= {};

        var component		= typeRef.replace('add-', '').replace(/\-/, '.');

        // Set the global parent id
        // TODO: Remove this and add in the future call(s) below
        wx.current_parent_id = parent_id;

        // Default icon, if any
        wx.default_icon_id = ( item.attr('icon_id') ? item.attr('icon_id') : 1 );
        
        // Set the global edit id for this dialog
        wx.edit_id = item.attr('edit_id');
        wx.edit_data = [];

        if ( wx.edit_id ) {
            //alert(jQuery(this).attr('tab_data'));
            try {
                wx.edit_data = JSON.parse(item.attr('tab_data'));

                // Get the fields
                var edit_component = component.split('.');
                //console.debug(edit_component);
                if ( edit_component[0] == 'contact' )
                    edit_component[0] = 'wordpress_contact';

                if ( edit_component[0] == 'facebook' && edit_component[1] != 'social' )
                // Override the type due to component being "facebook.events" instead of just "events" etc
                    edit_component[1] = component;

                featureData = wx.getFeatureData(edit_component[0], edit_component[1]);

                for ( var field in featureData.fields ) {
                    // Load the data!
                    //console.log('Setting ' + featureData.fields[field] + ' to ' + wx.edit_data[field]);
                    jQuery(featureData.fields[field]).val(wx.edit_data[field]);
                }
                jQuery('.wx-edit-choices').hide();
                
                // Set current icon_id
                jQuery('#wx-add-title-tab-dialog select.wx-icon-picker').val(wx.edit_data['icon_id']);
            } catch (e) {
                // Invalid data
                wx.edit_id = false;
                wx.edit_data = [];
            }
        } else {
            jQuery('.wx-edit-choices').show();
        }

        if( item.is('.wx-missing-extension') ) {
            alert("You must install this extension before you can add it to your app.");
            return;
        }

        if( item.is('.wx-unavailable') ) {
            alert("This feature is coming soon! See http://www.weeverapps.com/mobile/tour for details.");
            return;
        } else if( item.is('.wx-upgrade-prompt') ) {
            dialogId	=  '#wx-upgrade-notice';
            //console.log(dialogId);
            wx.localizedConditionalDialog( ["Cancel"], dialogId );

            return;
        } else if ( item.is('.wx-upgrade-prompt-premium') ) {
            dialogId = '#wx-upgrade-notice-premium';
            wx.localizedConditionalDialog( ["Cancel"], dialogId );
            
            return;
        }

        backAction		= function() {
            jQuery( "#wx-add-" + typeRel + "-type-dialog" ).dialog('open');
        }

        dialogId = "#wx-" + typeRef + "-dialog";
        //console.debug(dialogId);

        buttons[ buttonNames[0] ] 		= function() {
            jQuery(this).dialog( "close" );
        }

        if( item.hasClass('wx-add-single') && !( item.hasClass('wx-special-notice') ) ) {
            buttons[ buttonNames[1] ] 	= function() {
                jQuery(this).dialog( "close" );
            }

            wx.localizedConditionalDialog(["Confirm", "Cancel"], dialogId, backAction, true, true );
            return;
        }

        wx.localizedConditionalDialog( ["Cancel"], dialogId, backAction );
    }
    
	jQuery('.wx-add-source-icon').click(function(e) {
        // Don't use this for content editing
        if ( jQuery(this).hasClass('wx-add-new-content-button') )
            return;
        
        e.preventDefault();

        wx.add_edit_dialog_start(jQuery(this), false);
	});	
	
	
	jQuery('div.wx-add-item-icon').click(function() {
		var typeId		= jQuery(this).attr('id'),
			dialogId,
			backAction,
			service		= typeId.split('-')[1];
			
		backAction		= function() {
			jQuery('#wx-add-'+ service +'-dialog').dialog('open');
		}
		
		jQuery('.wx-jquery-dialog').each(function() {
            try {
                jQuery(this).dialog('close');
            } catch (e) {
                // TODO: Add a direct reference to the previous dialog rather than trying to close everything
            }
        });
		
		dialogId = "#wx-" + typeId + "-dialog";
		
		wx.localizedConditionalDialog( ["Confirm", "« Back"], dialogId, backAction, true );
		
	});		

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
	
	jQuery('a.modal').click( function() {
	
		var actionButton = 'div.ui-dialog-buttonset button#wxui-action';
	
		jQuery(actionButton).removeAttr('disabled');
		jQuery(actionButton).removeClass('white');
		jQuery(actionButton).addClass('blue');
	
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
	
	jQuery('.wx-table-sort').sortable({
	
	    cursor:     			'move',
	    axis:       			'y',
	    revert:  				true,
	    forcePlaceholderSize: 	true,
	    placeholder: 			'group_move_placeholder',
	    items: 					'tr',
	    update: 				function(e, ui) {
	    
			jQuery(this).sortable("refresh");
			
			var siteKey 	= jQuery("input#wx-site-key").val();
			var str 		= String(jQuery(this).sortable('toArray'));
			
			jQuery.ajax({
			
				type: 		"POST",
				url: 		"index.php",
				data: 		"option=com_weever&action=ajaxSaveTabOrder&site_key="+siteKey+"&order="+str,
				success: 	function(msg) {
				
					jQuery('#wx-modal-loading-text').html(msg);
					
					if(msg == "Order Updated")
						jQuery('#wx-modal-secondary-text').html(Joomla.JText._('WEEVER_JS_APP_UPDATED'));
					
					else {
					
						jQuery('#wx-modal-secondary-text').html('');
						jQuery('#wx-modal-error-text').html(Joomla.JText._('WEEVER_JS_SERVER_ERROR'));
					
					}
				
				}
			
			});
	      	 
	    }
	    
	});
		
	jQuery('.wx-table-sort').disableSelection();
	
/*	jQuery('a.wx-subtab-link').click(function() {
	
		var tabId 		= jQuery(this).attr('title');
			tabId 		= tabId.substring(4);
		
		var siteKey		= jQuery("input#wx-site-key").val(),
			htmlName 	= jQuery(this).html(),
			txt 		= '<h3 class="wx-imp-h3">' + Joomla.JText._('WEEVER_JS_ENTER_NEW_APP_ITEM') + '</h3>' +
			'<input type="text" id="alertName" name="alertName" value="'+htmlName+'" />',
			clickedElem = jQuery(this);
		
		myCallbackForm = function(v,m,f) {
		
			if(v != undefined && v == true) { 
			
				tabName = f["alertName"];
				
				jQuery.ajax({
				
					type: 		"POST",
					url: 		"index.php",
					data: 		"option=com_weever&action=ajaxSaveTabName&name=" + encodeURIComponent(tabName) + "&id=" + tabId + '&site_key=' + siteKey,
					success: 	function(msg) {
					
						jQuery('#wx-modal-loading-text').html(msg);
						
						if(msg == "Tab Changes Saved") {
						
							jQuery('#wx-modal-secondary-text').html(Joomla.JText._('WEEVER_JS_APP_UPDATED'));
							clickedElem.html(tabName);
							
						}
						else {
						
							jQuery('#wx-modal-secondary-text').html('');
							jQuery('#wx-modal-error-text').html(Joomla.JText._('WEEVER_JS_SERVER_ERROR'));
							
						}
						
					}
					
				});
			
			}
			
		}	
		
		submitCheck = function(v,m,f) {
		
			an = m.children('#alertName');
			
			if(f.alertName == "" && v == true) {
			
				an.css("border", "solid #ff0000 1px");
				
				return false;
				
			}
			
			return true;
		
		}		
		
		var tabName 	= jQuery.prompt(txt, {
		
			callback: 		myCallbackForm, 
			submit: 		submitCheck,
			overlayspeed: 	"fast",
			buttons: 		{  Cancel: false, Submit: true },
			focus: 			1
			
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
		
	}); */
/*
	jQuery("a.wx-subtab-publish").click(function() {
	
		var tabId 	= jQuery(this).attr('title');
			tabId = tabId.substring(4);
			
		var siteKey 		= jQuery("input#wx-site-key").val(),
			clickedElem 	= jQuery(this),
			pubStatus 		= jQuery(this).attr('rel'),
			unpublishedIcon = '<img src="components/com_weever/assets/icons/publish_x.png" border="0" alt="Unpublished">',
			publishedIcon 	= '<img src="components/com_weever/assets/icons/tick.png" border="0" alt="Published">';
		
		jQuery.ajax({
		
			type: 		"POST",
			url: 		"index.php",
			data: 		"option=com_weever&action=ajaxTabPublish&status=" + pubStatus + "&id=" + tabId+ '&site_key=' + siteKey,
			success: 	function(msg) {
			
				jQuery('#wx-modal-loading-text').html(msg);
				
				if(msg == "Item Published" || msg == "Item Unpublished") {
				
					jQuery('#wx-modal-secondary-text').html(Joomla.JText._('WEEVER_JS_APP_UPDATED'));
				
					if(pubStatus == 1) {
					
						clickedElem.html(unpublishedIcon);
						clickedElem.attr('rel', 0);
						
					} else {
					
						clickedElem.html(publishedIcon);
						clickedElem.attr('rel', 1);
						
					}
					
				} else {
				
					jQuery('#wx-modal-secondary-text').html('');
					jQuery('#wx-modal-error-text').html(Joomla.JText._('WEEVER_JS_SERVER_ERROR'));
					
				}
			
			}
			
		});
	
	});
			
	
	jQuery("a.wx-subtab-delete").click(function() {
	
		var tabId = jQuery(this).attr('title');
			tabId = tabId.substring(4);
			
		var siteKey 	= jQuery("input#wx-site-key").val(),
			tabType 	= jQuery(this).attr('rel'),
			tabName 	= jQuery(this).attr('alt'),		
			confDelete 	= confirm( Joomla.JText._('WEEVER_JS_ARE_YOU_SURE_YOU_WANT_TO') + tabName + Joomla.JText._('WEEVER_JS_QUESTION_MARK') );
		
		if(!confDelete)
			return false;
		
		jQuery.ajax({
			
			type: 		"POST",
			url: 		"index.php",
			data: 		"option=com_weever&action=ajaxSubtabDelete&id="+tabId+'&site_key='+siteKey,
			success: 	function(msg) {
			
				jQuery('#wx-modal-loading-text').html(msg);
				
				if(msg == "Item Deleted")
				{
				
					jQuery('#wx-modal-secondary-text').html(Joomla.JText._('WEEVER_JS_APP_UPDATED'));
					document.location.href = "index.php?option=com_weever#"+tabType+"Tab";
					setTimeout("document.location.reload(true);",20);
					
				}
				else
				{
				
					jQuery('#wx-modal-secondary-text').html('');
					jQuery('#wx-modal-error-text').html(Joomla.JText._('WEEVER_JS_SERVER_ERROR'));
					
				}
			
			}
			
		});
	
	});
*/
});