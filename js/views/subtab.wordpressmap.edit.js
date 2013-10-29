
wxApp = wxApp || {};

(function($){
    wxApp.WordpressMapSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressmap-subtab-edit-template',

        render: function() {
			wxApp.WordpressMapSubTabEditView.__super__.render.call( this );

			var url = this.model.get('config').url;
			$('.wx-add-wordpress-map-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-map-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-map-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);