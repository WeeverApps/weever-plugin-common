
wxApp = wxApp || {};

(function($){

	var uploadUrl = '';
	switch ( wx.cms ) {
		case 'wordpress':
			uploadUrl = window.location.origin + '/wp-admin/admin-ajax.php';
			break;
		case 'joomla':
			uploadUrl = window.location.origin + '/administrator/components/com_weever/helpers/file-upload.php'; // + '?upload_path=' + wx.uploadPath + '&upload_url=' + wx.uploadUrl
			break;
		default:
			uploadUrl = wx.apiUrl + '/_google_drive/upload';
			break;
	}
	
    wxApp.FormBuilderSubTab = wxApp.SubTab.extend({
        default_icon_id: 30,
        validateFeed: false,
        typeDescription: 'AppBuilder Forms',

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
	        var feature = wxApp.featureList.collection.findWhere( { featureName: 'FormBuilder' } );

	        var allowAdvancedMode = wx.formbuilderAdvanced || 0;
	        if ( feature.get( 'options' ) && feature.get( 'options' ).allow_advanced_mode ) {
		        allowAdvancedMode = parseInt( feature.get( 'options' ).allow_advanced_mode.value );
	        }

            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
				title: 'My Form Title',
                icon: 'e074',
				tabTitle: 'Form',
				icon_id: 30,
				type: 'formbuilder',
				content: 'formbuilder',
                helpTitle:  'Support',
				layout: 'panel',
	            advancedMode: allowAdvancedMode,
				config: {
					submitButtonText: 'Submit',
                    advanced: allowAdvancedMode,
					uploadUrl: uploadUrl,
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
		    var feature = wxApp.featureList.collection.findWhere( { featureName: 'DocuSign' } );

		    var allowAdvancedMode = wx.formbuilderAdvanced || 0;
		    if ( feature.get( 'options' ) && feature.get( 'options' ).allow_advanced_mode ) {
			    allowAdvancedMode = parseInt( feature.get( 'options' ).allow_advanced_mode.value );
		    }

		    var allowDemoMode = 0;
		    if ( feature.get( 'options' ) && feature.get( 'options' ).allow_demo_mode ) {
			    allowDemoMode = parseInt( feature.get( 'options' ).allow_demo_mode.value );
		    }

		    return _.extend( {}, wxApp.FormBuilderSubTab.prototype.defaults(), {
        		config: {
			        submitButtonText: 'Tap to Review and Sign',
                    icon: 'e074',
                    advanced: allowAdvancedMode,
			        allowDemoMode: allowDemoMode,
					uploadUrl: uploadUrl,
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