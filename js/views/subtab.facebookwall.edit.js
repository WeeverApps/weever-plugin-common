
wxApp = wxApp || {};

(function($){
    wxApp.FacebookWallSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#facebookwall-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-social-input') )
                model.setConfig('user_id', this.$('.wx-social-input').val());
            return model;
        }
    });
})(jQuery);
