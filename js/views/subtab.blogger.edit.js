
wxApp = wxApp || {};

(function($){
    wxApp.BloggerSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#blogger-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('blog_url', this.$('.wx-edit-input').val());
            return model;
        }
    });
})(jQuery);