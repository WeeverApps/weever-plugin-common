
wxApp = wxApp || {};

(function($){

    wxApp.InstallIcon = wxApp.StyleBase.extend({
        el: '#install_icon',
        events: {
            'click #save_install_icon': 'clickSave',
            'change input[name=switch-install]': 'changeSave'
        },

        initialize: function() {
            this.tpl = _.template( $('#install-icon').html() );
            this.$('.content').html( this.tpl( this.model.toJSON() ) );
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

        performSave: function(c) {
            var prompt = $('input[name=switch-install]:checked').attr('id');
            if (prompt === 'install-on')
                prompt = '1';
            else
                prompt = '0';

            wxApp.design.get('install').prompt = prompt;
            wxApp.design.get('install').name   = $('#title').val();
            wxApp.design.get('install').icon   = wx.cleanUrl( $('#wx-icon_live').attr('src') );

            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( wxApp.design.get('install') );
            var params = { install: innerParams };

            wx.makeApiCall('design/set_install', params, c);
        }
    });

})(jQuery);
