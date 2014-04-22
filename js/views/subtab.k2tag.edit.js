
wxApp = wxApp || {};

(function($){
    wxApp.K2TagSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#k2tag-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('#wx-add-k2-tag-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('#wx-add-k2-tag-select') )
                model.setConfig('url', wx.siteDomain + this.$('#wx-add-k2-tag-select').val());
            return model;
        }
    });
})(jQuery);