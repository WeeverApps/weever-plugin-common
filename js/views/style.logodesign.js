
wxApp = wxApp || {};

(function($){
    wxApp.LogoDesign = Backbone.View.extend({
        el: '#logo_design',
        events: {
            'change #titlebarSource': 'dropDownChange',
            'change .color': 'colorChange',
            'change .logo-design': 'logoChange' 
        },

        initialize: function() {
            console.log('Design view init');
            this.tpl = _.template( $('#logo-design').html() );
            this.$('.content').html( this.tpl( this.model.toJSON() ) );
        },

        dropDownChange: function() {
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
            this.logoChange( this );
        },

        colorChange: function(e) {
            var me = this;
            var txt = $(e.currentTarget);
            var id = txt.attr('id');
            var val = txt.val();
            // Make sure the colour is in the form '#ffffff' rahter than just 'ffffff'
            if (val.indexOf('#') !== 0)
                val = '#' + val;

            // Show loading gif
            var loading_id = '#' + id + '_loading';
            $(loading_id).show();
            
            var data = { 
                    action: 'ajaxSaveTheme',
                    nonce: $('input#nonce').val()
            };
            data[id] = val;

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: data,
                success: function(msg) {
                    me.hideLoadGif( id, loading_id );
                    
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

        logoChange: function(e) {
            var me = this;
            var txt = $(e.currentTarget);
            var id = txt.attr('id');

            // Show loading gif
            var loading_id = '#' + id + '_loading';
            $(loading_id).show();
            
            wxApp.design.get('titlebar').html  = $('#titlebar_html').val();
            wxApp.design.get('titlebar').text  = $('#titlebar_title').val();
            wxApp.design.get('titlebar').type  = $('#titlebarSource').val();
            wxApp.design.get('titlebar').image = $('#titlebar_logo_live').attr('src');
            
            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( wxApp.design.get('titlebar') );
            var params = { titlebar: innerParams };

            wx.makeApiCall('design/set_titlebar', params, function(data) {
                me.hideLoadGif( id, loading_id );
                setTimeout( function() { wx.refreshAppPreview(); }, 500);
            });
        },

        hideLoadGif: function(id, loading_id) {
            // Create a span that tells you the element was saved.
            // Add it to the page for two seconds, then fade it out, then remove it from the page.
            // Hide the loading gif
            var post_load = id + "_done";
            var span = "<span id=\"" + post_load + "\">Saved.</span>";
            $(loading_id).before( span );
            $( '#' + post_load ).delay( 2000 ).fadeOut( 1000 ).queue( function() { $(this).remove();} );
            $(loading_id).hide();
        }
    });

    wxApp.design = new wxApp.Design();
    wxApp.design.fetch( function() {
        // Load the Design Views.
        wxApp.logoDesign = new wxApp.LogoDesign( {model: wxApp.design} );
        wxApp.launchSreen = new wxApp.LaunchScreen( {model: wxApp.design} );
        wxApp.installIcon = new wxApp.InstallIcon( {model: wxApp.design} );
        wxApp.customBranding = new wxApp.CustomBranding( {model: wxApp.design} );
    } );


    wxApp.config = new wxApp.Config();
    wxApp.config.fetch( function() {
        wxApp.advanced = new wxApp.Advanced( { model: wxApp.config } );
    } );

})(jQuery);
