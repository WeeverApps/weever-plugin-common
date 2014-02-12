
wxApp = wxApp || {};

(function($){
    wxApp.FlickrSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#flickr-subtab-edit-template',

        setModelFromView: function(model) {
            var content = this.$('.wx-content-radio:checked').val();
            model.set( 'content', content );
            if ( content === 'flickrPhotostream' )
                model.set('layout', 'carousel');
            else
                model.set('layout', 'list');

            var url = this.$('.wx-edit-input').val();
            // Remove any trailing forward slashes
            // (eg, turn 'flickr.com/user/' into 'flickr.com/user')
            url = url.replace(/\/$/, '');
            model.setConfig( 'url', url );
            model.setConfig( 'user_id', url );
            return model;
        },

        initializeEvents: function() {
            this.events = _.extend({}, this.genericEvents, this.events);
        }
    });
})(jQuery);