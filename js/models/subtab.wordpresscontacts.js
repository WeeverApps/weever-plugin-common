
var wxApp = wxApp || {};

(function($){
    wxApp.WordpressContactsSubTab = wxApp.SubTab.extend({
        default_icon_id: 34,
        allowedLayouts: ['list'],
        typeDescription: 'Contact',
        validateFeed: false,
        allowTitleEdit: false,

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Contact',
                icon_id: 34,
                type: 'wordpress-contact',
                content: 'contact',
                layout: 'panel',
                config_cache: {}
            }
        ),

        filterAPIData: function( data ) {
            data.config_cache = JSON.stringify( this.get( 'config_cache' ) );
            delete data['config'];
            return data;
        }
    });

})(jQuery);