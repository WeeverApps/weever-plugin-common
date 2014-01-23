
wxApp = wxApp || {};

(function($){
    wxApp.K2ItemSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#k2item-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-k2-item-select').val( url );
			
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-k2-item-select') )
                model.setConfig('url', this.$('.wx-add-k2-item-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);