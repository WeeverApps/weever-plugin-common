
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
			var l = this.model.get('localization');
			l = l.replace(/"/g, '');
			this.model.set('localization', l);

			this.$('.content').html( this.tpl( this.model.toJSON() ) );
		},

		save: function() {
			var me = this;
			this.$('#save_advanced').html('Saving...');

			var localization = this.$('#localizations').val();
			wxApp.config.set('localization', localization);

			var innerParams = JSON.stringify( wxApp.config.get('localization') );
            var params = { localization: innerParams };

            wx.makeApiCall('config/set_localization', params, function(data) {
                me.$('#save_advanced').html('Saved!');
            });
		}
	});
})(jQuery);