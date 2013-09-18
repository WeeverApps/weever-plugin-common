
wxApp = wxApp || {};

(function($){
    wxApp.InstallIcon = Backbone.View.extend({
        el: '#install_icon',
        events: {
            'click #save_install_icon': 'save'
        },

        // initialize: function() {
        //     console.log('init');
        // },

        save: function() {
            console.log('install icon: save clicked');

            $('#save_install_icon').html('Saving...');

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { 
                    action: 'ajaxSaveInstallIcon',
                    nonce: $('input#nonce').val(),
                    title: $('#title').val(),
                    icon_live: $('#wx-icon_live').attr('src'),
                    install_prompt: $('#install_prompt').val()
                },
                success: function(msg) {
                    console.log('OK');
                    $('#save_install_icon').html('Saved!');
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

    wxApp.installIcon = new wxApp.InstallIcon();

})(jQuery);
