
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
                console.log('addONE');
                var me = this;
                var view = new wxApp.FeatureView({ model: feature });
                this.$el.append( view.render().el );
            }
        }
    });

    wxApp.featureList = new wxApp.FeatureList();

    // Grab the data and kick things off
    wxApp.featureList.collection.fetch({ 
        url: '/wp-content/plugins/wp_weeverapps/static/js/config/wx.featurelist.js', 
        success: function(result) { console.log('features fetched'); }, 
        error: function() { console.log('Could not load feature list.') } 
    });
})(jQuery);