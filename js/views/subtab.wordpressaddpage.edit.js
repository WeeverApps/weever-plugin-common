
wxApp = wxApp || {};

(function($){
    wxApp.WordpressAddPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressaddpage-subtab-edit-template',
        editorId: '',

		events : {
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
        	var me = this,
        	    url = this.model.get('config').url;

        	if ( url ) {
        		// We're editing an existing article... Let's get the content.
        		me.loadExistingArticle( url );
        	}
        	
			wxApp.SubTabEditView.prototype.render.apply( me );

			me.$('section.post-list').hide();
			me.$('section.editor').show();
			me.$('section.coupon').hide();
			me.$('section.mapper').hide();

			// nicEdit works on IDs, not classes. Let's great a random ID.
			me.editorId = 'wx-content-' + Math.floor((Math.random()*1000000)+1).toString();
			me.$('.wx-content-editor').attr( 'id', me.editorId );

			// We have to add this .2 second delay in because otherwise the 
			// textarea reports it's width as 100px in Chrome, which causes
			// the editor to display as 100px wide.
			setTimeout( function() {
				new nicEditor({fullPanel : true}).panelInstance( me.editorId );
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
            	name    = this.$( '.wx-edit-input' ).val();
				content = nicEditors.findEditor( this.editorId ).nicInstances[0].getContent();
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

		loadExistingArticle: function( url ) {
			var me = this;

			$.getJSON( url, function( data ) {
        		var content = data.results[0].html;
        		content = $('<div/>').html( content ).contents();

        		// The content contains a div.item-page, which contains the title, h1.wx-article-title, then the rest of the content.
        		// We just want that 'rest of the content,' so we get rid of the h1, then the parent div.
        		var title = content.find('h1.wx-article-title').html;
        		content.find('h1.wx-article-title').detach();
        		content.unwrap();

        		// Add it to the nicEdit div if it's there;
        		// otherwise, add it to the textarea.
        		if ( $('div.nicEdit-main') ) {
        			$('div.nicEdit-main').html( content );
        		} else {
	        		me.$('.wx-content-editor').val( content );
	        	}
	        	me.$('')
        	} );
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

        updatePreview: function() {
        	var title       = $('.wx-coupon-title').val(),
        	    description = $('.wx-coupon-description').val()
        	    terms       = $('.wx-coupon-terms').val();

        	if ( title )       this.$('#wx_coupon_title_preview').text( title );
        	if ( description ) this.$('#wx_coupon_content_preview').text( description );
        	if ( terms )       this.$('#wx_coupon_conditions_preview').text( terms );
        },

        updateBarcode: function() {
        	var me = this,
        	    nonce = jQuery('input#nonce').val(),
        	    text = this.$('.wx-coupon-barcode').val(),
        	    model = this.model;

        	setTimeout( function() {

        		// Ensure the text hasn't chaged - We don't want to end up generating a billion friggin barcodes.
        		if ( text == me.$('.wx-coupon-barcode').val() ) {
		        	jQuery.ajax({
			            type: "POST",
			            url: ajaxurl,
			            async: false,
			            data: {
			                action: 'ajaxGetBarcode',
			                text: text,
			                nonce: nonce
			            },
			            success: function( result ){
			            	result = JSON.parse( result );
			                console.log(result);

			                if ( result.success ) {
			                	var url = result.filename;
			                	me.$('#wx_coupon_barcode_preview').html( '<img src="' + url + '" />' );
			                	model.setConfig('url', url);
			                }
			            },
			            error: function(v,msg){
			                console.log(v);
			                console.log(msg);
			            }
			        });
		        }
	        }, 500 );
        }
    });
})(jQuery);