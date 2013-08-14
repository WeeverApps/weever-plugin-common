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
	jQuery( "#tabs" ).tabs();
	jQuery( "#toptabs li" ).hover(function(){jQuery(this).addClass('ui-state-hover');}, function(){jQuery(this).removeClass('ui-state-hover');});

	// Dialogs
    jQuery(".modal-content").each(function() {
    	jQuery(this).dialog({                   
	        'dialogClass'   : 'wp-dialog',           
	        'modal'         : true,
	        'autoOpen'      : false, 
	        'closeOnEscape' : true,   
	        'resizable'		: false,
	        'buttons'       : {
	            "Close": function() {
	                jQuery(this).dialog('close');
	            }
	        }
	    });			    	
    });
	
    // Preview app


    function fixDiv() {

        var droparea = jQuery( '#listTabs' );
        var phonepreview = jQuery( '#container380' );
        var addtabs = jQuery( '#wx-add-OneView' );

        var position = jQuery( '#container380' ).offset();

        if ( jQuery( window ).scrollTop() > 55 ) {

            if ( phonepreview.css("position") == 'relative' ) {
                droparea.css( { 'position' : 'fixed' , 'top': '55px' , 'width' : '1030px' , 'z-index' : '999' } );
                phonepreview.css( { 'position': 'fixed' , 'top': '180px' , 'left': position.left } );
                addtabs.css( { 'padding-top': '105px' } );
            }

        } else {
            droparea.css({'position': 'relative', 'top': 'auto'});
            phonepreview.css({'position': 'relative', 'top': 'auto', 'left' : 'auto'});
            addtabs.css( { 'padding-top': '0px' } );
        }

    }
    //jQuery(window).scroll(fixDiv);
    //fixDiv();

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



/*


    function fixDiv() {

        var droparea = jQuery( '#listTabs' );
        var phonepreview = jQuery( '#container380' );
        var addtabs = jQuery( '#wx-add-OneView' );

        var position = jQuery( '#container380' ).offset();

        if ( jQuery( window ).scrollTop() > 55 ) {

            if ( phonepreview.css("position") == 'relative' ) {
                droparea.css( { 'position' : 'fixed' , 'top': '55px' , 'width' : '1030px' , 'z-index' : '999' } );
                phonepreview.css( { 'position': 'fixed' , 'top': '180px' , 'left': position.left } );
                addtabs.css( { 'padding-top': '105px' } );
            }

        } else {
            droparea.css({'position': 'relative', 'top': 'auto'});
            phonepreview.css({'position': 'relative', 'top': 'auto', 'left' : 'auto'});
            addtabs.css( { 'padding-top': '0px' } );
        }

    }
    //jQuery(window).scroll(fixDiv);
    //fixDiv();

    jQuery('#preview-iphone').click(function() {

        jQuery('#preview-bg').attr('class', 'iphone');
        jQuery('#preview-app-dialog-webkit iframe').attr('width', '300');
        jQuery('#preview-app-dialog-webkit iframe').attr('height', '580');
        jQuery('#preview-iphone').attr('class', 'active');
        jQuery('#preview-android, #preview-blackberry').attr('class', '');

        jQuery('#preview-app-padding-box').attr('style', 'padding-top:6 0px; padding-left: 10px;');

    });
    jQuery('#preview-android').click(function() {

        jQuery('#preview-bg').attr('class', 'android');
        jQuery('#preview-app-dialog-webkit iframe').attr('width', '350');
        jQuery('#preview-app-dialog-webkit iframe').attr('height', '560');
        jQuery('#preview-android').attr('class', 'active');
        jQuery('#preview-iphone, #preview-blackberry').attr('class', '');

        jQuery('#preview-app-padding-box').attr('style', 'padding-top: 68px; padding-left: 0px;');

        jQuery('#preview-app-dialog-webkit iframe #wxMainTabBar').attr('top', '0');
        jQuery('#preview-app-dialog-webkit iframe #wxMainTabBar').attr('left', '0');
    });
    jQuery('#preview-blackberry').click(function() {

        jQuery('#preview-bg').attr('class', 'blackberry');
        jQuery('#preview-app-dialog-webkit iframe').attr('width', '290');
        jQuery('#preview-app-dialog-webkit iframe').attr('height', '390');
        jQuery('#preview-blackberry').attr('class', 'active');
        jQuery('#preview-iphone, #preview-android').attr('class', '');

        jQuery('#preview-app-padding-box').attr('style', 'padding-top: 55px; padding-left: 14px;');




    });



/*
    jQuery("#weever-preview-mobile").click(function(event) {
        event.preventDefault();
        
        if (jQuery.browser.webkit) {
	        jQuery('#preview-app-dialog-frame').attr('src', jQuery('#preview-app-dialog-frame').attr('rel'));
	        jQuery('#preview-app-dialog-webkit').dialog('option', 'width', 320);
	        jQuery('#preview-app-dialog-webkit').dialog('open');
        } else {
	        jQuery('#preview-app-dialog-no-webkit').dialog('open');
        }
    });			
     
     */
    });			

// TODO: Remove the below
// TODO: Hook in more complete uploader js

jQuery(document).ready(function() {

	jQuery('#upload_image_button').click(function() {
	 formfield = jQuery('#upload_image').attr('name');
	 tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
	 return false;
	});

	window.send_to_editor = function(html) {
	 imgurl = jQuery('img',html).attr('src');
	 jQuery('#upload_image').val(imgurl);
	 tb_remove();
	}

});


function populateCMS(f)
{
	f.name.value=f.cms_feed[f.cms_feed.	selectedIndex].text;
}

function populateComponentID(f)
{
	f.name.value=f.component_id[f.component_id.selectedIndex].text;
}

function strpos (haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}

/**
* Toggles the check state of a group of boxes
*
* Checkboxes must have an id attribute in the form cb0, cb1...
* @param The number of box to 'check'
* @param An alternative field name
*/
function checkAllTab( n, fldName, boxchecked, toggle, start ) {
  if (!fldName) {
     fldName = 'cb';
  }

	var max = n + start;
	var c = toggle.checked;
	var n2 = 0;
	for (i=start; i < max; i++) {
		cb = eval( 'document.getElementById("' + fldName + '' + i + '")');
		if (cb) {
			cb.checked = c;
			n2++;
		}
	}
	if (c) {
		boxchecked.value = n2;
	} else {
		boxchecked.value = 0;
	}
}

function listItemTask( id, task ) {

    var f = document.getElementById("adminForm");
    cb = eval( 'document.getElementById("' + id + '")');
    if (cb) {
        for (i = 0; true; i++) {
            cbx = eval('document.getElementById("'+i+'")');
            if (!cbx) break;
            cbx.checked = false;
        } // for
        cb.checked = true;
        f.boxchecked.value = 1;
        submitbutton(task);
    }
    return false;
}
