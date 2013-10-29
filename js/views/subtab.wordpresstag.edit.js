
wxApp = wxApp || {};

(function($){
    wxApp.WordpressTagSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresstag-subtab-edit-template',

        render: function() {
			wxApp.WordpressTagSubTabEditView.__super__.render.call( this );

			var url = this.model.get('config').url;
			$('.wx-add-wordpress-tag-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-tag-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-tag-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);