
wxApp = wxApp || {};

(function($){
    wxApp.LogoDesign = Backbone.View.extend({
        el: '#logo_design',
        events: {
            'click #save_logo_design': 'save',
            'change #titlebarSource': 'dropDownChange'
        },

        // initialize: function() {
        //     console.log('init');
        // },

        save: function() {
            console.log('logo design: save clicked');

            $('#save_logo_design').html('Saving...');

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
                    titlebar_logo_live: jQuery('#wx-titlebar_logo_live').attr('src'),
                    titlebar_html: $('#titlebar_html').val()
                },
                success: function(msg) {
                    console.log('OK');
                    $('#save_logo_design').html('Saved!');
                    // Wait half a second, then refresh the preview
                    // (The half-second helps ensure the server is synced)
                    setTimeout( function() { wx.refreshAppPreview(); }, 500);
                },
                error: function(v, msg) {
                    //alert(v);
                    alert(msg);
                }
            });
        },

        dropDownChange: function() {
            console.log('logo design: drop down changed');

            switch($('#titlebarSource').val()) {
                case 'text':
                    $('#logoText').show();
                    $('#logoHtml').hide();
                    $('#logoImage').hide();
                    break;
                case 'image':
                    $('#logoText').hide();
                    $('#logoHtml').hide();
                    $('#logoImage').show();
                    break;
                case 'html':
                    $('#logoText').hide();
                    $('#logoHtml').show();
                    $('#logoImage').hide();
                    break;
            }
        }
    });

    wxApp.logoDesign = new wxApp.LogoDesign();

})(jQuery);
