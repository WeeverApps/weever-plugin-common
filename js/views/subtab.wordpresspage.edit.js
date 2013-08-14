
wxApp = wxApp || {};

(function($){
    wxApp.WordpressPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresspage-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-page-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-page-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);