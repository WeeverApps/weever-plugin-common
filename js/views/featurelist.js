wxApp = wxApp || {};

jQuery( document ).ready( function() {

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
        wxApp.featureList = new wxApp.FeatureList();

	    // Grab the data and kick things off
	    wxApp.featureList.collection.fetch({
		    url: wx.pluginUrl + 'static/js/config/wx.featurelist.dev.js',
		    success: function(result) {},
		    error: function() {
			    wxApp.featureList.collection.fetch({
				    url: wx.pluginUrl + 'static/js/config/wx.featurelist.js',
				    success: function(result) {  },
				    error: function() { console.log('Could not load feature list.') }
			    });
		    }
	    });
    });

})(jQuery);

});
