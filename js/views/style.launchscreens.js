
wxApp = wxApp || {};

(function($){
    wxApp.LaunchScreen = Backbone.View.extend({
        el: '#launch_screen',

        events: {
            'click #save_launch_screen': 'save'
        },

        initialize: function() {
            this.tpl = _.template( $('#launch-screen').html() );
            this.$('.content').html( this.tpl( this.model.toJSON() ) );
        },

        save: function() {
            console.log('launch screen: save clicked');

            $('#save_launch_screen').html('Saving...');

            wxApp.design.get('launchscreen').phone            = wx.cleanUrl( $('#wx-phone_load_live').attr('src') );
            wxApp.design.get('launchscreen').tablet           = wx.cleanUrl( $('#wx-tablet_load_live').attr('src') );
            wxApp.design.get('launchscreen').tablet_landscape = wx.cleanUrl( $('#wx-tablet_landscape_load_live').attr('src') );

            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( wxApp.design.get('launchscreen') );
            var params = { launchscreen: innerParams };

            // set_launchscreen
            wx.makeApiCall('design/set_launchscreen', params, function(data) {
                $('#save_launch_screen').html('Saved!');
                // Wait half a second, then refresh the preview
                // (The half-second helps ensure the server is synced)
                setTimeout( function() { wx.refreshAppPreview(); }, 500);
            });

        }

    });

    
})(jQuery);
