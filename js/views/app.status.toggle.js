wxApp = wxApp || {};

(function($){

    wxApp.AppStatusToggle = Backbone.View.extend({
        el: '#appToggle',
        events: {
            'click #on': 'save',
            'click #off': 'save'
        },

        initialize: function() {
            this.tpl = _.template( $('#appStatusToggle').html() );
            this.render();
            this.model.bind( 'change', this.render, this );
        },

        render: function() {
            this.$el.html( this.tpl( this.model.toJSON() ) );
        },

        save: function( e ) {
            $('#status-loading').show();

            if (e.currentTarget.id == 'on') {
                app_enabled = 1;
            } else {
                app_enabled = 0;
            }

            wxApp.config.online = app_enabled;

            wx.makeApiCall('config/set_online', { online: app_enabled }, function(data) {
                
                var status = app_enabled ? 'online' : 'offline';
                $('#appStatus b').html( status );
                $('#status-loading').fadeOut();

            });
            
            jQuery.ajax({
                type: "POST",
                url: wx.ajaxurl,
                data: { 
                    task: 'save_appEnabled',
                    //nonce: jQuery('input#nonce').val(),
                    app_enabled: app_enabled
                },
                success: function(msg) {
                    console.log(msg);
                },
                error: function(v, msg) { alert(msg); }
            });
            
        }
        
    });

})($);