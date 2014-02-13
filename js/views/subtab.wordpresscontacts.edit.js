
wxApp = wxApp || {};

(function($){
    wxApp.WordpressContactsSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresscontacts-subtab-edit-template',

        setModelFromView: function(model) {
            var contact = {};
            if ( this.$('.wx-contact-input-title') )
                model.set( 'title', this.$('.wx-contact-input-title').val() );
            if ( this.$('.wx-contact-input-phone') )
                contact['telephone'] = this.$('.wx-contact-input-phone').val();
            if ( this.$('.wx-contact-input-email') )
                contact['email_to'] = this.$('.wx-contact-input-email').val();
            if ( this.$('.wx-contact-input-address') )
                contact['address'] = this.$('.wx-contact-input-address').val();
            if ( this.$('.wx-contact-input-town') )
                contact['town'] = this.$('.wx-contact-input-town').val();
            if ( this.$('.wx-contact-input-state') )
                contact['state'] = this.$('.wx-contact-input-state').val();
            if ( this.$('.wx-contact-input-country') )
                contact['country'] = this.$('.wx-contact-input-country').val();
            contact['googlemaps'] = ( this.$('.wx-contact-input-googlemaps') && this.$('.wx-contact-input-googlemaps').val() ? 1 : 0 );
            contact['emailform'] =  ( this.$('.wx-contact-input-emailform') && this.$('.wx-contact-input-emailform').val() ? 1 : 0 );
            if ( this.$('.wx-contact-input-misc') )
                contact['misc'] = this.$('.wx-contact-input-misc').val();
            if ( this.$('.wx-contact-input-image') ) {
                contact['image'] = this.$('.wx-contact-input-image').val();
                contact['showimage'] = ( contact['image'].trim() ? 1 : 0 );
            }
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