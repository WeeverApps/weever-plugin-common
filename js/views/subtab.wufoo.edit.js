
wxApp = wxApp || {};

(function($){
    wxApp.WufooSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wufoo-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('url', this.$('.wx-edit-input').val());
            if ( this.$('.wx-wufoo-api-key-input') )
                model.setConfig('apikey', this.$('.wx-wufoo-api-key-input').val());
            return model;
        }
    });
})(jQuery);