
wxApp = wxApp || {};

(function($){
    wxApp.FlickrSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#flickr-subtab-edit-template',

        setModelFromView: function(model) {
            model.set( 'content', this.$('.wx-content-radio:checked').val() );
            var url = this.$('.wx-edit-input').val();
            // Remove any trailing forward slashes
            // (eg, turn 'flickr.com/user/' into 'flickr.com/user')
            url = url.replace(/\/$/, '');
            model.setConfig( 'url', url );
            return model;
        },

        initializeEvents: function() {
            this.events = _.extend({}, this.genericEvents, this.events);
        }
    });
})(jQuery);