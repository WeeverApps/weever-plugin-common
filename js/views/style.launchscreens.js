
wxApp = wxApp || {};

(function($){
    wxApp.LaunchScreen = Backbone.View.extend({
        el: '#launch_screen',

        events: {
            'change .wx-theme-input': 'saveImage'
        },

        initialize: function() {
            Backbone.Events.on( 'image:change', this.saveImage, this );
            this.tpl = _.template( $('#launch-screen').html() );
            this.$('.content').html( this.tpl( this.model.toJSON() ) );
        },

        saveImage: function( input ) {

            eenpoot = input;
            var id = input.attr('id');
            if (!id) {
                id = input.attr('name');
            }
            var src = input.val();

            if ( id === 'titlebar_logo_live' ) {
                wxApp.design.get('titlebar').image = src;
            
                // The 'design' methods of Open API is kinda strange... It 
                // expects top-level params to be JSON objects, and items within 
                // the top-level params to be string representations of JSON 
                // objects... Therefore, we have to 'stringify' the inner params.
                var innerParams = JSON.stringify( wxApp.design.get('titlebar') );
                var params = { titlebar: innerParams };

                wx.makeApiCall('design/set_titlebar', params, function(data) {
                    setTimeout( function() { wx.refreshAppPreview(); }, 500);
                });

            } else if ( id === 'icon_live' ) {

                wxApp.design.get('install').icon   = src;

                // The 'design' methods of Open API is kinda strange... It 
                // expects top-level params to be JSON objects, and items within 
                // the top-level params to be string representations of JSON 
                // objects... Therefore, we have to 'stringify' the inner params.
                var innerParams = JSON.stringify( wxApp.design.get('install') );
                var params = { install: innerParams };

                wx.makeApiCall('design/set_install', params, function(data) {
                    // Wait half a second, then refresh the preview
                    // (The half-second helps ensure the server is synced)
                    setTimeout( function() { wx.refreshAppPreview(); }, 500);
                });

            } else {

                // Load screen image.
                id = id.replace('_load_live', '');

                wxApp.design.get('launchscreen')[id] = src;

                // The 'design' methods of Open API is kinda strange... It 
                // expects top-level params to be JSON objects, and items within 
                // the top-level params to be string representations of JSON 
                // objects... Therefore, we have to 'stringify' the inner params.
                var innerParams = JSON.stringify( wxApp.design.get('launchscreen') );
                var params = { launchscreen: innerParams };

                wx.makeApiCall('design/set_launchscreen', params, function(data) {
                    // Wait half a second, then refresh the preview
                    // (The half-second helps ensure the server is synced)
                    setTimeout( function() { wx.refreshAppPreview(); }, 500);
                });

            }
        }
    });

    
})(jQuery);
