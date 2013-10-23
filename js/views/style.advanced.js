
wxApp = wxApp || {};

(function($) {
	wxApp.Advanced = wxApp.StyleBase.extend({
		el: '#advanced',
		events: {
			'click #save_advanced': 'saveCss',
			'change #localizations': 'saveLanguage'
		},

		initialize: function() {
			this.tpl = _.template( $('#advanced-options').html() );
			this.render();
		},

		render: function() {
			// localization is surrounded by double quotes for some reason? Remove it.
			var l = wxApp.config.get('localization');
			l = l.replace(/"/g, '');
			wxApp.config.set('localization', l);

			this.$('.content').html( this.tpl( {config: wxApp.config.toJSON(), design: wxApp.design.toJSON()} ) );
		},

		saveCss: function() {
			var me = this;
			this.$('#save_advanced').html('Saving...');

			// Save CSS.
			var styles = this.$('#css_styles').val();
			wxApp.design.get('css').styles = styles;

			var innerParams = JSON.stringify( wxApp.design.get('css') );
            var params = { css: innerParams };

            wx.makeApiCall('design/set_css', params, function(data) {
                me.$('#save_advanced').html('Saved!');
                setTimeout( function() { wx.refreshAppPreview(); }, 500);
            });
        },

		saveLanguage: function() {
			var me = this;
			var id = 'localizations';
			var loading_id = this.showLoadingGif( id );

			// Save language.
			var localization = this.$('#' + id).val();
			wxApp.config.set('localization', localization);

            var params = { localization: localization };
            
            wx.makeApiCall('config/set_localization', params, function(data) {
                me.hideLoadingGif( id, loading_id );
            });
		}
	});
})(jQuery);