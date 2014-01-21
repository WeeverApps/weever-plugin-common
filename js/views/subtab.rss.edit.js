
wxApp = wxApp || {};

(function($){
    wxApp.RSSSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#rss-subtab-edit-template',

        setModelFromView: function(model) {
        	var url = this.$('.wx-edit-input').val();

            if ( url ) {
            	if ( url.indexOf('_rss2r3s') == -1 ) {
					url = 'http://weeverapp.com/api/v2/_rss2r3s/byUrl?url=' + encodeURIComponent(url);
				}
				model.setConfig("url", url);
			}
			
            return model;
        }
    });
})(jQuery);