
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
            wx.log('feature list addOne called');
            var me = this;
            console.log('get feature view');
            var view = new wxApp.FeatureView({ model: feature });
            console.log('attempting to render feature view');
            this.$el.append( view.render().el );
            //view.subTabsContainerView = new wxApp.SubTabsContainerView({ model: tab });
            //view.subTabsContainerView.tabView = view;
            //tab.on('destroy', function(tab) {
            //    wx.log('removing tab from collection');
            //    me.removeTabFromCollection(tab);
            //});
            //tab.on('change', this.refreshUiTabs, this);
            //$('#listTabs').append( view.subTabsContainerView.render().el );
            //this.refreshUiTabs();
        }
    });

    wxApp.featureList = new wxApp.FeatureList();

    // Grab the data and kick things off
    wxApp.featureList.collection.fetch({ url: '/wp-content/plugins/wp_weeverapps/static/js/config/wx.featurelist.js', success: function() { console.log('features fetched'); }, error: function() { console.log('Could not load feature list.') } });
})(jQuery);