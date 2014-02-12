var wxApp = wxApp || {};

(function($){
    wxApp.IconFontsCollection = Backbone.Collection.extend({

    	model: wxApp.IconFont,

    	fetch: function() {
            var me = this;
            wx.makeApiCall('icons/get_public_font_names', {}, function(data) {
                if ( typeof data.fonts != 'undefined' ) {
                    for ( var i = 0; i < data.fonts.length; i++ ) {
                        var fontData = data.fonts[i];
                        // HACK ALERT: The old font, wx-legacy, should not be included as a public font.
                        // All NEW public fonts have an ID > 300,000. Let's only use them!
                        // This can probably be removed when we cut over to the v3 API, but verify with Rob first.
                        if (fontData.id < 300000) {
                            continue;
                        }

                        var font = new wxApp.IconFont( fontData );
                        me.add( font );
                    }
                }
            });
    	}

    });

    wxApp.IconFonts = new wxApp.IconFontsCollection();
})(jQuery);