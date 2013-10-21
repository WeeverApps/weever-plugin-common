
wxApp = wxApp || {};

(function($) {
	wxApp.Advanced = Backbone.View.extend({
		el: '#advanced',
		events: {
			'click #save_advanced': 'save'
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

		save: function() {
			var me = this;
			this.$('#save_advanced').html('Saving...');

			// Save CSS.
			var styles = this.$('#css_styles').val();
			wxApp.design.get('css').styles = styles;

			var innerParams = JSON.stringify( wxApp.design.get('css') );
            var params = { css: innerParams };

            wx.makeApiCall('design/set_css', params, function(data) {
                me.$('#save_advanced').html('Saved!');
            });

			// Save language.
			var localization = this.$('#localizations').val();
			wxApp.config.set('localization', localization);

            params = { localization: localization };
            alert( params );

            wx.makeApiCall('config/set_localization', params, function(data) {
                me.$('#save_advanced').html('Saved!');
            });
		}
	});
})(jQuery);