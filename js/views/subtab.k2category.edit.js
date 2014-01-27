
wxApp = wxApp || {};

(function($){
    wxApp.K2CategorySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#k2category-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('#wx-add-k2-category-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('#wx-add-k2-category-select') )
                model.setConfig('url', wx.siteDomain + this.$('#wx-add-k2-category-select').val());
            return model;
        }
    });
})(jQuery);