
wxApp = wxApp || {};

(function($){
    wxApp.WordpressBlogSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressblog-subtab-edit-template',

        render: function() {
			wxApp.WordpressBlogSubTabEditView.__super__.render.call( this );

			var url = this.model.get('config').url;
			$('.wx-add-wordpress-blog-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-blog-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-blog-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);