
wxApp = wxApp || {};

(function($){
    wxApp.WordpressAddPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressaddpage-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );
			tinymce.init( { selector:'textarea.wx-content-editor' } );

			// var url = this.model.get('config').url;

   //          // Convert from page_id to wx_page_id
   //          url = url.replace( '?page_id', '?wx_page_id' );
			// $('.wx-add-wordpress-page-select').val( url );
        },

        setModelFromView: function(model) {
            
			var content = tinyMCE.activeEditor.getContent(), //{format : 'raw'}), //jQuery('#wx-add-content-editor').val(),
        		name = $( '#wx-title-value' ).val();

            model.setConfig('name',  name);
            model.set('title',       name);
            model.set('parent_id',   null);

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
	            },
	            error: function(v,msg){
	                console.log(v);
	                console.log(msg);
	            }
	        });

	        return model;

        }
    });
})(jQuery);