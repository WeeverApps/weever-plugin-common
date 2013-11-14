
wxApp = wxApp || {};

(function($){
    wxApp.WordpressDirectorySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressdirectory-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-wordpress-directory-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-directory-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-directory-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);