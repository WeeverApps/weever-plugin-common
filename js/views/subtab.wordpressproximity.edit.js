
wxApp = wxApp || {};

(function($){
    wxApp.WordpressProximitySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressproximity-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-proximity-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-proximity-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);