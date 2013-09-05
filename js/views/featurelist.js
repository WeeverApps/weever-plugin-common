
wxApp = wxApp || {};

(function($){
    wxApp.FeatureList = Backbone.View.extend({
        el: '#toptabs',

        initialize: function() {
            this.collection.bind('add', this.addOne, this);
        },

        addOne: function(tab) {
            wx.log('addOne called');
            var me = this;
            var view = new wxApp.TabView({ model: tab });
            this.$el.append( view.render().el );
            view.subTabsContainerView = new wxApp.SubTabsContainerView({ model: tab });
            view.subTabsContainerView.tabView = view;
            tab.on('destroy', function(tab) {
                wx.log('removing tab from collection');
                me.removeTabFromCollection(tab);
            });
            tab.on('change', this.refreshUiTabs, this);
            $('#listTabs').append( view.subTabsContainerView.render().el );
            this.refreshUiTabs();
        }
    });

    wxApp.featureList = new wxApp.FeatureList({ collection: wxApp.FeatureCollection() });

    // Grab the data and kick things off
    wxApp.featureList.collection.fetch({ url: '../config/wx.featurelist.js' });
})(jQuery);