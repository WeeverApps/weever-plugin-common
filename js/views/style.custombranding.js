
wxApp = wxApp || {};

(function($){
    wxApp.CustomBranding = wxApp.StyleBase.extend({
        el: '#custom_branding',
        events: {
            'click #save_load_spinner': 'saveLoadSpinner',
            'click #save_domain': 'saveDomain',
            'click a.domain': 'deleteDomain'
        },

        initialize: function() {
            this.tpl = _.template( $('#custom-branding').html() );
            this.render();
        },

        render: function() {
            this.$('.content').html( this.tpl( this.model.toJSON() ) );
        },

        saveLoadSpinner: function() {
            if ( this.$('#wx-load-spinner').length ) {
                var me = this;
                var id = 'save_load_spinner';
                var loading_id = me.showLoadingGif( id );

                wxApp.design.get('loadspinner').text = this.$('#wx-load-spinner').val();

                var innerParams = JSON.stringify( wxApp.design.get('loadspinner') );
                var params = { loadspinner: innerParams };

                wx.makeApiCall('design/set_loadspinner', params, function(data) {
                    me.hideLoadGif( id, loading_id );
                });
            }
        },

        saveDomain: function() {
            if ( !this.$('#wx-domain-map-input').length )
                return;

            // Set domain to empty array if domain is null.
            if (wxApp.design.get('domain') === null)
                wxApp.design.set('domain', []);

            var me = this;
            var id = 'wx-domain-map-input'
            var txt = $('#' + id);

            // Show loading gif
            var loading_id = this.showLoadingGif( id );
            
            var newDomain = txt.val();
            wxApp.design.get('domain').push( {domain: newDomain} );
            
            this.updateDomains( wxApp.design.get('domain'), function(data) {
                // Re-render the view.
                wxApp.customBranding.render();
                me.hideLoadGif( id, loading_id );
            });
        },

        deleteDomain: function(e) {
            e.preventDefault();
            var domainName = $( e.currentTarget ).data('id');
            var index = this.inArray( domainName, wxApp.design.get('domain') );
            if (index > -1) {
                wxApp.design.get('domain').splice(index, 1);

                this.updateDomains( wxApp.design.get('domain'), function(data) {
                    // Re-render the view.
                    wxApp.customBranding.render();
                } );
            }
        },

        inArray: function( domainName, array ) {
            var index = -1;
            for (var i = array.length - 1; i >= 0; i--) {
                if ( array[i].domain === domainName ) {
                    index = i;
                    break;
                }
            };
            return index;
        },

        updateDomains: function( domains, callback ) {
            var innerParams = JSON.stringify( domains );
            var params = { domain: innerParams };

            wx.makeApiCall('design/set_domain', params, callback);
        }
    });

})(jQuery);
