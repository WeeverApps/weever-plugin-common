
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

        initialize: function( properties ) {
            if ( properties && properties.config ) {

                // Convert JSON strings from the API into Backbone Models
                if ( properties.config.formElements ) {
                    var formElements = this.translateFormElements( properties.config.formElements );
                    this.get('config').formElements = formElements;
                }

                if ( properties.config.formActions ) {
                    var formActions = this.translateFormActions( properties.config.formActions );
                    this.get('config').formActions = formActions;
                }

                if ( properties.config.onUpload ) {
                    if ( typeof properties.config.onUpload === 'string' )
                        this.get( 'config' ).onUpload = JSON.parse( properties.config.onUpload );
                    else
                        this.get( 'config' ).onUpload = properties.config.onUpload;
                }
            }
        },

        defaults: function() {
	        var feature = null;
            if ( wxApp.featureList ) 
                wxApp.featureList.collection.findWhere( { featureName: 'FormBuilder' } );

	        var allowAdvancedMode = wx.formbuilderAdvanced || 0;
	        if ( feature && feature.get( 'options' ) && feature.get( 'options' ).allow_advanced_mode ) {
		        allowAdvancedMode = parseInt( feature.get( 'options' ).allow_advanced_mode.value );
	        }

            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
				title: 'My Form Title',
                icon: 'e074',
				tabTitle: 'Form',
				icon_id: 30,
				type: 'formbuilder',
				content: 'formbuilder',
				layout: 'panel',
				saveToAccount: true,
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
        },

        /** START FORM ELEMENTS **/

        translateFormElements: function( json ) {
            var me = this,
                formElements = ( typeof json === 'string' ) ? JSON.parse( json ) : json,
                formElementsCollection = new wxApp.FormBuilderCollection(),
                i, element, control;


            for (i = 0; i < formElements.length; i++) {
                element = formElements[i];
                control = null;

                switch ( element.control ) {
                    case 'div':
                        control = me.createInfoBox( element );
                        break;
                    case 'textarea':
                        control = me.createTextArea( element );
                        break;
                    case 'radiofieldset':
                        control = me.createRadioFieldset( element );
                        break;
                    case 'checkboxfieldset':
                        control = me.createCheckboxFieldset( element );
                        break;
                    case 'select':
                        control = me.createSelect( element );
                        break;
                    case 'docusignSignature':
                        control = me.createDocusignSignature( element );
                        break;
                    case 'weeverSignature':
                        control = me.createWeeverSignature( element );
                        break;
                    case 'calculation':
                        control = me.createCalculator( element );
                        break;
                    case 'hierarchical-drop-down':
                        control = me.createHierarchicalDropDownList( element );
                        break;
                    case 'repeatableform':
                        control = me.createRepeatableForm( element );
                        break;
                    case 'pagebreak':
                        control = me.createPagebreak();
                        break;
                    case 'input':
                    default:
                        if ( element.type === 'textSlider' )
                            control = me.createTextSlider( element );
                        else
                            control = me.createInput( element );
                        break;
                }

                if ( control ) {
                    formElementsCollection.push( control );
                }
            }

            return formElementsCollection;
        },

        createCalculator: function( properties ) {
            var control = new wxApp.FormBuilderCalculator( properties );
            return control;
        },

        createCheckboxFieldset: function( properties ) {
            var control = new wxApp.FormBuilderControlCheckboxFieldset( properties );
            return control;
        },

        createDocusignSignature: function( properties ) {
            var control = new wxApp.FormBuilderControlDocusignSignature( properties );
            return control;
        },

        createHierarchicalDropDownList: function( properties ) {
            var control = new wxApp.FormBuilderHierarchicalDropDownList( properties );
            return control;
        },

        createInfoBox: function( properties ) {

            // Delete old, unneeded properties.
            if ( typeof properties.valueType === 'string' ) {
                delete properties.type;
                delete properties.hidePlaceholderClass;
                delete properties.showPlaceholder;
                delete properties.innerText;
                delete properties.allowAdditional;
                delete properties.allowAdditionalClass;
                delete properties.valueType;
                delete properties.valueClass;
                delete properties.minClass;
                delete properties.maxClass;
                delete properties.stepClass;
                delete properties.multiClass;
                delete properties.requiredClass;
                delete properties.autocompleteClass;
                delete properties.emailOptionClass;
                delete properties.optionSendPDF;
                delete properties.attributes;
            }

            var info = new wxApp.FormBuilderControlInfo( properties );
            return info;
        },

        createInput: function( properties ) {
            var input = new wxApp.FormBuilderControlInput( properties );
            return input;
        },

        createPagebreak: function() {
            var control = new wxApp.FormBuilderControlPagebreak();
            return control;
        },

        createRadioFieldset: function( properties ) {
            var control = new wxApp.FormBuilderControlRadioFieldset( properties );
            return control;
        },

        createRepeatableForm: function( properties ) {
            var control = new wxApp.FormBuilderRepeatableForm( properties );

            if ( properties.formElements ) {
                var formElements = this.translateFormElements( properties.formElements );
                control.set( 'formElements', formElements );
            }

            return control;
        },

        createSelect: function( properties ) {
            var control = new wxApp.FormBuilderControlSelect( properties );
            return control;
        },

        createTextArea: function( properties ) {
            // Textarea attributes are causing problems. They shouldn't even be there!
            delete properties.attributes;
            var control = new wxApp.FormBuilderControlTextarea( properties );
            return control;
        },

        createTextSlider: function( properties ) {
            var control = new wxApp.FormBuilderControlTextRange( properties );
            return control;
        },

        createWeeverSignature: function( properties ) {
            var control = new wxApp.FormBuilderControlWeeverSignature( properties );
            return control;
        },

        /** END FORM ELEMENTS **/
        /** START FORM ACTIONS **/

        translateFormActions: function( json ) {
            var me = this,
                config      = this.get('config'),
                formActions = ( typeof json === 'string' ) ? JSON.parse( json ) : json,
                formActionsCollection = new Backbone.Collection(),
                hasDocusign = false,
                hasPost     = false,
                hasEmail    = false,
                i, actionJson, actionObject;

            config.advanced   = me.apiToBoolean( config.advanced );
            config.isDocuSign = me.apiToBoolean( config.isDocuSign );

            for (i = 0; i < formActions.length; i++) {
                actionJson   = formActions[i];
                actionObject = null;

                switch ( actionJson.method ) {
                    case 'docusign':
                        hasDocusign = true;
                        actionObject = new wxApp.FormBuilderAction( actionJson );
                        break;
                    case 'post':
                        hasPost = true;
                        actionObject = new wxApp.FormBuilderAction( actionJson );
                        break;
                    case 'email':
                        hasEmail = true;
                        actionObject = new wxApp.FormBuilderAction( actionJson );
                        break;
                }

                if ( actionObject ) {
                    formActionsCollection.push( actionObject );
                }
            }

            if ( !hasPost && config.advanced ) {
                actionObject = new wxApp.FormBuilderAction( { method: 'post' } );
                formActionsCollection.push( actionObject );
            }

            if ( !hasEmail && (( config.isDocuSign && config.advanced ) || ( !config.isDocuSign ) ) ) {
                actionObject = new wxApp.FormBuilderAction( { method: 'email' } );
                formActionsCollection.push( actionObject );
            }

            return formActionsCollection;
        },


        /** END FORM ACTIONS **/

        apiToBoolean: function( value ) {
            if ( typeof value == 'undefined' || value === false || value === 'false' || value === '0' || value === 0 ) {
                return false;
            }
            return true;
        }

    });

    wxApp.DocuSignSubTab = wxApp.FormBuilderSubTab.extend({

    	defaults: function() {
		    var feature = wxApp.featureList.collection.findWhere( { featureName: 'DocuSign' } );

		    var allowAdvancedMode = wx.formbuilderAdvanced || 0;
		    if ( feature && feature.get( 'options' ) && feature.get( 'options' ).allow_advanced_mode ) {
			    allowAdvancedMode = parseInt( feature.get( 'options' ).allow_advanced_mode.value );
		    }

		    var allowDemoMode = 0;
		    if ( feature && feature.get( 'options' ) && feature.get( 'options' ).allow_demo_mode ) {
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