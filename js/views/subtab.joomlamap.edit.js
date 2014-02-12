
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaMapSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlamap-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-joomla-map-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-joomla-map-select') )
                model.setConfig('url', this.$('.wx-add-joomla-map-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);
