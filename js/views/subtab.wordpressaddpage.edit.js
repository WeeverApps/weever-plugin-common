
wxApp = wxApp || {};

(function($){
    wxApp.WordpressAddPageSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressaddpage-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			// var url = this.model.get('config').url;

   //          // Convert from page_id to wx_page_id
   //          url = url.replace( '?page_id', '?wx_page_id' );
			// $('.wx-add-wordpress-page-select').val( url );
        },

        setModelFromView: function(model) {
            // if ( this.$('.wx-add-wordpress-page-select') )
            //     model.setConfig('url', this.$('.wx-add-wordpress-page-select').find(':selected').val());
            // return model;
        }
    });
})(jQuery);