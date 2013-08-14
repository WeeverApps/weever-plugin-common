
wxApp = wxApp || {};

(function($){
    wxApp.WordpressDirectorySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressdirectory-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-directory-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-directory-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);