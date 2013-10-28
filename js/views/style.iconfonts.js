
wxApp = wxApp || {};

(function($) {
	wxApp.IconFontsView = Backbone.View.extend({
		el: '#icon_fonts',
		events: {
			'change #font-list': 'changeFont'
		},

		initialize: function() {
			this.collection.bind('add', this.addFont, this);

			this.tpl = _.template( $('#icon-fonts').html() );
			this.render();

			$('<style id="fontstyle" type="text/css"></style>').appendTo('head');
		},

		addFont: function(font) {
			console.log('Add Font Called.');
			font = font.toJSON();

			$( '#font-list' ).append($('<option>', {
				value: font.id,
				text : font.name
			}))
		},

		changeFont: function() {
			var fontId = $('#font-list').val();
			console.log( 'Changing to font ' + fontId );
			var fontData = null;
			for (var i = 0; i < wxApp.IconFonts.length; i++) {
				fontData = wxApp.IconFonts.models[i].toJSON();
				console.log( fontData.id );
				if (fontData.id == fontId)
					break;
			};

			// var css = "@font-face { " +
			// 	"font-family: 'wxFont-T';" +
			// 	"src:" +
			// 	"	url('data:image/svg+xml;base64," + fontData.svg + "') format('svg')," +
			// 	"	url('data:application/font-woff;charset=utf-8;base64," + fontData.woff + "') format('woff'), " +
			// 	"	url('data:application/x-font-ttf;charset=utf-8;base64," + fontData.ttf + "') format('truetype'); " +
			// 	"}" +
			// 	".wxFont-1:before { font-family: 'wxFont-1'; font-size: 32px; }";

			var css = "@font-face { " +
"    font-family: 'wxFont-1'; " +
"    src: " +
"        url('data:image/svg+xml;base64," + fontData.svg + "') format('svg'), " +
"        url('data:application/font-woff;charset=utf-8;base64," + fontData.woff + "') format('woff'), " +
"        url('data:application/x-font-ttf;charset=utf-8;base64," + fontData.ttf + "') format('truetype'); " +
"} " +
".wxFont-1:before { font-family: 'wxFont-1'; font-size: 32px; } ";

			$('#fontstyle').html( css );
		},

		render: function() {

			this.$('.content').html( this.tpl(  ) );

		},

		save: function() {
			
		}
	});

	// wxApp.iconFontsView = new wxApp.IconFontsView({ collection: wxApp.IconFonts });

    // Grab the data and kick things off
    wxApp.IconFonts.fetch();

})(jQuery);