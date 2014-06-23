
wxApp = wxApp || {};

(function($){
    wxApp.FeatureList = Backbone.View.extend({
        el: '#toptabs',

        initialize: function() {
            this.collection = new wxApp.FeatureCollection();
            this.collection.bind('add', this.addOne, this);
        },

        addOne: function(feature) {
            // Ensure the the CMS is either:
            // a) null (which defaults to 'all')
            // b) Set to 'all'
            // c) Present in the array Set to 'all'
            if ( feature.get('cms') == null ||
                 $.inArray( 'all',  feature.get('cms') ) === 0  || 
                 $.inArray( wx.cms, feature.get('cms') ) === 0 ) {
                var me = this;
                var view = new wxApp.FeatureView({ model: feature });
                this.$el.append( view.render().el );
            }
        }
    });

    // We need to ensure that the tiering information for the current account is set,
    // so let's make sure that's fetched prior to loading the features.
    wxApp.account = new wxApp.Account();
    wxApp.account.fetch( function() {

        // Set the app's preview url & kick off the polling.
        var tier   = parseInt( wxApp.account.get('tier_raw') ),
            domain = wxApp.account.get('site');
        domain = domain.replace('http://', '').replace('https://', '');
        domain = $('#preview-app-dialog-frame').attr('rel') + domain + '?simphone=1&cache_manifest=false';
        $('#preview-app-dialog-frame').attr('rel', domain);
        wx.poll = true;

        // Since form builder & training builder require considerably fewer features,
        // change the size of the icons.
        console.log('=== TIER ===', tier);
        if ( tier >= 100 )
            $('#toptabs').removeClass('large-block-grid-7').addClass('large-block-grid-4');

        wxApp.featureList = new wxApp.FeatureList();

	    // Grab the data and kick things off
	    wxApp.featureList.collection.fetch({
		    url: wx.apiUrl + 'features/get_features_backbone?app_key=' + wx.siteKey,
		    success: function(result) {},
		    error: function() {

                var fileName = 'wx.featurelist.js';
                if ( tier >= 200 ) {
                    fileName = 'wx.featurelist.training.js';
                }
                else if ( tier >= 100 ) {
                    fileName = 'wx.featurelist.docusign.js';
                }

			    wxApp.featureList.collection.fetch({
				    url: wx.pluginUrl + 'static/js/config/' + fileName,
				    success: function(result) {  },
				    error: function() {
					    wxApp.featureList.collection.fetch({
						    url: wx.pluginUrl + 'static/js/config/wx.featurelist.js',
						    success: function(result) {  },
						    error: function() {
							    console.log('Could not load feature list.')
						    }
					    });
				    }
			    });
		    }
	    });
    });

})(jQuery);