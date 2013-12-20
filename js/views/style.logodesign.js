
wxApp = wxApp || {};

(function($){
    wxApp.LogoDesign = wxApp.StyleBase.extend({
        el: '#logo_design',
        events: {
            'change input[name=titlebarSource]': 'radioChange',
            'click button.postfix': 'showPicker',
            'change .logo-design': 'logoChange',
            'change #upload_titlebar_logo_live': 'uploadFile'
        },

        initialize: function() {
            this.tpl = _.template( $('#logo-design').html() );
            this.$('.content').html( this.tpl( this.model.toJSON() ) );
            Backbone.Events.on('color:change', this.colorChange, this);

            jscolor.bind();
        },

        showPicker: function(ev) {
            var button = ev.currentTarget;
            btn = button;
            var id = $(button).data('color-picker');
            this.$('#' + id)[0].color.showPicker();
        },

        radioChange: function() {
            switch($('input:radio[name=titlebarSource]:checked').val()) {
                case 'text':
                    $('#logoText').show();
                    $('#logoImage').hide();
                    break;
                case 'image':
                    $('#logoText').hide();
                    $('#logoImage').show();
                    break;
            }
            this.logoChange( this );
        },

        colorChange: function(e) {
            var me         = this,
                txt        = $(e.valueElement),
                id         = txt.attr('id'),
                loading_id = this.showLoadingGif( id ),
                val        = txt.val(),
                css        = '';

            // Make sure the colour is in the form '#ffffff' rahter than just 'ffffff'
            if (val.indexOf('#') !== 0)
                val = '#' + val;

            switch (id) {

                case 'main_titlebar_color':
                    css = this.updateLogoColor( val, '.wx-titlebar', 'background-color' );
                    break;
                case 'main_titlebar_text_color':
                    css = this.updateLogoColor( val, '.wx-titlebar .wx-logo', 'color' );
                    break;
                case 'subtab_color':
                    css = this.updateLogoColor( val, '.wx-subtabpanel-tabbar', 'background-color' );
                    break;
                case 'subtab_text_color':
                    css = this.updateLogoColor( val, '.wx-subtabpanel-tabbar .x-tab', 'color' );
                    break;
            }

            wxApp.design.get('css').styles = styles;

            var innerParams = JSON.stringify( wxApp.design.get('css') );
            var params = { css: innerParams };

            wx.makeApiCall('design/set_css', params, function(data) {

                // Hide the load spinner.
                me.hideLoadGif( id, loading_id );

                // Re-render the advanced tab.
                wxApp.advanced.render();

                // Re-build the app
                wx.rebuildApp();
            });

            /**
             * We need to either
             * a) surround this with a "if (Wordpress)" or something similar, or
             * b) save Logo Area Colours through the API.
             */
            if ( true ) {
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
                        
                        // wx.rebuildApp();
                    },
                    error: function(v, msg) {
                        alert(msg);
                    }
                });
            }
        },

        logoChange: function(e) {
            var me = this;
            var txt = $(e.currentTarget);
            var id = txt.attr('id');

            // Show loading gif
            var loading_id = this.showLoadingGif( id );
            
            wxApp.design.get('titlebar').html  = $('#titlebar_html').val();
            wxApp.design.get('titlebar').text  = $('#titlebar_title').val();
            wxApp.design.get('titlebar').type  = $('input:radio[name=titlebarSource]:checked').val();
            wxApp.design.get('titlebar').image = $('#titlebar_logo_live').attr('src');
            
            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( wxApp.design.get('titlebar') );
            var params = { titlebar: innerParams };

            this.save( function(data) {
                me.hideLoadGif( id, loading_id );
                wx.rebuildApp();
            } );
        },

        uploadFile: function( e ) {

            var me = this,
                url = wx.pluginUrl + 'file-upload.php?upload_path=' + wx.uploadPath + '&upload_url=' + wx.uploadUrl,
                $input = $( e.currentTarget ),
                span_id = $input.attr('id').replace('upload_', '#save_image_'),
                hidden_id = $input.attr('id').replace('upload_', '#');

            $( span_id ).html('Saving...');

            $.ajax( url, {
                iframe: true,
                files: $input,
                success: function( data ) {

                    // The stupid data comes in HTML for some reason (WP only?)
                    // Strip out the HTML, and convert to json object.
                    data = data.replace(/(<([^>]+)>)/ig,"");
                    data = JSON.parse( data );
                    
                    $( hidden_id ).val( data.file_name );
                    wxApp.design.get('titlebar').image = data.file_name;

                    me.save( function(response) {
                        $('#wx-titlebar_logo_live').attr('src', data.file_name);
                        $( span_id ).html('Saved!').delay(2000).queue( function() { $(this).html('Upload image'); } );
                        wx.rebuildApp();
                    } );
                }
            } );
        },

        save:           function( callback ) {

            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( wxApp.design.get('titlebar') );
            var params = { titlebar: innerParams };

            wx.makeApiCall('design/set_titlebar', params, callback);

        },

        /*
         * Update the "Advanced CSS" of this site by either adding or editing
         * the logo colours.
         */
        updateLogoColor:    function( newColor, className, cssAttribute ) {

            var css = wxApp.design.get('css').styles || '';
            
            // Let's change the CSS class name into a proper regex search.
            // Escape periods, then look for the closing curly brace.
            var regex = className.replace( '.', '\\.' ) + '\\s*\\{';
            var index = css.search( regex );
            var endIndex = css.indexOf( '}', index );
            if ( index === -1 || endIndex === -1 ) {

                // We couldn't find the class. Let's add it!
                css += '\n\n' + className + ' {\n' +
                    this.getCssAttribute( cssAttribute, newColor ) +
                '}';
            }
            else {
                var bgColorIndex = css.indexOf( cssAttribute, index );
                alert( bgColorIndex );
                alert( endIndex );
                if ( bgColorIndex === -1 || bgColorIndex > endIndex ) {

                    // We found the class, but not the attribute.
                    // Let's add attribute!
                    var attr = this.getCssAttribute( cssAttribute, newColor );
                    css = css.substring(0, endIndex) + attr + css.substring( endIndex, css.length );
                }
                else {

                    // The attribute we're looking for is within this css rule.
                    // Let's find everything between the next : and either the next ; or }...
                    var colorStart = css.indexOf( ':', bgColorIndex );
                    var colorEnd   = css.indexOf( ';', colorStart );
                    if ( colorEnd > endIndex ) {
                        colorEnd = endIndex;
                    }
                    colorStart++;
                    colorEnd++;

                    // And then replace it with the new colour.
                    css = css.substring( 0, colorStart ) + ' ' + newColor + ';' + css.substring( colorEnd );
                }
            }

            return css;
        },

        getCssAttribute:    function( cssAttribute, value ) {
            return '  ' + cssAttribute + ': ' + value + ';\n';
        }
    });

    // Style/Advanced needs both Design and Config, so we
    // need to ensure both are loaded before creating it.
    var designFetched=false, configFetched=false;

    wxApp.design = new wxApp.Design();
    wxApp.design.fetch( function() {
        // Load the Design Views.
        wxApp.logoDesign = new wxApp.LogoDesign( {model: wxApp.design} );
        wxApp.launchSreen = new wxApp.LaunchScreen( {model: wxApp.design} );
        wxApp.installIcon = new wxApp.InstallIcon( {model: wxApp.design} );
        wxApp.customBranding = new wxApp.CustomBranding( {model: wxApp.design} );
        designFetched = true;
        if (configFetched) {
            wxApp.advanced = new wxApp.Advanced({collection: wxApp.IconFonts});
        }
    } );


    wxApp.config = new wxApp.Config();
    wxApp.config.fetch( function() {
        configFetched = true;
        if (designFetched) {
            wxApp.advanced = new wxApp.Advanced({collection: wxApp.IconFonts});
        }
    } );

    wxApp.IconFonts.fetch();

})(jQuery);
