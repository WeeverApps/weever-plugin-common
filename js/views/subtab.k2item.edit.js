
wxApp = wxApp || {};

(function($){
    wxApp.K2ItemSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#k2item-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			this.$('.wx-add-k2-item-select').val( url );
			
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-k2-item-select') )
                model.setConfig('url', wx.siteDomain + this.$('.wx-add-k2-item-select').val());
            return model;
        }
    });
})(jQuery);