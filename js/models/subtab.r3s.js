
wxApp = wxApp || {};

(function($){
    wxApp.r3sSubTab = wxApp.SubTab.extend({
        default_icon_id: 6,
        typeDescription: 'R3S Object',
        validateFeed: false,
        allowedLayouts: ['list'],

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'R3S Object',
                icon: 'e836',
                icon_id: 6,
                type: 'r3s',
                content: 'htmlR3s',
                layout: 'list',
                config: { url: 'http://yourwebsite.com/?feed=r3s' },
                helpTitle: 'What is an R3S Object?',
                helpBody: '<p><b>What is an R3S Object?</b></p>' +
                          '<p>R3S is an open source specification for streaming content from web sites, social feeds, and other sources into apps.</p>' +
                          '<p>R3S is a flexible format but is generally used in one or two different ways:</p>' +
                          '<p>1.  To stream content into an app from another web site or service (most likely with a Weever Apps plugin installed).</p>' +
                          '<p>2.  To stream content into an app from a custom application that is generating an R3S stream object.</p>' +
                          '<p>If you are a developer and are interested in utilizing R3S, please check out the <a target="_blank" href="https://github.com/WeeverApps/r3s-spec">R3S repo on GitHub</a> and <a target="_blank" href="http://support.weeverapps.com">contact us</a> for more information.</p>'
            }
        )
    });

})(jQuery);