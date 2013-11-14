
wxApp = wxApp || {};

(function($){
    wxApp.WordpressPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresspage-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-wordpress-page-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-page-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-page-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);