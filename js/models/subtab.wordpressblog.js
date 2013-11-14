
wxApp = wxApp || {};

(function($){
    wxApp.WordpressBlogSubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'Content: Posts',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Blog',
                icon: 'e800',
                icon_id: 5,
                type: 'WordpressBlog',
                content: 'html',
                layout: 'list',
                config: { subtab_name: 'WordpressBlogSubTab' }
            }
        );
        }
    });

})(jQuery);