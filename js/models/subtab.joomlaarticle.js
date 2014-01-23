
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaArticleSubTab = wxApp.SubTab.extend({
        default_icon_id: 28,
        allowedLayouts: ['list'],
        typeDescription: 'Joomla Content',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Article',
                icon: 'e014',
                icon_id: 28,
                type: 'JoomlaArticle',
                content: 'htmlPage',
                layout: 'panel',
                config: { url: '', subtab_name: 'JoomlaArticleSubTab' },
                helpTitle:  'Adding Joomla content',
                helpBody:   '<p><b>Adding Joomla content to your app</b></p>' +
                            '<p>Any Joomla content you add to your app updates in real-time as you make changes.</p>' +
                            '<p><b>Joomla Articles</b></p>' +
                            '<p>Add specific individual Joomla &lsquo;articles&rsquo; to your app and arrange them in the layout of your preference.</p>'
            }
        );
}

    });

})(jQuery);