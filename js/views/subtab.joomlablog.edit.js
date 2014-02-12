
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaBlogSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlablog-subtab-edit-template',

        render: function() {
            wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-joomla-blog-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-joomla-blog-select') )
                model.setConfig('url', this.$('.wx-add-joomla-blog-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);