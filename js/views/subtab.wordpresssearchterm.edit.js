
wxApp = wxApp || {};

(function($){
    wxApp.WordpressSearchtermSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresssearchterm-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('url', this.$('.wx-wordpress-siteurl').val() + '&s=' + encodeURIComponent( this.$('.wx-edit-input').val() ) );
            return model;
        }
    });
})(jQuery);