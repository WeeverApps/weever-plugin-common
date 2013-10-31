var wxApp = wxApp || {};

(function($){
    wxApp.IconFontsCollection = Backbone.Collection.extend({

    	model: wxApp.IconFont,

    	fetch: function() {
    		console.log('Get icon fonts.');
            var me = this;
            wx.makeApiCall('icons/get_public_font_names', {}, function(data) {
                if ( typeof data.fonts != 'undefined' ) {
                	console.log(data.fonts.length + ' fonts got.');
                    for ( var i = 0; i < data.fonts.length; i++ ) {
                        var fontData = data.fonts[i];

                        var font = new wxApp.IconFont( fontData );
                        me.add( font );
                    }
                }
            });
    	}

    });

    wxApp.IconFonts = new wxApp.IconFontsCollection();
})(jQuery);