
wxApp = wxApp || {};

(function($){
    wxApp.InstallIcon = Backbone.View.extend({
        el: '#install_icon',
        events: {
            'click #save_install_icon': 'save'
        },

        save: function() {
            console.log('install icon: save clicked');

            $('#save_install_icon').html('Saving...');

            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( {
                prompt: $('#install_prompt').val(),
                name:   $('#title').val(),
                icon:   wx.cleanUrl( $('#wx-icon_live').attr('src') )
            } );
            var params = {
                install: innerParams
            };

            // set_launchscreen
            wx.makeApiCall('design/set_install', params, function(data) {
                $('#save_install_icon').html('Saved!');
                // Wait half a second, then refresh the preview
                // (The half-second helps ensure the server is synced)
                setTimeout( function() { wx.refreshAppPreview(); }, 500);
            });
        }
    });

})(jQuery);
