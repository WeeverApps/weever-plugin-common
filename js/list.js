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
    wx.makeApiCall = function(endpoint, paramsObj, successCallback, failureCallback, datatype) {
		var method = 'POST', data = '';
        var apiUrl = wx.apiUrl + endpoint + '?app_key=' + wx.siteKey;
        var queryStr = [];
        datatype = datatype || 'json';

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
            datatype: datatype,
            success: function(v) {
                wx.apiSuccess( v, successCallback, failureCallback );
            },
            error: function(v, message) {
                // Sometimes the call appears to be an error because we get PHP
                // warnings prior to the JSON. Let's make sure that didn't happen.
                if ( v.responseText[0] !== '{' ) {
                    var i = v.responseText.indexOf('{');
                    if (i > -1) {
                        var responseJson = v.responseText.substring( i );
                        responseJson = JSON.parse( responseJson );
                        wx.apiSuccess( responseJson, successCallback, failureCallback );
                        return;
                    }
                }

                if ( failureCallback ) {
                    failureCallback( v );
                } else {
                    jQuery('#wx-modal-loading-text').html(message);
                    jQuery('#wx-modal-secondary-text').html('');
                    jQuery('#wx-modal-error-text').html( 'Server Error Occurred' );
                }
            }
        });
    };

    wx.apiSuccess = function( v, successCallback, failureCallback ) {
        if ( ! v.error && v.success )
            successCallback(v);
        else {
            if ( failureCallback ) {
                failureCallback( v )
            } else {
                jQuery('#wx-modal-loading-text').html(v.message ? v.message : 'Error');
                jQuery('#wx-modal-secondary-text').html('');
                jQuery('#wx-modal-error-text').html( 'Server Error Occurred' );
            }
        }
        Backbone.Events.trigger( 'api:success' );
    };

    wx.getText = function(endpoint, successCallback) {
        var method = 'GET';
        var apiUrl = wx.apiUrl + endpoint + '?app_key=' + wx.siteKey;

        $.ajax({
            url: apiUrl,
            type: method,
            datatype: 'text',
            success: function(v) {
                if (successCallback){
                    successCallback( v );
                }
            },
            error: function(v, message) {
                //console.log(message);
            }
        });
};

    wx.refreshAppPreview = function() {
        //console.log('Refreshing Preview');
        $('#iframe-loading').hide();

        if ( $.browser.webkit ) {
            $('#preview-app-dialog-no-webkit').hide();
            $('#preview-app-dialog-frame').attr( 'src', $('#preview-app-dialog-frame').attr('rel') );
            $('#preview-app-dialog-frame').show();
        } else {
            $('#preview-app-dialog-frame').hide();
            $('#preview-app-dialog-no-webkit').show();
        }
    };

    wx.rebuildApp = function() {
        // Right now this method just hides the preview, and when the build is complete, it's reshown
        // (See the doPoll method in layout.php)
        // This will be improved when we have build events in v3.0
        wx.poll = true;
        $('#preview-app-dialog-frame').hide();
        $('#preview-app-dialog-no-webkit').hide();
        $('#iframe-loading').show();
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
