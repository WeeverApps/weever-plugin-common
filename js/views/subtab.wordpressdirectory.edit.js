
wxApp = wxApp || {};

(function($){
    wxApp.WordpressDirectorySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressdirectory-subtab-edit-template',

        render: function() {
			wxApp.WordpressDirectorySubTabEditView.__super__.render.call( this );

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