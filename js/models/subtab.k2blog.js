
wxApp = wxApp || {};

(function($){
    wxApp.K2BlogSubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'K2 Content',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Blog',
                icon: 'e800',
                icon_id: 5,
                type: 'K2Blog',
                content: 'html',
                layout: 'list',
                config: { subtab_name: 'K2BlogSubTab' }
            }
        );
        }
    });

})(jQuery);