
wxApp = wxApp || {};

(function($){
    wxApp.VimeoSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#vimeo-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('url', this.$('.wx-edit-input').val());
            return model;
        }
    });
})(jQuery);