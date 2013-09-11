
wxApp = wxApp || {};

(function($){
    wxApp.LogoDesign = Backbone.View.extend({
        el: '#logo_design',
        events: {
            'click #save_logo_design': 'save'
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
                    main_titlebar_color: $('#main_titlebar_color').val(),
                    main_titlebar_text_color: $('#main_titlebar_text_color').val(),
                    subtab_color: $('#subtab_color').val(),
                    subtab_text_color: $('#subtab_text_color').val(),
                    titlebarSource: $('#titlebarSource').val(),
                    titlebar_title: $('#titlebar_title').val(),
                    titlebar_logo_live: $('#titlebar_logo_live').val()
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

    wxApp.logoDesign = new wxApp.LogoDesign();

})(jQuery);
