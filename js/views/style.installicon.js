
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
            console.log('logo design: save clicked');

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { 
                    action: 'ajaxSaveTheme',
                    nonce: $('input#nonce').val(),
                    title: $('#title').val(),
                    icon_live: $('#icon_live').val(),
                    install_prompt: $('#install_prompt').val()
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

    wxApp.installIcon = new wxApp.InstallIcon();

})(jQuery);
