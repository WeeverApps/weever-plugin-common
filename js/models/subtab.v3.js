
wxApp = wxApp || {};

/**
 * Base class for any models that use V3 API.
 * This is a stop gap while we transition from V2 to V3; it should be removed in the future.
 */
(function($) {
    wxApp.SubTabV3 = wxApp.SubTab.extend({

        getFeedSample: function( callback ) {

            var apiUrl = wx.liveUrl + 'api/v3/';
            wxApp.SubTab.prototype.getFeedSample.apply( this, [ callback, apiUrl ] );

        }

    });

})(jQuery);