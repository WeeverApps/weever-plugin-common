
wxApp = wxApp || {};

(function($){
    wxApp.K2CategorySubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'K2 Content',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Category',
                icon: 'e836',
                icon_id: 5,
                type: 'K2Category',
                content: 'html',
                layout: 'list',
                config: { subtab_name: 'K2CategorySubTab' },
                helpTitle:  'Adding K2 content',
                helpBody:   '<p><b>Adding K2 content to your app</b></p>' +
                            '<p>Any K2 content you add to your app updates in real-time as you make changes.</p>'

            }
        );}
    });

})(jQuery);