
wxApp = wxApp || {};

(function($){
    wxApp.TwitterSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#twitter-subtab-edit-template',

        contentChange: function(ev) {
            wxApp.SubTabEditView.prototype.contentChange.call(this, ev);
            var placeholder = 'Search Term';
            var content = this.$('.wx-content-radio:checked').val();
            if ( 'twitterUser' === content ){
                placeholder = '@MyTwitterHandle';
            } else if ( 'twitterHashTag' === content ) {
                placeholder = '#hashtag';
            }
            $('#wx-twitter-input').attr('placeholder', placeholder);
        },

        setModelFromView: function(model) {
            var content = this.$('.wx-content-radio:checked').val();
            if ( 'twitterUser' == content ) {
                model.setConfig( 'screen_name', this.$('.wx-edit-input').val() );
                model.deleteConfig( 'q' );
            } else {
                content = 'twitter';
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