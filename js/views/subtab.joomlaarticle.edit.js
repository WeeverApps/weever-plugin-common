
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaArticleSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlaarticle-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-joomla-article-select').val( url );
			
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-joomla-article-select') )
                model.setConfig('url', this.$('.wx-add-joomla-article-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);