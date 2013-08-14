
wxApp = wxApp || {};

(function($){
    wxApp.WordpressTagSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresstag-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-tag-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-tag-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);