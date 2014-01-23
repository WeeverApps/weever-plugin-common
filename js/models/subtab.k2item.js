
wxApp = wxApp || {};

(function($){
    wxApp.K2ItemSubTab = wxApp.SubTab.extend({
        default_icon_id: 28,
        allowedLayouts: ['list'],
        typeDescription: 'K2 Content',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Item',
                icon: 'e014',
                icon_id: 28,
                type: 'K2Item',
                content: 'htmlPage',
                layout: 'panel',
                config: { url: '', subtab_name: 'K2ItemSubTab' },
                helpTitle:  'Adding K2 content',
                helpBody:   '<p><b>Adding K2 content to your app</b></p>' +
                            '<p>Any K2 content you add to your app updates in real-time as you make changes.</p>' +
                            '<p><b>K2 Items</b></p>' +
                            '<p>Add specific individual K2 &lsquo;items&rsquo; to your app and arrange them in the layout of your preference.</p>'
            }
        );
}

    });

})(jQuery);