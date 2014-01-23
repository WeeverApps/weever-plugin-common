
wxApp = wxApp || {};

(function($){
    wxApp.K2BlogSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#k2blog-subtab-edit-template',

        render: function() {
            wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-k2-blog-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-k2-blog-select') )
                model.setConfig('url', this.$('.wx-add-k2-blog-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);