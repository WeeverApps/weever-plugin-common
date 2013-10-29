
wxApp = wxApp || {};

(function($){
    wxApp.WordpressSearchtermSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#wordpresssearchterm-subtab-edit-template',

        render: function() {
			var url = this.model.get('config').url;
			var i = url.indexOf('s=');
			var searchString = url.substr(i+2);
			this.model.get('config').search_value = _.unescape( searchString ).replace('%20', ' ');

			wxApp.WordpressSearchtermSubTabEditView.__super__.render.call( this );
        },

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('url', this.$('.wx-wordpress-siteurl').val() + '&s=' + encodeURIComponent( this.$('.wx-edit-input').val() ) );
            return model;
        }
    });
})(jQuery);