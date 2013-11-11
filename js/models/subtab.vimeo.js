
wxApp = wxApp || {};

(function($){
    wxApp.VimeoSubTab = wxApp.SubTab.extend({
        default_icon_id: 35,
        allowedLayouts: ['list'],
        typeDescription: 'Vimeo Videos',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Vimeo',
                icon: 'e041',
                icon_id: 35,
                type: 'vimeo',
                content: 'vimeo',
                layout: 'list',
                config: { url: 'http://vimeo.com/user1234' },
                helpTitle: 'Vimeo users and channels',
                helpBody: '<p><b>Vimeo users and channels</b></p>' +
                          '<p>Adding a Vimeo user shares all videos associated with one <a target="_blank" href="http://vimeo.com">Vimeo.com</a> user account.</p>' +
                          '<p><b>Sharing specific sets of videos</b></p>' +
                          '<p>One vimeo &lsquo;user&rsquo; can have multiple &lsquo;channels&rsquo;.  Each channel includes specific collection of videos.</p>'
            }
        )
    });

})(jQuery);