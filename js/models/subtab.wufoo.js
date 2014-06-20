
var wxApp = wxApp || {};

(function($){
    wxApp.WufooSubTab = wxApp.SubTab.extend({
        default_icon_id: 30,
        allowedLayouts: ['list'],
        typeDescription: 'Wufoo Forms',

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title: 'Forms',
                icon: 'e832',
                icon_id: 30,
                type: 'wufoo',
                content: 'wufoo',
                layout: 'list',
                config: { url: 'https://USERNAME.wufoo.com', apikey: 'XXXX-XXXX-XXXX-XXXX', subtab_name: 'WufooSubTab' },
                // helpTitle:  'Adding a Wufoo Form',
                helpBody:   '<p><b>Adding a Wufoo Form</b></p>' +
                            '<p><b>Finding your Wufoo API Key</b></p>' +
                            '<p>1. Login to <a target="_blank" href="http://wufoo.com/">Wufoo.com</a> and navigate to a specific form.</p>' +
                            '<p>2. Choose the "Code" link, then click the "API Information" button.</p>' +
                            '<p><b>Wufoo Integrations</b></p>' +
                            '<p>Wufoo Forms connects to many free and paid services on the web.</p>' +
                            '<p>Connections / integrations include MailChimp, Campaign Monitor, PayPal Donations and Payments, SalesForce CRM, Freshbooks Accounting &amp; Billing, Highrise CRM and Twitter.</p>' +
                            '<p>For more information check out: <a target="_blank" href="http://wufoo.com/integrations">wufoo.com/integrations</a></p>'
            }
        );
}
    });

})(jQuery);