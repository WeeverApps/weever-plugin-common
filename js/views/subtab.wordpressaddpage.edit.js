
wxApp = wxApp || {};

(function($){
    wxApp.WordpressAddPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressaddpage-subtab-edit-template',

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
            
			var content = nicEditors.findEditor('wx-content-value').nicInstances[0].getContent(),
        		name    = $( '#wx-title-value' ).val(),
        		url     = this.createPage( name, content );

            model.setConfig('name', name);
	        model.setConfig('url',  url );
	        model.set('title',      name);
            model.set('parent_id',  null);

	        return model;

        },

        createPage: function(name, content, otherData) {

        	var pageUrl = '',
        		data = {
	        		action: 'ajaxAddNewContent',
	        		name  : name,
	        		content: content,
	        		nonce  : $('input#nonce')
	        	};

        	// Merge otherData with data (mostly for map stuff).
        	if ( otherData ) {
	        	for (var key in otherData) {
					if (otherData.hasOwnProperty(key)) {
						data[key] = otherData[key];
					}
				}
			}
			console.log( data );
			alert('data');

        	jQuery.ajax({
	            type: "POST",
	            url: ajaxurl,
	            async: false,
	            data: {
	                action: 'ajaxAddNewContent',
	                content: content, 
	                name: name,
	                nonce: jQuery('input#nonce').val()
	            },
	            success: function(url) {
	            	// I'm not sure where that trailing 0 comes from, but it has to go.
	            	pageUrl = url.replace('weever_cartographer0', 'weever_cartographer');
	            	alert(pageUrl);
	            },
	            error: function(v,msg) {
	                console.log(v);
	                console.log(msg);
	            }
	        });

	        return pageUrl;

        }
    });
})(jQuery);