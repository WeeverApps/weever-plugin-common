
wxApp = wxApp || {};

(function($){
    wxApp.InstallIcon = Backbone.View.extend({
        el: '#install_icon',
        events: {
            'click #save_install_icon': 'save'
        },

        initialize: function() {
            this.tpl = _.template( $('#install-icon').html() );
            this.$('.content').html( this.tpl( this.model.toJSON() ) );
        },

        save: function() {
            console.log('install icon: save clicked');

            $('#save_install_icon').html('Saving...');

            wxApp.design.get('install').prompt = $('#install_prompt').val();
            wxApp.design.get('install').name   = $('#title').val();
            wxApp.design.get('install').icon   = wx.cleanUrl( $('#wx-icon_live').attr('src') );

            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            var innerParams = JSON.stringify( wxApp.design.get('install') );
            var params = { install: innerParams };

            // set_launchscreen
            wx.makeApiCall('design/set_install', params, function(data) {
                $('#save_install_icon').html('Saved!');
            });
        }
    });

})(jQuery);
