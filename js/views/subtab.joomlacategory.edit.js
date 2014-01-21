
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaCategorySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlacategory-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-joomla-category-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-joomla-category-select') )
                model.setConfig('url', this.$('.wx-add-joomla-category-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);