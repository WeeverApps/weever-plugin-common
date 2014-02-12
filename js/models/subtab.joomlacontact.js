
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaContactSubTab = wxApp.SubTab.extend({
        default_icon_id: 5,
        allowedLayouts: ['list'],
        typeDescription: 'Joomla Contact',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Contact',
                icon: 'e836',
                icon_id: 5,
                type: 'JoomlaContact',
                content: 'contact',
                layout: 'panel',
                config: { subtab_name: 'JoomlaContactSubTab' },
                helpTitle:  'Adding Joomla contact',
                helpBody:   '<p><b>Adding Joomla contact to your app</b></p>' +
                            '<p>Any Joomla contact you add to your app updates in real-time as you make changes.</p>'

            }
        );}
    });

})(jQuery);