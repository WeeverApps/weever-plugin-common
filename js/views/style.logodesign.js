
wxApp = wxApp || {};

(function($){
    wxApp.LogoDesign = Backbone.View.extend({
        el: '#logo_design',
        events: {
            'click #save_logo_design': 'save',
            'change #titlebarSource': 'dropDownChange'
        },

        save: function() {
            console.log('logo design: save clicked');

            $('#save_logo_design').html('Saving...');

            var requestOneSuccess = false;
            var requestTwoSuccess = false;

            // Request 1: Update WP Options (the colours)
            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { 
                    action: 'ajaxSaveTheme',
                    nonce: $('input#nonce').val(),
                    main_titlebar_color: $('#main_titlebar_color').val(),
                    main_titlebar_text_color: $('#main_titlebar_text_color').val(),
                    subtab_color: $('#subtab_color').val(),
                    subtab_text_color: $('#subtab_text_color').val()
                },
                success: function(msg) {
                    console.log('OK');
                    requestOneSuccess = true;

                    if ( requestTwoSuccess ) {
                        $('#save_logo_design').html('Saved!');
                        // Wait half a second, then refresh the preview
                        // (The half-second helps ensure the server is synced)
                        setTimeout( function() { wx.refreshAppPreview(); }, 500);
                    }
                },
                error: function(v, msg) {
                    //alert(v);
                    alert(msg);
                }
            });

            // Request 2: Update Weever options (the titlebar)
            //
            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( {
                html:  $('#titlebar_html').val(),
                text:  $('#titlebar_title').val(),
                type:  $('#titlebarSource').val(),
                image: $('#wx-titlebar_logo_live').attr('src')
            } );
            var params = {
                titlebar: innerParams
            };

            wx.makeApiCall('design/set_titlebar', params, function(data) {
                requestTwoSuccess = true;

                if ( requestOneSuccess ) {
                    $('#save_logo_design').html('Saved!');
                    // Wait half a second, then refresh the preview
                    // (The half-second helps ensure the server is synced)
                    setTimeout( function() { wx.refreshAppPreview(); }, 500);
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
