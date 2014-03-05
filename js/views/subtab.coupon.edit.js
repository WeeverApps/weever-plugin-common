
wxApp = wxApp || {};

(function($){
    wxApp.CouponSubTabEditView = wxApp.WordpressAddPageSubTabEditView.extend({
        // subTabEditTplSelector: '#coupon-subtab-edit-template',
        
        render: function() {
			wxApp.WordpressAddPageSubTabEditView.prototype.render.apply( this );

			$('section.post-list').hide();
			$('section.editor').hide();
			$('section.coupon').show();
			$('section.mapper').hide();
        }
    });
})(jQuery);