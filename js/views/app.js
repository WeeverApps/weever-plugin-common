
wxApp = wxApp || {};

(function($){

	var escapeJSON = function( key, val ) {
		if ( typeof val !== 'string' ) {
            return val;
        }

		var replaced = encodeURIComponent( val );
		return replaced;
	};

	var toJSONrecursive = function() {
		return JSON.parse(JSON.stringify(this.attributes, escapeJSON));
	}

	var collectionToJSONrecursive = function() {
		var coll = [];
		this.models.forEach( function( model ) {
			coll.push( model.toJSONrecursive() );
		} );
		return JSON.parse(JSON.stringify(coll));
	}

	var getModelNameByTabData = function( tabData ) {
		var retVal = 'SubTab';

		// TODO: Call a function in each model to see if the type/content matches
		switch ( tabData.content ) {
			case 'contact':
				retVal = 'WordpressContactsSubTab';
				break;
			case 'facebookAlbums':
				retVal = 'FacebookAlbumsSubTab';
				break;
			case 'flickrPhotosets':
				retVal = 'FlickrSubTab';
				break;
			case 'formbuilder':
				// Ugh... It's a string, not a bool.
				if ( tabData.config.isDocuSign == 'true' )
					retVal = 'DocuSignSubTab';
				else
					retVal = 'FormBuilderSubTab';
				break;
			case 'htmlMap':
				retVal = 'MapSubTab';
				break;
			case 'htmlPage':
				if ( tabData.config && tabData.config.subtab_name )
					retVal = tabData.config.subtab_name;
				else
				{
					retVal = 'WordpressPageSubTab';
					if ( wx.cms === 'cloud' )
						retVal = 'WordpressAddPageSubTab';
				}
				break;
			case 'quiz':
				retVal = 'QuizBuilderSubTab';
				break;
			case 'twitter':
			case 'twitterUser':
				retVal = 'TwitterSubTab';
				break;
			case 'wufoo':
				retVal = 'WufooSubTab';
				break;
			case 'youtube':
			case 'youtubePlaylist':
				retVal = 'YoutubeSubTab';
				break;
			default:
				// Check against type first (more specific but only newer tabs), then content (more generic)
				if ( tabData.config != undefined && tabData.config.subtab_name != undefined ) {
					if ( tabData.config.subtab_name in wxApp ) {
						retVal = tabData.config.subtab_name;
					}
				}

				if ( 'SubTab' == retVal ) {
					for ( var obj in wxApp ) {
						if ( obj.indexOf('SubTab') != -1 &&  undefined != wxApp[obj].prototype.defaults && undefined != wxApp[obj].prototype.defaults.type ) {
							if ( wxApp[obj].prototype.defaults.type == tabData.type ) {
								retVal = obj;
								break;
							}
						}
					}
				}

				if ( 'SubTab' == retVal ) {
					for ( var obj in wxApp ) {
						if ( obj.indexOf('SubTab') != -1 &&  undefined != wxApp[obj].prototype.defaults && undefined != wxApp[obj].prototype.defaults.content ) {
							if ( wxApp[obj].prototype.defaults.content == tabData.content ) {
								retVal = obj;
								break;
							}
						}
					}
				}
		}
		return retVal;
	};

	Backbone.Collection.prototype.getModelNameByTabData = getModelNameByTabData;


//	Backbone.Model.prototype.toJSON = toJSONrecursive;
//	Backbone.Collection.prototype.toJSON = collectionToJSONrecursive;

	Backbone.Model.prototype.toJSONrecursive = toJSONrecursive;
	Backbone.Collection.prototype.toJSONrecursive = collectionToJSONrecursive;

    wxApp.App = Backbone.View.extend({
        el: '#toptabs',

        initialize: function() {
            // Backbone.Events.on( 'api:success', this.highlightAppPreviewRefresh, this );
            Backbone.Events.on( 'subtab:dragstart', this.showDropTab, this );
            Backbone.Events.on( 'subtab:dragstop', this.hideDropTab, this );
            Backbone.Events.on( 'tab:dropped', this.clearBodyStyles, this );
            Backbone.Events.on( 'tab:dropped', this.hideDropTab, this );
        },

        events: {
            'click #preview-refresh': 'refreshAppPreview'
        },

        createFeatureView: function(id, parentId) {
            if ( undefined !== wxApp[id + 'SubTab'] && undefined !== wxApp[id + 'SubTabEditView'] ) {
                var tab = new wxApp[id + 'SubTab']();

                if ( undefined != parentId && parentId )
                    tab.set( 'parent_id', parseInt( parentId ) );
                
                var view = new wxApp[id + 'SubTabEditView']({ model: tab, el: '#wx-edit-area-' + id });
            } else {
                throw new Error('Invalid type ' + id);
            }
        },

        refreshAppPreview: function() {
            console.log('Refreshing...')
            wx.refreshAppPreview();
        },

        showDropTab: function() {
            $('#dropTab').show();
            $('.wx-layout-tablist .wx-tab').addClass('dragging');
            $('#editListTabsSortable').addClass('dragging');
        },

        hideDropTab: function() {
            $('#dropTab').hide();
            $('.wx-layout-tablist .wx-tab.dragging').removeClass('dragging');
            $('#editListTabsSortable.dragging').removeClass('dragging');
        },

        clearBodyStyles: function() {
            $('body').attr('style', '');
        },

        changeFont: function(font) {
            var css = "@font-face { " +
            "    font-family: 'wxFont-1'; " +
            "    src: " +
            "        url('data:image/svg+xml;base64," + font.get('svg') + "') format('svg'), " +
            "        url('data:application/font-woff;charset=utf-8;base64," + font.get('woff') + "') format('woff'), " +
            "        url('data:application/x-font-ttf;charset=utf-8;base64," + font.get('ttf') + "') format('truetype'); " +
            "} " +
            ".wxFont-1:before { font-family: 'wxFont-1'; } ";

            $('#fontstyle').html( css );
        }
    });

    // Start app
    wxApp.appView = new wxApp.App();

    // Load the current icon font
    wx.makeApiCall('design/get_font_id', {}, function(data) {
        if ( typeof data.font_id !== 'undefined' ) {
            if ( data.font_id == 1 ) {
                // Magic numbers ahoy!
                // If this user is using wx-legacy (ID 1) for their font, we 
                // need them to upgrade. Switch them over to wx-primary (ID 300,001).
                data.font_id = 300001;
                wx.makeApiCall('design/set_font_id', { font_id: data.font_id }, function(data) { console.log('Font upgraded.') });
            }


            wxApp.font = data.font_id;
            var font = new wxApp.IconFont();
            font.fetch( data.font_id, function() {
                // Put the font on the page.
                $('<style id="fontstyle" type="text/css"></style>').appendTo('head');
                wxApp.appView.changeFont( font );
            } );
        }
    });

    // myTestModel = Backbone.Model.extend({
    //     defaults: function () {
    //         return {
    //             title: 'My Title',
    //             config: {},
    //             active: 1
    //         };
    //     }
    // })
})(jQuery);