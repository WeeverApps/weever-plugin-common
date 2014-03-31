
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaArticleSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlaarticle-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('#wx-add-joomla-article-select').val( url );
			
        },

        setModelFromView: function(model) {	
        
        	console.log(wx.siteDomain);
        	//console.log($('#wx-add-joomla-article-select'));
        	//console.log($('#wx-add-joomla-article-select').val());
        	
            if ( this.$('#wx-add-joomla-article-select') && this.$('#wx-add-joomla-article-select').val() != '' )
            	if ( this.$('#wx-add-joomla-article-select').val().search(wx.siteDomain) != -1 ) {
            		console.log('you');
            		model.setConfig('url', this.$('#wx-add-joomla-article-select').val());
            	} else {
            		console.log('meiyou');
            		model.setConfig('url', wx.siteDomain + this.$('#wx-add-joomla-article-select').val());
            	}
                
            return model;
        }
    });
})(jQuery);