
var wxApp = wxApp || {};

(function($){
    wxApp.WordpressContactsSubTab = wxApp.SubTab.extend({
        default_icon_id: 34,
        allowedLayouts: ['list'],
        typeDescription: 'Contact',
        validateFeed: false,
        allowTitleEdit: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Contact',
                icon: 'e065',
                icon_id: 34,
                type: 'wordpress-contact',
                content: 'contact',
                layout: 'panel'
            } );
        }

    });

})(jQuery);