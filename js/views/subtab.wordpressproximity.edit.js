
wxApp = wxApp || {};

(function($){
    wxApp.WordpressProximitySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpressproximity-subtab-edit-template',

        render: function() {
			wxApp.WordpressProximitySubTabEditView.__super__.render.call( this );

			var url = this.model.get('config').url;
			$('.wx-add-wordpress-proximity-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-wordpress-proximity-select') )
                model.setConfig('url', this.$('.wx-add-wordpress-proximity-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);