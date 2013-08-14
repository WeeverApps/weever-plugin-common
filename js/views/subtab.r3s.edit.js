
wxApp = wxApp || {};

(function($){
    wxApp.r3sSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#r3s-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('url', this.$('.wx-edit-input').val());
            return model;
        }
    });
})(jQuery);