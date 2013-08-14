/*	
*	Weever Apps Administrator Component for Joomla
*	(c) 2010-2011 Weever Apps Inc. <http://www.weeverapps.com/>
*
*	Author: 	Robert Gerald Porter (rob.porter@weever.ca)
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

var wx	= wx || {};

wx.activeTypeDialog	= null;
wx.tinymce_options = {
    // Location of TinyMCE script
    script_url : '../jscripts/tiny_mce/tiny_mce.js',

    // General options
    theme : "advanced",
    plugins : "table",
    //plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",
    relative_urls : false,
    remove_script_host : false,

    // Theme options
    theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontsizeselect",
    theme_advanced_buttons2 : "bullist,numlist,|,undo,redo,|,link,unlink,code,|,forecolor",
    theme_advanced_buttons3 : "tablecontrols",
    //theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
    theme_advanced_toolbar_location : "top",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : "bottom",
    theme_advanced_resizing : true
};

/* IE 8 and Camino give errors if a console.log is left in the code */
/* Let's fix that: */

if (typeof console == "undefined") {

    this.console = { log: function() {} };
    
}


/* Prep our Ajax call to the CMS */

wx.ajaxAddTabItem	= function(a, confirm_feed, current_dialog) {

	//console.log(a);
	
	var ajaxUrls	= [],
		returned	= 0,
		addAjaxUrl	= function(type, data) {
		
			var component;
		
			if( typeof data.component === "object" ) 			
				component = data.component[ type ];
			else
				component = data.component;

			var newType = new wx.ajaxUrl({ 
			
				type:		type,
				component:	component,
				published:	1
				
			});
			
			// Send the ID just in case
			newType.id = data.id;
			
			/* If there's no user-entered title, use the default; e.g., Facebook */
			if( undefined != data.defaultTitle && !( jQuery('#wx-add-title-tab-item').val() ) )
				newType.title = "&name=" + encodeURIComponent( data.defaultTitle );
		 
		 	/* get all the fields we need */
			for( var ii in data.fields ) {
				
				newType[ii]	= jQuery( data.fields[ ii ] ).val();
				
			}
			
            // Icon ID from the picker (if available)
            if ( undefined != jQuery('#wx-add-title-tab-dialog select.wx-icon-picker') )
                newType.extra += "&icon_id=" + jQuery('#wx-add-title-tab-dialog select.wx-icon-picker').val();
            
			/* for those where we're just going to set the title as a Twitter handle, etc */
			if( "component_behaviour" == data.defaultTitle && ! data.title )
				newType.title = "&name=" + encodeURIComponent( newType.component_behaviour );
				
			if(data.options) {

				for( var ii in data.options ) {
				
					newType.extra += "&" + ii + "=";
				
					if( jQuery('#wx-add-source-option-' + ii ).is(':checked') )
						newType.extra += "1";
					else	
						newType.extra += "0";
				
				}
			
			}
			
			ajaxUrls.push( newType.getParams() );
		
		};
	
	if( a.featureData.types instanceof Array ) {
	
		/* for each type checked */
		for( var i=0; i < a.featureData.types.length; i++ ) {
		
			if ( jQuery('#wx-add-source-check-' + a.featureData.types[i] + ':checked').length > 0 ) {
			
				addAjaxUrl(a.featureData.types[i], a.featureData);
			
			}
			
		}
	
	} else {

		addAjaxUrl(a.featureData.types, a.featureData);	
	
	}
	
	//console.log(ajaxUrls);
	
	for( var i=0; i < ajaxUrls.length; i++ ) {
		// Pass nonce and always api check
		ajaxUrls[i] += '&nonce=' + jQuery('input#nonce').val(); // + '&api_check=1';
		
		if ( undefined != confirm_feed && true === confirm_feed )
			// Will return some sample data from the feed, if successful
			ajaxUrls[i] += '&confirm_feed=1&api_check=1';

        if ( wx.current_parent_id )
            ajaxUrls[i] += '&parent_id=' + parseInt(wx.current_parent_id);
        
		if ( wx.edit_id )
			ajaxUrls[i] += '&edit_id=' + parseInt(wx.edit_id);
		
		jQuery.ajax({
		
		   type: 	"POST",
		   url: 	ajaxurl,
		   data: 	ajaxUrls[i],
		   success: function(msg) {
		     
		     returned++;
		     
		     if( returned == ajaxUrls.length ) {
		     
		    	 // Confirming the feed?
		    	 if ( true === confirm_feed ) {
		    		 // Show the data in the open dialog
		    		 try {
		    			 var result = JSON.parse(msg);
		    			 
		    			 if ( ! result.success ) {
		    				 jQuery(current_dialog).dialog('close');
		    				 jQuery(a.previousDialog).dialog('open');
		    				 alert('Error retrieving sample data!  Check the details and try again');
		    				 // re-show the previous dialog again and show the error at the top?
				    		 //jQuery('<tr><td><span class="error"></span></td></tr>').appendTo('#wx-add-confirm-feed-data tbody');
		    			 } else {
		    				 var found_count = 0;
		    				 for ( var item = 0; item < result.feed.length; item++ ) {
		    					 if ( result.feed[item].content || result.feed[item].image || result.feed[item].title ) {
		    						 jQuery('<tr><td>' + ( result.feed[item].image ? '<img src="http://src.sencha.io/96/96/' + result.feed[item].image + '" />' : '&nbsp;' ) + '</td><td>' + ( result.feed[item].title ? result.feed[item].title : '&nbsp;' ) + '</td><td>' + ( result.feed[item].content ? ( result.feed[item].content.slice(0, 200) + ( result.feed[item].content.length > 200 ? '...' : '' ) ) : '&nbsp;' ) + '</td>' + (result.feed[item].url ? '<td><a target="_blank" href="' + result.feed[item].url + '">View</a></td>' : '<td>&nbsp;</td>') + '</tr>').appendTo('#wx-add-confirm-feed-data tbody');
		    						 found_count++;
		    					 }
		    				 }
		    				 
		    				 if ( ! found_count )
					    		 jQuery('<tr><td><span class="error">Details verified but no data found, new account?</span></td></tr>').appendTo('#wx-add-confirm-feed-data tbody');
		    			 }
		    			 
		    		 } catch (e) {
			    		 jQuery('<tr><td><span class="error">Error retrieving sample data!</span></td></tr>').appendTo('#wx-add-confirm-feed-data tbody');
		    		 }
		    		 jQuery('#wx-add-confirm-feed-loading').hide();
		    		 return;
		    	 }

			     jQuery('#wx-modal-loading-text').html(msg);
			   	 
			     if (msg == "")
			     {

			     	var hashTab;
			     	
			     	if( wx.activeTypeDialog != null )
			     		hashTab	= "&refresh=" + Math.random() + "#" + wx.activeTypeDialog + "Tab";
			     	else 
			     		hashTab = "&refresh=" + Math.random();
			     
			     	jQuery('#wx-modal-secondary-text').html('Reloading page..');
			     	document.location.href = wx.baseExtensionUrl + hashTab;
			     	
			     	//setTimeout( function() { document.location.reload(true); }, 25 );
			     	
			     }
			     else
			     {
					  jQuery('#wx-modal-secondary-text').html('');
					  jQuery('#wx-modal-error-text').html( 'Error adding item' );
			     }
			     
			 }
		     
		     
		     
		   },
		   error:  function(v,msg){ 
			   jQuery('#wx-modal-secondary-text').html('');
			   jQuery('#wx-modal-error-text').html( 'Error adding item' );
		   }
		   
		 });
	
	}
	
}

/* Confirmation dialog, skipped if we don't ask about a title (wx.features [title] property is undefined) */

wx.confirmAddTabItem	= function(a) {
	// TODO: Call addAjaxUrl and verify feed, if api check fails show the previous dialog again with an error message injected 
	// (or a separate error popup?)
	var dialogId		= '#wx-add-title-tab-dialog',
		titlebarHtml	= "Confirm";
	
	if ( true === a.featureData.confirm_feed ) {
        jQuery('#wx-add-confirm-feed').show();
		jQuery('#wx-add-confirm-feed-loading').show();
		
		// Clear existing data if any
		jQuery('#wx-add-confirm-feed-data tbody').html('');
	
		// AJAX call to get the sample feed data, and inject it into the dialog
		wx.ajaxAddTabItem(a, true, dialogId);
	} else {
        jQuery('#wx-add-confirm-feed').hide();
    }

    // Select the default icon (if any)
    jQuery('#wx-add-title-tab-dialog select.wx-icon-picker').val(wx.default_icon_id.toString());

    // Load currently selected icon
    wx.update_icon_preview(jQuery('#wx-add-title-tab-dialog select.wx-icon-picker').val());
    
	if ( 'component_behaviour' == a.featureData.defaultTitle )
		// Load up the data from the previous dialog
		jQuery('input#wx-add-title-tab-item').val(jQuery(a.featureData.fields['component_behaviour']).val());
	else if( undefined != a.featureData.defaultTitle )
		jQuery('input#wx-add-title-tab-item').val(a.featureData.defaultTitle);
	else if ( undefined != jQuery(a.featureData.fields['cms_feed'] + ' option:selected').text() )
		jQuery('input#wx-add-title-tab-item').val(jQuery(a.featureData.fields['cms_feed'] + ' option:selected').text());
	else
		jQuery('input#wx-add-title-tab-item').val('');
		
	if( undefined != a.featureData.titleUse )
		jQuery('p#wx-add-title-use').html(a.featureData.titleUse);
	else
		jQuery('p#wx-add-title-use').html(
		
			'This title will be just above your content, keep it short so it will fit easily on a small screen.'
		
		);

	jQuery(dialogId).dialog({
		
		modal: 		true, 
		resizable: 	false,
		width: 		'auto',
		height: 	'auto',
		title:		titlebarHtml,
		show:		'fade',
		hide:		'drop',
		buttons: 	wx.setButtonActions({
			
			buttonName:		['Finish', 'Cancel'],
			dialogId:		dialogId,
			backAction:		function() { 
			
				jQuery(a.previousDialog).dialog('open'); 
			
			},
			action:			wx.ajaxAddTabItem, 
			actionArg:		{
			
				previousDialog: 	a.dialogId,
				featureData:		a.featureData
				
			}
			
		}),
		open:		function(e, ui) {
		
			/* click outside dialog to close */
		
			jQuery('.ui-widget-overlay').bind('click', function() { 
			
				jQuery(dialogId).dialog('close');
				
			});
			
		}
			
	}); 		

}

/* object to create a set of buttons, one cancel, one for action */

wx.setButtonActions		= function(a) {

	var buttons		= {};

	if( undefined != a.buttonName[1] ) {
		
		/* action button */
		buttons[ a.buttonName[0] ] = {
			
			id:		'wxui-action',
            'class':  'wxui-btn medium radius3 wxalign-left blue',

			text:	a.buttonName[0],
			click:	function() {
			
				jQuery(a.dialogId).dialog( "close" );
	
				a.action(a.actionArg);
				
			}
		
		};
		
		/* cancel button */
		buttons[ a.buttonName[1] ] = function() {
			
			
					
			jQuery(a.dialogId).dialog( "close" );
			
			if( isFunction(a.backAction) )
				a.backAction();
		
		};
	
	} 
	else {
	
		/* solo cancel button */
		buttons[ a.buttonName[0] ] = function() {
		
			jQuery(a.dialogId).dialog( "close" );
			
			if( isFunction(a.backAction) )
				a.backAction();
		
		};
	
	}
	
	return buttons;

};

wx.parentFeatureData;
wx.edit_id;
wx.edit_data;

wx.getFeatureData = function (type, subtype) {
	var featureData;
	
	wx.parentFeatureData = undefined;
	
	for( var i=0; i < wx.features.length; i++ ) {
	
		if( wx.features[i].id == type && wx.features[i].items && subtype ) {
		
			wx.parentFeatureData = wx.features[i];
			for (var ii=0; ii < wx.features[i].items.length; ii++ ) {
			
				if( wx.features[i].items[ii].id == subtype )
					featureData = wx.features[i].items[ii];
			
			}
		
		}
		else if( wx.features[i].id == type )
			featureData = wx.features[i];
	
	}
	
	return featureData;

};

/* Create our dialog, with localization */

wx.localizedConditionalDialog	= function (buttonName, dialogId, backAction, populateOptions, single) {
	var	type 			= dialogId.replace('#wx-add-', '').replace('-dialog', '').replace(/\-/, '.'),
		subType 		= type.split('.'),
		titlebarHtml	= '',
		featureData,
		parentFeatureData,
		actionArg,
		action;

	/* Services only */
	if( subType[1] != 'type' && ( subType[1] == undefined || subType[1].search('upgrade-notice') == -1 ) ) {
		if ( subType[0] == 'facebook' && subType[1] != 'social' )
			// Override the type due to component being "facebook.events" instead of just "events" etc
			subType[1] = type;
	
		featureData = wx.getFeatureData(subType[0], subType[1]);
		parentFeatureData = wx.parentFeatureData;
		
		if ( undefined == featureData ) {
			return;
		}
		
		if ( undefined != wx.parentFeatureData ) {
			titlebarHtml += "<img class='wx-jquery-dialog-titlebar-icon' src='" + wx.navIconDir + parentFeatureData.id + ".png' /> " + parentFeatureData.name + ": " + featureData.name;
		}
		else {
			titlebarHtml += "<img class='wx-jquery-dialog-titlebar-icon' src='" + wx.navIconDir + featureData.id + ".png' /> " + featureData.name;
		}		
		
		/* So correct tab type is checkboxed if we got here via Tab Types */
		if( true == populateOptions && true == single ) {
			wx.activeTypeDialog = null;
		}
		
		if( wx.activeTypeDialog != null ) {
			jQuery('.wx-sub-item-option').hide();
			jQuery('.wx-type-' + wx.activeTypeDialog + '-option').show();
		}
		
		if ( featureData != undefined ) {
			if( true === featureData.title || true === featureData.confirm_feed ) 
				action 	= wx.confirmAddTabItem;
			else 
				action	= wx.ajaxAddTabItem;
			
			/* add any default values for the input */
		
			if( undefined != featureData.defaultValue && ! wx.edit_id ) {
		
				for( var i in featureData.defaultValue ) {
			
					jQuery( featureData.fields[i] ).val( featureData.defaultValue[i] );
				
				}
		
			}
		}		
		
	}	
	/* Show upgrade prompt */
	else if ( subType[1] != undefined && subType[1].search('upgrade-notice') >= 0 ) {
		action	= function(a) { null; };
	}
	/* Tab Types only; no action button, use Tab Name for icon */
	else { 
		console.log(subType);
		wx.activeTypeDialog = subType[0];
		titlebarHtml 	+= "<img class='wx-jquery-dialog-titlebar-icon' src='" + wx.navIconDir +  subType[0] + ".png' /> " + wx.types[ subType[0] ].name;
		action 			= function(a) { null; };
	}

	jQuery(dialogId).dialog({
		
		modal: 		true, 
		resizable: 	false,
		width: 		'auto',
		height: 	'auto',
		title:		titlebarHtml,
		show:		'fade',
		hide:		'drop',
		buttons: 	wx.setButtonActions({
			
			buttonName:		buttonName,
			dialogId:		dialogId,
			backAction:		backAction,
			action:			action, 
			actionArg:		{
			
				previousDialog: 	dialogId,
				featureData:		featureData
				
			}
			
		}),
		open:		function(e, ui) {
		
			var actionButton 	= 'div.ui-dialog-buttonset button#wxui-action',
				allButtons		= 'div.ui-dialog-buttonset button'
			
			//jQuery(actionButton).attr('disabled', 'disabled');
			jQuery(allButtons).removeClass('blue');
			jQuery(allButtons).addClass('wxui-btn medium radius3 wxalign-left white');

			/* click outside dialog to close */
			jQuery('.ui-widget-overlay').bind('click', function() { 
			
				jQuery(dialogId).dialog('close');
				
			});
			
			jQuery( 'input:first-child', jQuery(this) ).blur();
			//jQuery('.wx-dialog-input').val('');

		}
			
	});
}

/* helper for finding if something is a function */

function isFunction(functionToCheck) {

 	var getType = {};
 	
	return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
	
}
