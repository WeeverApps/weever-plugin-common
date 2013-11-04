
wxApp = wxApp || {};

(function($){
    wxApp.FeatureList = Backbone.View.extend({
        el: '#toptabs',

        initialize: function() {
            console.log('initialize feature list view');
            this.collection = new wxApp.FeatureCollection();
            this.collection.bind('add', this.addOne, this);
        },

        addOne: function(feature) {
            // We currently don't handle the 'rel' features (Coupons, Pages, and Map Locations).
            if (feature.get('rel') === '') {
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
        console.log('Account info fetched.');

        wxApp.featureList = new wxApp.FeatureList();

        // Grab the data and kick things off
        wxApp.featureList.collection.fetch({ 
            url: '../wp-content/plugins/wp_weeverapps/static/js/config/wx.featurelist.js', 
            success: function(result) { console.log('features fetched'); }, 
            error: function() { console.log('Could not load feature list.') } 
        });
    });

})(jQuery);