
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

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { 
                    action: 'ajaxSaveLaunchScreens',
                    nonce: $('input#nonce').val(),
                    phone_load_live: $('#wx-phone_load_live').attr('src'),
                    tablet_load_live: $('#wx-tablet_load_live').attr('src'),
                    tablet_landscape_load_live: $('#wx-tablet_landscape_load_live').attr('src')
                },
                success: function(msg) {
                    console.log('OK');
                    $('#save_launch_screen').html('Saved!');
                    // Wait half a second, then refresh the preview
                    // (The half-second helps ensure the server is synced)
                    setTimeout( function() { wx.refreshAppPreview(); }, 500);
                },
                error: function(v, msg) {
                    //alert(v);
                    alert(msg);
                }
            });
        }
    });

    wxApp.launchSreen = new wxApp.LaunchScreen();
})(jQuery);
