
wxApp = wxApp || {};

(function($) {
	wxApp.Advanced = wxApp.StyleBase.extend({
		el: '#advanced',
		events: {
			'click #save_advanced': 'saveCss',
			'change #localizations': 'saveLanguage',
			'change #font-list': 'changeFont'
		},

		initialize: function() {

			this.collection.bind('add', this.addFont, this);

			this.tpl = _.template( $('#advanced-options').html() );
			this.render();

			$('<style id="fontstyle" type="text/css"></style>').appendTo('head');
		},

		render: function() {
			// localization is surrounded by double quotes for some reason? Remove it.
			var l = wxApp.config.get('localization');
			l = l.replace(/"/g, '');
			wxApp.config.set('localization', l);

			this.$('.content').html( this.tpl( {config: wxApp.config.toJSON(), design: wxApp.design.toJSON()} ) );

			if (this.collection.length) {
				for (var i = 0; i < this.collection.length; i++) {
					var font = this.collection.models[i];
					this.addFont( font );
				};
			}
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
		},

		addFont: function(font) {
			console.log('Add Font Called.');
			font = font.toJSON();
			console.log(font);

			$( '#font-list' ).append($('<option>', {
				value: font.id,
				text : font.name
			}))
		},

		changeFont: function() {
			var fontId = $('#font-list').val();
			$('#icon-font-preview').slideUp()

			if (fontId === '-1')
				return;

			console.log( 'Changing to font ' + fontId );
			var fontData = null;
			for (var i = 0; i < wxApp.IconFonts.length; i++) {
				fontData = wxApp.IconFonts.models[i].toJSON();
				console.log( fontData.id );
				if (fontData.id == fontId)
					break;
			};

			var css = "@font-face { " +
"    font-family: 'wxFont-1'; " +
"    src: " +
"        url('data:image/svg+xml;base64," + fontData.svg + "') format('svg'), " +
"        url('data:application/font-woff;charset=utf-8;base64," + fontData.woff + "') format('woff'), " +
"        url('data:application/x-font-ttf;charset=utf-8;base64," + fontData.ttf + "') format('truetype'); " +
"} " +
".wxFont-1:before { font-family: 'wxFont-1'; font-size: 32px; } ";

			$('#fontstyle').html( css );

			$('#icon-font-preview').slideDown()
		}
	});
})(jQuery);