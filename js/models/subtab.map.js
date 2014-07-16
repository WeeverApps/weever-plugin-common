wxApp = wxApp || {};

(function($){

    wxApp.MapSubTab = wxApp.SubTab.extend({
        default_icon_id: 13,
        allowedLayouts: ['list'],
        typeDescription: 'Add Map Location',
        validateFeed: false,

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
                title   : 'Mapped Post',
                icon : 'e014',
                icon_id : 13,
                content : 'htmlMap',
                layout  : 'browser',
                config: {
                    subtab_name          : 'MapSubTab',
                }
            } );
        },

        save: function( onSaveCallback ) {
            var shouldSave = true;
            for (var i = 0; i < wxApp.Tabs.length; i++) {
                var m = wxApp.Tabs.models[i],
                    config = m.get('config');

                if ( !config ) continue;

                if ( typeof config === 'string' ) {
                    config = JSON.parse( config );
                }

                if ( config.items ) {
                    // This is the map tab that has been saved, and retrieved from the API
                    var item = config.items[0];
                    if ( item.subtab_name === 'MapSubTab' && item.url.indexOf('category_name=map') > -1 ) {
                        shouldSave = false;
                        break;
                    }
                }
                else {
                    // This is the map tab that has been recently created, and the user has not refreshed the page
                    if ( config.subtab_name === 'MapSubTab' && config.url.indexOf('category_name=map') > -1 ) {
                        shouldSave = false;
                        break;
                    }
                }
            };

            if ( shouldSave ) {
                wxApp.SubTab.prototype.save.apply(this, arguments);
            }
            else {
                onSaveCallback( false );
            }
        }

    });
})(jQuery);