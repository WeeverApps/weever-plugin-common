
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaContactSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlacontact-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var contact_id = this.model.get('config').contact_id;
			$('.wx-add-joomla-contact-select').val( contact_id );
        },

        setModelFromView: function(model) {
        
        	if ( this.$('.wx-add-joomla-contact-select') )
        	    model.setConfig('contact_id', this.$('.wx-add-joomla-contact-select').find(':selected').val());
        	    
        	return model;
        	
        }
    });
})(jQuery);
