
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaProximitySubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlaproximity-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-joomla-proximity-select').val( url );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-add-joomla-proximity-select') )
                model.setConfig('url', this.$('.wx-add-joomla-proximity-select').find(':selected').val());
            return model;
        }
    });
})(jQuery);