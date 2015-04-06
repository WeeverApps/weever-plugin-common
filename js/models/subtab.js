
wxApp = wxApp || {};

(function($){
    wxApp.SubTab = wxApp.Tab.extend({
        defaults: function() {
            return {
                id: null,
                parent_id: null,
                title: '',
                tabTitle: '',
                icon_id: 1,
                icon: '',
                type: null,
                layout: null,
                tabLayout: null,
                typeDescription: '',
                published: 1,
                config: {},
                featureName: '',
                validateFeed: true,
                helpTitle: 'Help ',
                helpBody: ''
            };
        },

        typeDescription: '',

        validateFeed: true,

        allowTitleEdit: true,

        initialize: function() {
        },

		setConfig: function(key, val) {
			var config = this.getConfig();
			config[key] = val;
            try {
			    this.set('config', config);
            } catch ( e ) {

            }
		},

        deleteConfig: function(key) {
            var config = this.getConfig();
            delete config[key];
            this.set('config', config);
        },

		getConfig: function() {
			return this.get('config');
		},

        getModelName: function() {
            var retVal = false;
            // Use reverse inspection of wxApp
            for ( var name in wxApp ) {
                if ( name !== 'SubTab' && wxApp[name] == this.constructor ) {
                    retVal = name;
                    break;
                }
            }
            return retVal;
        },

        getValidateFeed: function() {
            return true;
        },

        getFeedSample: function( callback, apiUrl ) {
            var data = this.getAPIData();
            data.api_check = 1;
            data.confirm_feed = 1;

            apiUrl = apiUrl || wx.apiUrl;

            $.ajax({
                url: apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey,
                datatype: 'JSON',
                data: data,
                success: function(response) {
                    callback(response);
                }
            });
        },

        save: function( onSaveCallback ) {
            var me = this;
           
            wx.makeApiCall( 'tabs/add_tab', me.getAPIData(), function(data) {
                if ( ! me.get('id') ) {
                    me.set('id', data.tab_id);
                    Backbone.Events.trigger('tab:new', me);
                } else {
                    me.trigger('save', me);
                }

                if ( onSaveCallback ) onSaveCallback( true );
            });
        }
    });
})(jQuery);