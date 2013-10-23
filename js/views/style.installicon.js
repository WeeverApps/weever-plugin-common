
wxApp = wxApp || {};

(function($){

    wxApp.InstallIcon = wxApp.StyleBase.extend({
        el: '#install_icon',
        events: {
            'click #save_install_icon': 'clickSave',
            'change #install_prompt': 'changeSave'
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
            var me = this;
            var txt = $(e.currentTarget);
            var id = txt.attr('id');
            var loading_id = this.showLoadingGif( id );

            this.performSave( function(data) {
                me.hideLoadGif( id, loading_id );
            } );
        },

        performSave: function(c) {
            wxApp.design.get('install').prompt = $('#install_prompt').val();
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
