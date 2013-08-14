
wxApp = wxApp || {};

(function($){
    wxApp.WordpressBlogSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressblog-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-blog-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-blog-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);