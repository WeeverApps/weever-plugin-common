
wxApp = wxApp || {};

(function($){
    wxApp.K2ProximitySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#k2proximity-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-k2-proximity-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-k2-proximity-select') )
                model.setConfig('url', this.$('.wx-add-k2-proximity-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);