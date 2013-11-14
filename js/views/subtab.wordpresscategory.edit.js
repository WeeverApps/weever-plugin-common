
wxApp = wxApp || {};

(function($){
    wxApp.WordpressCategorySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresscategory-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-wordpress-category-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-category-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-category-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);