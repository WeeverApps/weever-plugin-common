
wxApp = wxApp || {};

(function($){
    wxApp.TwitterSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#twitter-subtab-edit-template',

        setModelFromView: function(model) {
            var content = this.$('.wx-content-radio:checked').val();
            if ( 'twitterUser' == content ) {
                model.setConfig( 'screen_name', this.$('.wx-edit-input').val() );
                model.deleteConfig( 'q' );
            } else {
                model.setConfig( 'q', this.$('.wx-edit-input').val() );
                model.deleteConfig( 'screen_name' );
            }
            try {
                model.set( 'content', content );
            } catch ( e ) {
                ;
            }
            return model;
        }
    });
})(jQuery);