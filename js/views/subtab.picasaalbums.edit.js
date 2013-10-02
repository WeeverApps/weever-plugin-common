
wxApp = wxApp || {};

(function($){
    wxApp.PicasaAlbumsSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#picasaalbums-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('url', this.$('.wx-edit-input').val());
            return model;
        }
    });
})(jQuery);