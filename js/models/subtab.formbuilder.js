
wxApp = wxApp || {};

(function($){
    wxApp.FormBuilderSubTab = wxApp.SubTab.extend({
        default_icon_id: 30,
        validateFeed: false,
        buildPreview: true,
        typeDescription: 'Form Builder',

        filterAPIData: function( data ) {

        	/* The 'geo' attribute is being sent erroneously in get_tabs, and
        	 * its presence causes issues when provided to add_tabs (Undefined
        	 * property: 'latitude'). So, until Rob gets a chance to fix the 
    		 * API, we have to remove the geo attribute here.
    		 */
        	if ( typeof data.geo !== 'undefined' ) {
        		delete data.geo;
        	}

            return data;
        },

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
				title: 'My Form Title',
                icon: 'e074',
				tabTitle: 'Form',
				icon_id: 30,
				type: 'formbuilder',
				content: 'formbuilder',
				layout: 'panel',
        		buildPreview: true,
        		buttonText: 'Submit',
				config: {
					uploadUrl: window.location.origin + '/wp-admin/admin-ajax.php',
					onUpload: {
						message: 'Your upload has completed.'
					}, 
					subtab_name: 'FormBuilderSubTab',
					isDocuSign: false
				}
			});
        }
		
    });

    wxApp.DocuSignSubTab = wxApp.FormBuilderSubTab.extend({

    	defaults: function() {
            return _.extend( {}, wxApp.FormBuilderSubTab.prototype.defaults(), {
        		config: {
					uploadUrl: window.location.origin + '/wp-admin/admin-ajax.php',
					onUpload: {
						message: 'Your upload has completed.'
					}, 
					subtab_name: 'FormBuilderSubTab',
					isDocuSign: true
				}
			});
        }

    });

})(jQuery);