
wxApp = wxApp || {};

(function($){
    wxApp.FacebookEventsSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#facebookevents-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-social-input') )
                model.setConfig('url', this.$('.wx-social-input').val());
            return model;
        }
    });
})(jQuery);