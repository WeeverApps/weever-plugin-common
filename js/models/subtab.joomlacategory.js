
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaCategorySubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'Joomla Content',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Category',
                icon: 'e836',
                icon_id: 5,
                type: 'JoomlaCategory',
                content: 'html',
                layout: 'list',
                config: { subtab_name: 'JoomlaCategorySubTab' },
                helpTitle:  'Adding Joomla content',
                helpBody:   '<p><b>Adding Joomla content to your app</b></p>' +
                            '<p>Any Joomla content you add to your app updates in real-time as you make changes.</p>'

            }
        );}
    });

})(jQuery);