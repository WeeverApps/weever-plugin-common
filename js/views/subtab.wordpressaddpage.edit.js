
wxApp = wxApp || {};

(function($){
    wxApp.WordpressAddPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressaddpage-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			// We have to add this .2 second delay in because otherwise the 
			// textarea reports it's width as 100px in Chrome, which causes
			// the editor to display as 100px wide.
			setTimeout( function() {
				new nicEditor({fullPanel : true}).panelInstance('wx-content-value');
			}, 200);
        },

        setModelFromView: function(model) {
            
			var content = nicEditors.findEditor('wx-content-value').getContent(),
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