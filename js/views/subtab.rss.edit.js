
wxApp = wxApp || {};

(function($){
    wxApp.RSSSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#rss-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('url', this.$('.wx-edit-input').val());
            return model;
        }
    });
})(jQuery);