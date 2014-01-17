
wxApp = wxApp || {};

(function($){
    wxApp.WordpressAddPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressaddpage-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			// var url = this.model.get('config').url;

   //          // Convert from page_id to wx_page_id
   //          url = url.replace( '?page_id', '?wx_page_id' );
			// $('.wx-add-wordpress-page-select').val( url );
        },

        setModelFromView: function(model) {
            
			var content = 'CONTENT',//tinyMCE.activeEditor.getContent(), //{format : 'raw'}), //jQuery('#wx-add-content-editor').val(),
        		name = 'tabName';	// $('.tabname or whatever.')

            model.setConfig('type', 'htmlContent');
            model.setConfig('name', name);
            model.set('title', 'name');
            model.set('content', 'htmlPage');
            model.set('published', 1);
            model.set('parent_id', null);
            model.set('layout', 'panel');
            model.set('tabLayout', 'list');

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
	            success: function(url){
	                console.log(url);

	                model.setConfig('url', url);
	                alert('success');
	            },
	            error: function(v,msg){
	                alert('error');
	                console.log(v);
	                console.log(msg);
	            }
	        });

	        alert('done');
	        return model;

        }
    });
})(jQuery);