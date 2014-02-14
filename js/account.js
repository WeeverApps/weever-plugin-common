/*	
*	Weever Apps Administrator Component for Joomla
*	(c) 2010-2011 Weever Apps Inc. <http://www.weeverapps.com/>
*
*	Author: 	Matt Grande (matt@weeverapps.com)
*	Version: 	3.0.15
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


jQuery(document).ready(function(){ 

	wx.makeApiCall('account/get_tier', {}, function(data) {

		if ( data.tier_raw == 2.1 || data.tier_raw == '2.1' ) {

			// This user has a trial account. Check the expiration date.
			wx.makeApiCall('account/get_expiry', {}, function(data) {
				// data.expiry = "2013-10-17 20:00:00";
				if (data.expiry == "0000-00-00 00:00:00") {
					// Doesn't expire.
					return;
				}

				console.log("EXPIRY");
				console.log(data);

				var d = new Date(data.expiry);
				var millisecondsPerDay = 86400000; //1000 * 60 * 60 * 24;
				var millisecondsBetween = d.getTime() - (new Date()).getTime();
				var days = millisecondsBetween / millisecondsPerDay;
				days = Math.floor( days );
				if (days < 0) { 
					jQuery('#account-expired').show();
					return;
				}

				if (days < 5) {
					jQuery('#account-expiration-warning .secondary').addClass('alert').removeClass('secondary');
				}

				if ( days == 0 ) {
					jQuery('#expiry-days').html( 'today!' );
				} else if ( days == 1 ) {
					jQuery('#expiry-days').html( 'in one day.' );
				} else {
					jQuery('#expiry-days').html( 'in ' + days.toString() + ' days.' );
				}

				jQuery('#account-expiration-warning').show();
			});
		
		}

	});

});