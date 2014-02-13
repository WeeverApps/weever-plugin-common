
wxApp = wxApp || {};

(function($){
    wxApp.K2MapSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#k2map-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-k2-map-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-k2-map-select') )
                model.setConfig('url', this.$('.wx-add-k2-map-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);
