
wxApp = wxApp || {};

(function($){
    wxApp.CouponSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#coupon-subtab-edit-template',
        events : {
			'keyup .wx-coupon-title'       : 'updatePreview',
			'keyup .wx-coupon-description' : 'updatePreview',
			'keyup .wx-coupon-terms'       : 'updatePreview',
			'keyup .wx-coupon-barcode'     : 'updateBarcode'
		},

		initializeEvents: function() {
			this.events = _.extend({}, this.genericEvents, this.events);
		},

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );
        },

        setModelFromView: function(model) {
            
        	var title       = this.$('.wx-coupon-title').val(),
        	    description = this.$('.wx-coupon-description').val()
        	    terms       = this.$('.wx-coupon-terms').val(),
        	    content     = this.$('.coupon-preview').html();

        	content = '<div class="item-page">' + content + '</div>';

            model.setConfig('title',       title);
            model.setConfig('description', description);
            model.setConfig('terms',       terms);

        	jQuery.ajax({
	            type: "POST",
	            url: ajaxurl,
	            async: false,
	            data: {
	                action: 'ajaxAddNewContent',
	                content: content, 
	                name: title,
	                nonce: jQuery('input#nonce').val()
	            },
	            success: function(url){
	                console.log(url);

	                model.setConfig('url', url);
	            },
	            error: function(v,msg){
	                console.log(v);
	                console.log(msg);
	            }
	        });

	        return model;

        },

        updatePreview: function() {
        	var title       = $('.wx-coupon-title').val(),
        	    description = $('.wx-coupon-description').val()
        	    terms       = $('.wx-coupon-terms').val();

        	if ( title )       this.$('#wx_coupon_title_preview').text( title );
        	if ( description ) this.$('#wx_coupon_content_preview').text( description );
        	if ( terms )       this.$('#wx_coupon_conditions_preview').text( terms );
        },

        updateBarcode: function() {
        	var nonce = jQuery('input#nonce').val(),
        	    text = this.$('.wx-coupon-barcode').val();

        	jQuery.ajax({
	            type: "POST",
	            url: ajaxurl,
	            async: false,
	            data: {
	                action: 'ajaxGetBarcode',
	                text: text,
	                nonce: nonce
	            },
	            success: function(url){
	                console.log(url);

	                // model.setConfig('url', url);
	            },
	            error: function(v,msg){
	                console.log(v);
	                console.log(msg);
	            }
	        });
        }
    });
})(jQuery);