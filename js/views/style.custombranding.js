
wxApp = wxApp || {};

(function($){
    wxApp.CustomBranding = Backbone.View.extend({
        el: '#custom_branding',
        events: {
            'click #save_custom_branding': 'save',
            'click a.domain': 'deleteDomain'
        },

        initialize: function() {
            this.tpl = _.template( $('#custom-branding').html() );
            this.render();
        },

        render: function() {
            this.$('.content').html( this.tpl( this.model.toJSON() ) );
        },

        save: function() {
            console.log('custom branding: save clicked');

            $('#save_custom_branding').html('Saving...');

            // The 'design' methods of Open API is kinda strange... It 
            // expects top-level params to be JSON objects, and items within 
            // the top-level params to be string representations of JSON 
            // objects... Therefore, we have to 'stringify' the inner params.
            
            // Load Spinner (Powered By)
            if ( this.$('#wx-load-spinner').length ) {
                wxApp.design.get('loadspinner').text = this.$('#wx-load-spinner').val();

                var innerParams = JSON.stringify( wxApp.design.get('loadspinner') );
                var params = { loadspinner: innerParams };

                wx.makeApiCall('design/set_loadspinner', params, function(data) {
                    $('#save_custom_branding').html('Saved!');
                });
            }

            // Domain(s)
            if ( this.$('#wx-domain-map-input').length ) {
                var newDomain = this.$('#wx-domain-map-input').val();
                wxApp.design.get('domain').push( {domain: newDomain} );

                this.updateDomains( wxApp.design.get('domain'), function(data) {
                    $('#save_custom_branding').html('Saved!');

                    // Re-render the view.
                    wxApp.customBranding.render();
                });
            }

        },

        deleteDomain: function(e) {
            e.preventDefault();
            alert( $( e.currentTarget ).data('id') );
            var domainName = $( e.currentTarget ).data('id');
            var index = this.inArray( domainName, wxApp.design.get('domain') );
            alert( index );
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
