wxApp = wxApp || {};

(function($){

    wxApp.CouponSubTab = wxApp.SubTab.extend({
        default_icon_id: 13,
        allowedLayouts: ['list'],
        typeDescription: 'Coupon Builder',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title   : 'Coupon',
                icon_id : 13,
                content : 'htmlPage',
                layout  : 'panel',
                config: { 
                    url                  : '', 
                    subtab_name          : 'CouponSubTab',
                    title                : '',
                    description          : '',
                    barcodeText          : '',
                    termsAndConditions   : '',
                    titleBackgroundColor : '#990000',
                    titleTextColor       : '#ffffff'
                }
            } );
        }

    });
})(jQuery);