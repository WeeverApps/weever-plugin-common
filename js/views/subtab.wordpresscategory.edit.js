
wxApp = wxApp || {};

(function($){
    wxApp.WordpressCategorySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresscategory-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-category-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-category-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);