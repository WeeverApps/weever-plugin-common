
wxApp = wxApp || {};

(function($){
    wxApp.FlickrSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#flickr-subtab-edit-template',

        setModelFromView: function(model) {
            model.set( 'content', this.$('.wx-content-radio:checked').val() );
            model.setConfig( 'url', this.$('.wx-edit-input').val() );
            return model;
        },

        initializeEvents: function() {
            this.events = _.extend({}, this.genericEvents, this.events);
        }
    });
})(jQuery);