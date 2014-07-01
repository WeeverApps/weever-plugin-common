
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
            //console.log( 'Looking for class' + this.constructor );
            var retVal = false;
            // Use reverse inspection of wxApp
            console.log( this.get('content') );
	        console.log( this.constructor );
            for ( var name in wxApp ) {
                // console.log(name);
                if ( name !== 'SubTab' && wxApp[name] == this.constructor ) {
                    retVal = name;
                    break;
                }
            }
            console.log('Returning ' + retVal);
            return retVal;
        },

		getAPIData: function() {
			var data = this.toJSON();
			data.config = JSON.stringify(data.config);
            if ( data.id == data.parent_id )
                delete data['parent_id'];
            if ( data.id )
                data.tab_id = data.id;
			return this.filterAPIData( data );
		},

        filterAPIData: function( data ) {

            /* The 'geo' attribute is being sent erroneously in get_tabs, and
             * its presence causes issues when provided to add_tabs (Undefined
             * property: 'latitude'). So, until Rob gets a chance to fix the 
             * API, we have to remove the geo attribute here.
             *
             * More Info: The problem comes from attempting to send 'false'
             * because the API is looking for _any_ value. If it's false,
             * we delete it here.
             */
            if ( typeof data.geo !== 'undefined' ) {
                if ( ! data.geo ) {
                    delete data.geo;
                }
            }

            return data;
        },

        toJSON: function() {
            var retVal = JSON.parse(JSON.stringify(this.attributes));
            retVal.validateFeed = this.validateFeed;
            retVal.typeDescription = this.typeDescription;
            return retVal;
        },

        getValidateFeed: function() {
            return true;
        },

        save: function() {
            var me = this;
           
            wx.makeApiCall( 'tabs/add_tab', me.getAPIData(), function(data) {
                if ( ! me.get('id') ) {
                    me.set('id', data.tab_id);
                    Backbone.Events.trigger('tab:new', me);
                } else {
                    me.trigger('save', me);
                }
            });
            return true;
        }
    });
})(jQuery);