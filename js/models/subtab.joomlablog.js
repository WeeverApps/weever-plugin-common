
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaBlogSubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'Joomla Content',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Blog',
                icon: 'e800',
                icon_id: 5,
                type: 'JoomlaBlog',
                content: 'html',
                layout: 'list',
                config: { subtab_name: 'JoomlaBlogSubTab' }
            }
        );
        }
    });

})(jQuery);