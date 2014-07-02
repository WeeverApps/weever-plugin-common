
wxApp = wxApp || {};

(function($){

    wxApp.InstallIcon = wxApp.StyleBase.extend({
        el: '#install_icon',
        events: {
            'click #save_install_icon': 'clickSave',
            'change input[name=switch-install]': 'changeSave',
            'change #file_upload': 'uploadFile'
        },

        initialize: function() {
            this.tpl = _.template( $('#install-icon').html() );
            this.$el.html( this.tpl( this.model.toJSON() ) );
        },

        clickSave: function() {
            $('#save_install_icon').html('Saving...');
            this.performSave( function(data) {
                $('#save_install_icon').html('Saved!').delay(2000).queue( function() { $(this).html('Save'); } );
            } );
        },

        changeSave: function(e) {
            this.performSave( function(data) { } );
        },

        performSave: function(callback) {
            var prompt = $('input[name=switch-install]:checked').attr('id');
            if (prompt === 'install-on')
                prompt = '1';
            else
                prompt = '0';

            wxApp.design.get('install').prompt = prompt;
            wxApp.design.get('install').name   = $('#title').val();
            wxApp.design.get('install').icon   = wx.cleanUrl( $('#wx-icon_live').attr('src') );

            this.save( callback );
        },

        uploadFile:     function(e) {
        
        	//console.log('installicon upload file');
        	//console.log(wx.pluginUrl);
        	
            var me = this,
                url = wx.pluginUrl + 'helpers/file-upload.php?upload_path=' + wx.uploadPath + '&upload_url=' + wx.uploadUrl;

            $('#save_image').html('Saving...');
			
			//console.log('install icon upload...');
			//console.log(url);
			//console.log($( e.currentTarget ));
			
            $.ajax( url, {
                iframe: true,
                files: $( e.currentTarget ),
                success: function( data ) {

                    // The stupid data comes in HTML for some reason (WP only?)
                    // Strip out the HTML, and convert to json object.
                    //console.log('success...');
                    //console.log(data);
                    
                    data = data.replace(/(<([^>]+)>)/ig,"");
                    data = JSON.parse( data );
					
					//console.log(data);
					
                    wxApp.design.get('install').icon = data.file_name;
                    me.save( function( response ) {
                        $('#save_image').html('Saved!').delay(2000).queue( function() { $(this).html('Upload image'); } );
                        $('#wx-icon_live').attr( 'src', data.file_name );
                    } );
                }
            } );

        },

        save:           function( callback ) {

            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( wxApp.design.get('install') );
            var params = { install: innerParams };

            wx.makeApiCall('design/set_install', params, callback);
        }
    });

})(jQuery);
