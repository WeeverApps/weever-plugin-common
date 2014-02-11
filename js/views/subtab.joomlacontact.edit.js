
wxApp = wxApp || {};

(function($){
    wxApp.JoomlaContactSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#joomlacontact-subtab-edit-template',

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var url = this.model.get('config').url;
			$('.wx-add-joomla-contact-select').val( url );
        },

        setModelFromView: function(model) {
        
        	if ( this.$('.wx-add-joomla-contact-select') )
        	    model.setConfig('url', this.$('.wx-add-joomla-contact-select').find(':selected').val());
        	
        	var contact = {};
        	var config_cache = {};
        	var contacts = [];
        	contacts.push( contact );
        	config_cache['contacts'] = contacts;
        	try {
        	    model.set( 'config_cache', config_cache );
        	} catch ( e ) {
        	    ;
        	}
        	return model;
        	
        }
    });
})(jQuery);
