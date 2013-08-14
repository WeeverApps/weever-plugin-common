
wxApp = wxApp || {};

(function($){
    wxApp.WordpressMapSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressmap-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-map-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-map-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);