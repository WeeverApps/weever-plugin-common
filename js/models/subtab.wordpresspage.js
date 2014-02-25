
wxApp = wxApp || {};

(function($){
    wxApp.WordpressPageSubTab = wxApp.SubTab.extend({
        default_icon_id: 28,
        allowedLayouts: ['list'],
        typeDescription: 'Wordpress Page',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Pages',
                icon: 'e014',
                icon_id: 28,
                type: 'WordpressPage',
                content: 'htmlPage',
                layout: 'panel',
                config: { url: '', subtab_name: 'WordpressPageSubTab' },
            } );
        }

    });

    wxApp.WordpressAddPageSubTab = wxApp.WordpressPageSubTab.extend({
        validateFeed: false,
        default_icon_id: 28,
        allowedLayouts: ['list'],
        typeDescription: 'Add Page',

        defaults: function() {
            return _.extend( {}, wxApp.WordpressPageSubTab.prototype.defaults(), {
                published: 1,
                tabLayout: 'list',
                bodyContent: '',
                validateFeed: false,
                config:    { 
                    url: '', 
                    subtab_name: 'WordpressAddPageSubTab', 
                    type: 'htmlContent'
                }
            } );
        }
    });

})(jQuery);