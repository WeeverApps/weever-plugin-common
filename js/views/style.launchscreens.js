
wxApp = wxApp || {};

(function($){
    wxApp.LaunchScreen = Backbone.View.extend({
        el: '#launch_screen',

        events: {
            'click #save_launch_screen': 'save'
        },

        // initialize: function() {
        //     console.log('init');
        // },

        save: function() {
            console.log('launch screen: save clicked');

            $('#save_launch_screen').html('Saving...');

            // The 'set_design' method of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( {
                launchscreen: {
                    phone: this.cleanUrl( $('#wx-phone_load_live').attr('src') ),
                    tablet: this.cleanUrl( $('#wx-tablet_load_live').attr('src') ),
                    tablet_landscape: this.cleanUrl( $('#wx-tablet_landscape_load_live').attr('src') )
                }
            } );
            var params = {
                design: innerParams
            };

            wx.makeApiCall('design/set_design', params, function(data) {
                wx.refreshAppPreview();
            });

        },

        // Gets rid of params from an image URL.
        // Input:  http://example.com/images/logo.png?nocache=0.23158600 1379945989
        // Output: http://example.com/images/logo.png
        cleanUrl: function( url ) {
            var i = url.indexOf('?');
            if ( i > -1 ) {
                url = url.substring(0, i);
            }
            return url;

        }
    });

    wxApp.launchSreen = new wxApp.LaunchScreen();
})(jQuery);
