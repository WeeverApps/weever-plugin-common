
wxApp = wxApp || {};

(function($){
    wxApp.VimeoSubTab = wxApp.SubTab.extend({
        default_icon_id: 35,
        allowedLayouts: ['list'],
        typeDescription: 'Vimeo',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Vimeo',
                icon_id: 35,
                type: 'vimeo',
                content: 'vimeo',
                layout: 'list',
                config: { url: 'http://vimeo.com/user1234' }
            }
        )
    });

})(jQuery);