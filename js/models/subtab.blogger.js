
wxApp = wxApp || {};

(function($){
    wxApp.BloggerSubTab = wxApp.SubTab.extend({
        default_icon_id: 7,
        allowedLayouts: ['list'],
        typeDescription: 'Blogger',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Blog',
                icon_id: 6,
                type: 'blogger',
                content: 'blogger',
                layout: 'list',
                config: { blog_url: 'http://blogname.blogger.com' }
            }
        )
    });

})(jQuery);