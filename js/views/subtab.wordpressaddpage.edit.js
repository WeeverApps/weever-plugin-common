
wxApp = wxApp || {};

(function($){
    wxApp.WordpressAddPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressaddpage-subtab-edit-template',

		events : {
			'click .wx-add-sms'    : 'addSmsForm',
			'click .wx-add-coupon' : 'showCouponForm',
			// Coupon events
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

			$('section.editor').show();
			$('section.coupon').hide();
			$('section.mapper').hide();

			// We have to add this .2 second delay in because otherwise the 
			// textarea reports it's width as 100px in Chrome, which causes
			// the editor to display as 100px wide.
			setTimeout( function() {
				new nicEditor({fullPanel : true}).panelInstance('wx-content-value');
			}, 200);
        },

        setModelFromView: function(model) {
            
        	var content = '',
        		name = '',
        		description = '',
        		terms = '',
        		url;

            if ( $('section.editor').is(':visible') ) {

            	// Add post info
            	name    = $( '#wx-title-value' ).val();
				content = nicEditors.findEditor('wx-content-value').nicInstances[0].getContent();
        	}
        	
        	if ( $('section.coupon').is(':visible') ) {

        		// Add coupon info
	        	if ( !name ) {
		        	name = this.$('.wx-coupon-title').val();
		        }
		        description =  this.$('.wx-coupon-description').val();
        	    terms       =  this.$('.wx-coupon-terms').val();
        	    content     += '<div class="item-page">' + this.$('.coupon-preview').html() + '</div>';

	            model.setConfig('description', description);
	            model.setConfig('terms',       terms);
        	}

        	url = this.createPage( name, content );

            model.setConfig('name',  name);
            model.setConfig('title', name);
	        model.setConfig('url',   url );
            model.set('parent_id',  null);

	        return model;

        },

        createPage: function(name, content, otherData) {

        	var pageUrl = '',
        		data = {
	        		action : 'ajaxAddNewContent',
	        		name   : name,
	        		content: content,
	        		nonce  : $('input#nonce').val()
	        	};

        	// Merge otherData with data (mostly for map stuff).
        	if ( otherData ) {
	        	for (var key in otherData) {
					if (otherData.hasOwnProperty(key)) {
						data[key] = otherData[key];
					}
				}
			}

        	jQuery.ajax({
	            type: "POST",
	            url: ajaxurl,
	            async: false,
	            data: data,
	            success: function(url) {

	            	// I'm not sure where that trailing 0 comes from, but it has to go.
	            	pageUrl = url.replace('weever_cartographer0', 'weever_cartographer');
	            },
	            error: function(v,msg) {
	                console.log(v);
	                console.log(msg);
	            }
	        });

	        return pageUrl;

        },

        addSmsForm: function() {

        	var hasSms = false,
        		// url = 'http://weeverapp.com/index.php?app=ajax&m=sms_account_info&site_key=5XRns9Uci5cVjXijSXPHKG06raoPsrOn&key=frOndL22a9OsoQGLH3Xsa3oiDooxqOkqYFMhMWB2N2SqVfOHC2yE6a4xEIzwIhi';
        	    url = 'http://weeverapp.com/index.php?app=ajax&m=sms_account_info&site_key=' + wx.siteKey + '&key=frOndL22a9OsoQGLH3Xsa3oiDooxqOkqYFMhMWB2N2SqVfOHC2yE6a4xEIzwIhi'

        	$.ajax({
			    async: false, // must be synchronous to guarantee that no tests are run before fixture is loaded
			    cache: false,
			    dataType: 'json',
			    url: url,
			    success: function(data) {
			    	console.log( data );
			    	if ( data ) {
			    		hasSms = true;
			    	}
			    },
			    fail: function(jqXHR, status, errorThrown) {
			        console.log( 'Could not determine SMS status; assuming false' );
			        hasSms = false;
			    }
			})


        	if ( hasSms ) {
	        	var content = nicEditors.findEditor('wx-content-value').nicInstances[0].getContent();
	        	content += '<p>[SMS Signup Form]</p>';
	        	nicEditors.findEditor('wx-content-value').nicInstances[0].setContent( content )
	        }
	        else {
	        	this.$('#wx-smx-not-allowed').show();
	        }
        },

        showCouponForm: function() {
        	$('section.coupon').show();
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