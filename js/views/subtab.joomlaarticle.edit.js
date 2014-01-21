
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaArticleSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlaarticle-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			
			console.log('joomla article....');
			console.log(url);
			
            // Convert from page_id to wx_page_id
            url = url.replace( '?page_id', '?wx_page_id' );
			$('.wx-add-joomla-article-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-joomla-article-select') )
                model.setConfig('url', this.$('.wx-add-joomla-article-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);