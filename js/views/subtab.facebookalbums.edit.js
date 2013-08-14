
wxApp = wxApp || {};

(function($){
    wxApp.FacebookAlbumsSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#facebookalbums-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-social-input') )
                model.setConfig('url', this.$('.wx-social-input').val());
            return model;
        }
    });
})(jQuery);