
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

            console.log( $('#phone_load_live').val() );

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { 
                    action: 'ajaxSaveLaunchScreens',
                    nonce: $('input#nonce').val(),
                    phone_load_live: $('#phone_load_live').val(),
                    tablet_load_live: $('#tablet_load_live').val(),
                    tablet_landscape_load_live: $('#tablet_landscape_load_live').val(),
                },
                success: function(msg) {
                    console.log('OK')
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
