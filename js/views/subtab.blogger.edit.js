
wxApp = wxApp || {};

(function($){
    wxApp.BloggerSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#blogger-subtab-edit-template',

        setModelFromView: function(model) {
            console.log('Set Model From View');
            console.log(this.$('.wx-edit-input'));
            if ( this.$('.wx-edit-input') )
                model.setConfig('blog_url', this.$('.wx-edit-input').val());
            return model;
        }
    });
})(jQuery);