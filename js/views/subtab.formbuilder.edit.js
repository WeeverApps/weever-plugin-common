
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderSubTabEditView = wxApp.SubTabEditView.extend({
		previewPaneClass: 'wx-preview-form',
		buildPaneSelector: '.form-build-area',
		baseEditTplSelector: '#formbuilder-subtab-edit-template',
		hasCalledFinish: false,
		finishView: null,
		previews: null,
		controls: null,
		docusign: null,

		initializeEvents: function() {
			this.events = _.extend({}, this.genericEvents, this.events);
		},

		apiToBoolean: function( value ) {
			if ( typeof value == 'undefined' || value === false || value === 'false' || value === '0' || value === 0 ) {
				return false;
			}
			return true;
		},

		initialize: function() {
			var me = this,
				elementsJson,
				actionsJson,
				config = this.model.get( 'config' );

			// Set up config object to have properly typed properties
			// Fix because the get_tabs API is broken, and returns strings for everything in config.
			config.advanced = this.apiToBoolean( config.advanced );
			config.isDocuSign = this.apiToBoolean( config.isDocuSign );

			if ( typeof config.formElements == 'undefined' ) {
				config.formElements = new wxApp.FormBuilderCollection();
			}
			else {
				// Load currently existing form elements.
				try {
					elementsJson = JSON.parse( config.formElements );
				} catch(err) {
					elementsJson = config.formElements.toJSON();
				}

				config.formElements = new wxApp.FormBuilderCollection();

				setTimeout( function() { 
					for ( var i = 0; i < elementsJson.length; i++ ) {

						if ( elementsJson[i].control === 'div' ) {

							me.addInfoWithProperties( elementsJson[i] );

						} else if ( elementsJson[i].control === 'textarea' ) {

							me.addTextareaWithProperties( elementsJson[i] );

						} else if ( elementsJson[i].control === 'radiofieldset' ) {

							me.addRadioGroupWithProperties( elementsJson[i] );

						} else if ( elementsJson[i].control === 'checkboxfieldset' ) {

							me.addCheckboxGroupWithProperties( elementsJson[i] );

						} else if ( elementsJson[i].control === 'select' ) {

							me.addSelectWithProperties( elementsJson[i] );

						} else if ( elementsJson[i].type === 'textSlider' ) {

							me.addTextSlider( elementsJson[i] );

						} else if ( elementsJson[i].control == 'docusignSignature' ) {

							me.addDocusignSignatureWithProperties( elementsJson[i] );

						} else if ( elementsJson[i].control == 'calculation' ) {

							me.addCalculationWithProperties( elementsJson[i] );

						} else {

							me.addInput( elementsJson[i] );

						}
					}
				}, 100 );
			}

			if ( typeof config.formActions == 'undefined' ) {
				me.getDefaultFormActions();
			}
			else {
				// Load currently existing form actions.
				try {
					actionsJson = JSON.parse( config.formActions );
				} catch(err) {
					actionsJson = config.formActions.toJSON();
				}

				config.formActions = new Backbone.Collection();

				// setTimeout( function() { 
					var hasDocusign	= false,
						hasPost		= false,
						hasEmail	= false;
					for ( var i = 0; i < actionsJson.length; i++ ) {
						var action = actionsJson[i];
						if ( action.method == 'docusign' ) {
							me.docusign = me.addDocusignAction( null, action );
							hasDocusign = true;
						}
						else if ( action.method == 'post' ) {
							me.addPostAction( null, action );
							hasPost = true;
						}
						else if ( action.method == 'email' ) {
							me.addEmailAction( null, action );
							hasEmail = true;
						}
					}

					// If we don't have some of the actions, we should add them.
					// if ( !hasDocusign ) {
					// 	me.docusign = me.addDocusignAction( null, { method: 'docusign' } );
					// }

					if ( ! hasPost && config.advanced ) {
						me.addPostAction( null, { method: 'post' } );
					}

					if ( ! hasEmail &&
						( ( config.isDocuSign && config.advanced ) || ( ! config.isDocuSign ) )
						) {
						me.addEmailAction( null, { method: 'email' } );
					}
				// }, 100);
			}

			if ( typeof this.model.get( 'config' ).onUpload == 'string' ) {
				this.model.get( 'config' ).onUpload = JSON.parse( this.model.get( 'config' ).onUpload );
			}


			// Call parent's initialize() function
			wxApp.SubTabEditView.prototype.initialize.apply( this, arguments );
		},

		validate: function() {

			var me = this,
				errors = [],
				errorMessage = 'Sorry! Your form could not be saved.';

			var checkFormActions = function() {
				var success = false;

				// If the "email PDF to recipeints" checkbox is checked, make sure they've provided an email address.
				if ( $('.email-pdf-to-recipients').is(':checked') && $('.wx-form-builder-action-email').val() == '' ) {
					errors.push({
						'type': 'formActions',
						'message': 'You requested the form be emailed, however you did not specify an email address.'
					});
				}

				// If DocuSign username or password is provided,
				// both username and password must be provided.
				if ( $('.wx-form-builder-docusign-username').val() || $('.wx-form-builder-docusign-password').val() ) {
					if ( !( $('.wx-form-builder-docusign-username').val() && $('.wx-form-builder-docusign-password').val() )) {
						errors.push({
							'type'   : 'formActions',
							'message': 'Please provide both a User Name and Password for DocuSign&trade;.'
						})
					}
				}
			};

			var checkRangeAttributes = function( model ) {
				var errorType = 'rangeAttributes',
					min = model.get( 'attributes' ).get( 'min' ),
					max = model.get( 'attributes' ).get( 'max' ),
					value = model.get( 'attributes' ).get( 'value' ),
					step = model.get( 'attributes' ).get( 'step' );

				if ( model.get( 'type' ) == 'textSlider' ) {
					// @TODO this only works because a textSlider always has a minimum of 0. Be careful with it.
					var numberOfPoints = ( max - min + step ) / step;
					value = isNaN( value ) ? ( numberOfPoints / 2 ) - 0.5 : value;
					model.get( 'attributes' ).set( 'value', value );
				}

				if ( isNaN( model.get( 'attributes' ).get( 'min' ) ) ) {
					errors.push( {
						'type': errorType,
						'message': 'The Minimum value is empty on one or more of your Number Sliders.'
					} );
				}
				if ( isNaN( model.get( 'attributes' ).get( 'max' ) ) ) {
					errors.push( {
						'type': errorType,
						'message': 'The Maximum value is empty on one or more of your Number Sliders.'
					} );
				}
				if ( isNaN( model.get( 'attributes' ).get( 'value' ) ) ) {
					errors.push( {
						'type': errorType,
						'message': 'The Starting value is empty on one or more of your Number Sliders.'
					} );
				}
				if ( isNaN( model.get( 'attributes' ).get( 'step' ) ) ) {
					errors.push( {
						'type': errorType,
						'message': 'The Step value is empty on one or more of your Number Sliders.'
					} );
				}
			};

			this.model.get( 'config' ).formElements.forEach( function( formElement ) {
				if ( formElement.get( 'control' ) == 'input' && formElement.get( 'attributes' ).get( 'type' ) == 'range' ) {
					checkRangeAttributes( formElement );
				}
			} );

			checkFormActions();

			// display error messages
			if ( errors.length ) {				
				errors.forEach( function( error ) {
					errorMessage += '<br><br>' + error.message;
				} )
				var $alert = $('.alert-box.alert .message').html( errorMessage );
				$alert.parent().slideDown();
				return false;
			}

			return true;
		},

		getDefaultFormActions: function() {
			this.model.get( 'config' ).formActions = new Backbone.Collection();
			if ( ( ! this.model.get( 'config' ).isDocuSign ) ||
				this.model.get( 'advancedMode' ) ) {
				this.addEmailAction( null );
			}
            if ( this.model.get( 'advancedMode' ) ) {
                this.addPostAction( null );
            }
		},

		setModelFromView: function( model ) {

			for (var i = 0; i < model.get( 'config' ).formActions.length; i++) {
				var action = model.get( 'config' ).formActions.models[i],
				    kept = true;
				if ( action.get( 'method' ) === 'post' || action.get( 'method' ) === 'email' ) {

					// Remove from array if nothing is set.
					if ( !action.get('value') ) {
						model.get( 'config' ).formActions.remove( action );
						kept = false;
						i--;
					}

				} else {

					// DocuSign - Remove from array if nothing is set.
					if ( (typeof action.get('username') === 'undefined') || !action.get('password') ) {
						model.get( 'config' ).formActions.remove( action );
						i--;
					}
				}

				if ( kept && action.get( 'method' ) === 'post' ) {
					action.setUrl();
				}
			};

			return model;
		},

		events: {
			
			'click .wx-form-builder-add-text-input'          : 'addTextInput',
			'click .wx-form-builder-add-password-input'      : 'addPasswordInput',
			'click .wx-form-builder-add-date-input'          : 'addDateInput',
			'click .wx-form-builder-add-datetime-local-input': 'addDateTimeLocalInput',
			'click .wx-form-builder-add-email-input'         : 'addEmailInput',
			'click .wx-form-builder-add-file-input'          : 'addFileInput',
			'click .wx-form-builder-add-photo-input'         : 'addPhotoInput',
			'click .wx-form-builder-add-month-input'         : 'addMonthInput',
			'click .wx-form-builder-add-number-input'        : 'addNumberInput',
			'click .wx-form-builder-add-tel-input'           : 'addTelInput',
			'click .wx-form-builder-add-time-input'          : 'addTimeInput',
			'click .wx-form-builder-add-url-input'           : 'addUrlInput',
			'click .wx-form-builder-add-radio-group'         : 'addRadioGroup',
			'click .wx-form-builder-add-checkbox-group'      : 'addCheckboxGroup',
			'click .wx-form-builder-add-textarea'            : 'addTextarea',
			'click .wx-form-builder-add-range-input'         : 'addRangeInput',
			'click .wx-form-builder-add-text-range-input'    : 'addTextRangeInput',
			'click .wx-form-builder-add-select'              : 'addSelect',
			'click .wx-form-builder-add-info'                : 'addInfo',
			'click .wx-form-builder-add-pagebreak'           : 'addPagebreak',
			'click .wx-form-builder-add-docusign-signature'  : 'addDocusignSignature',
			'click .wx-form-builder-add-weever-signature'    : 'addWeeverSignature',
			'click .wx-form-builder-add-calculation'         : 'addCalculation',
			'keyup .submit-button-text'                      : 'updateSubmitButtonText',
			'sortable-update'                                : 'sortableUpdate',
			'change email-pdf-to-recipients'                 : 'showHideEmailInfo',
            'click .wx-continue-button'                      : 'next',
            'click .wx-back-button'                          : 'back',
			'click .wx-close-button'                         : 'closeConfirmation',
			'click .wx-close-reveal-modal'                   : 'closeConfirmation'

		},

		updateSubmitButtonText: function( ev ) {
			var $text = $( ev.currentTarget );
			this.model.get( 'config' ).submitButtonText = $text.val();

			// Update in the preview panel.
			$('.wx-validate-feed.panel button.success').text( $text.val() );
		},

		sortableUpdate: function( event, model, position ) {
			var formElements = this.model.get( 'config' ).formElements;
			formElements.remove( model );
			formElements.add( model, {at: position} );
		},

		/**
		 * Override __super__.finish()
		 */
		finish: function() {
			var hasUpload = false,
				formElements = this.model.get( 'config' ).formElements,
				formActions = this.model.get( 'config' ).formActions,

				/**
				 * Should be called using .call( this ) or .apply( this ) so that the scope remains the same
				 */
				addFinishView = function() {
					this.finishView = new wxApp.FormBuilderFinishView({
						model: this.model
					});
					this.$( this.buildPaneSelector ).append( this.finishView.render().el );
				};

			// Check for an upload element
			// Process text slider min/max/step/value
			var model = {};
			for ( var i = 0; i < formElements.length; i++ ) {
				model = formElements.at( i );
				if ( 'input' == model.get( 'control' ) && 'file' == model.get( 'attributes' ).get( 'type' ) ) {
					hasUpload = true;
				}
				else if ( 'textSlider' == model.get( 'type' ) ) {
					// Set the extra parameters for text slider.
					model.get('attributes').set('step', 1);
					model.get('attributes').set('min', 0);
					model.get('attributes').set('max', model.get('options').length - 1);
					for (var j = 0; j < model.get('options').length; j++) {
						var option = model.get('options').models[j];
						if ( option.get('attributes').attributes.checked ) {
							model.get('attributes').set('value', j);
							break;
						}
					};
				}
			}

			// Removal of the file index association prompt
			// @TODO: Make the file index association prompt clearer or something
			wxApp.SubTabEditView.prototype.finish.apply( this );
			return;

			// Call super and exit if an index has already been identified
			if ( ! hasUpload || typeof this.model.get( 'config' ).idFieldIndex == 'number' ) {
				wxApp.SubTabEditView.prototype.finish.apply( this );
				return;
			}

			// Select index
			if ( typeof this.model.get( 'config' ).idFieldIndex != 'number' && ! this.hasCalledFinish ) {
				addFinishView.apply( this );
				this.hasCalledFinish = true;
				return;
			}

			// Re-add finish view in case elements have changed
			if ( this.hasCalledFinish ) {
				this.finishView.remove();
				addFinishView.apply( this );
			}

		},

		addDocusignAction: function( event, properties ) {

			var action;
			if ( typeof properties != 'undefined' ) {
				action = this.addCustomAction( properties );
			}
			else {
				action = this.addCustomAction( {
					method : 'docusign'
				} );
			}
			return action;
		},

		addEmailAction: function( event, properties ) {
			
			var action;
			if ( typeof properties != 'undefined' ) {
				action = this.addCustomAction( properties );
			}
			else {
				action = this.addCustomAction( { method : 'email' } );
			}

			return action;
		},

		addPostAction: function( event, properties ) {
			
			var action;
			if ( typeof properties != 'undefined' ) {
				action = this.addCustomAction( properties );
			}
			else {
				action = this.addCustomAction( { method : 'post' } );
			}

			return action;
		},

		addCustomAction: function( customAction ) {
			var action = new wxApp.FormBuilderAction(),
			    me = this;

			if ( typeof customAction == 'object' ) {
				action.set( customAction );
			}

			var actionView = new wxApp.FormBuilderActionView({
				model: action
			});

			setTimeout(function() {
				me.$( '#panel-email-details' ).append( actionView.render().el );
			}, 100);

			this.model.get( 'config' ).formActions.push( action );
			return action;
		},

		addInput: function( properties ) {

			var mainProperties = {};
			var attributes = {};
			for ( var propKey in properties ) {
				if ( propKey != 'attributes' ) {
					mainProperties[propKey] = properties[propKey];
				}
				else {
					for ( var attrKey in properties[propKey] ) {
						attributes[attrKey] = properties[propKey][attrKey];
					}
				}
			}

			var input = new wxApp.FormBuilderControlInput( mainProperties );
			input.get( 'attributes' ).set( attributes );
			for ( var attrKey in attributes ) {
				input.get( 'attributes' )[attrKey] = attributes[attrKey];
			};
			
			var inputView = new wxApp.FormBuilderControlInputView({
				model: input
			});
			
			this.addControl( input, inputView );

			return input;
		},

		addTextSlider: function( properties ) {
			var mainProperties = {};
			var attributes = {};
			for ( var propKey in properties ) {
				if ( propKey != 'attributes' ) {
					mainProperties[propKey] = properties[propKey];
				}
				else {
					for ( var attrKey in properties[propKey] ) {
						attributes[attrKey] = properties[propKey][attrKey];
					}
				}
			}

			if ( typeof mainProperties['options'] === 'object' && mainProperties['options'].models ) {

				// Something weird happens when a form is created, then immediately edited.
				// The objects are a weird hybrid of Backbone models and JSON objects.
				// The below converts them into pure JSON.
				var options = [];
				for (var i = 0; i < mainProperties['options'].length; i++) {
					var option = mainProperties['options'].models[i];
					options[i] = option.toJSON();
				};
				mainProperties['options'] = options;
			}

			var input = new wxApp.FormBuilderControlTextRange( mainProperties );
			input.get( 'attributes' ).set( attributes );
			for ( var attrKey in attributes ) {
				input.get( 'attributes' )[attrKey] = attributes[attrKey];
			};

			var inputView = new wxApp.FormBuilderControlTextRangeView({
				model: input
			});

			this.addControl( input, inputView );

			if ( input.get( 'options' ).length < 1 ) {
				input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'NA' } ) );
				input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'SA' } ) );
				input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'A' } ) );
				input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'D' } ) );
				input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'SD' } ) );
			}

			return input;
		},

		addDateInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Date',
				attributes: {
					type: 'date'
				}
			});
		},

		addDateTimeLocalInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Date / Time',
				attributes: {
					type: 'datetime-local'
				}
			});
		},

		addEmailInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Email',
				showPlaceholder: true,
				multiClass: '',
				attributes: {
					type: 'email'
				}
			});
		},

		addFileInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'File upload',
				multiClass: '',
				autocompleteClass: 'hide',
				attributes: {
					type: 'file',
					accept: 'image/*'
				}
			});
		},

		addPhotoInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Photo upload',
				multiClass: '',
				autocompleteClass: 'hide',
				attributes: {
					type: 'file',
					accept: 'image/*'
				}
			});
		},

		addMonthInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Month',
				attributes: {
					type: 'month'
				}
			});
		},

		addNumberInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Number',
				minClass: '',
				maxClass: '',
				stepClass: '',
				valueClass: '',
				attributes: {
					type: 'number'
				}
			});
		},

		addPasswordInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Password',
				showPlaceholder: true,
				attributes: {
					type: 'password'
				}
			});
		},

		addRangeInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Range',
				minClass: '',
				maxClass: '',
				stepClass: '',
				valueClass: '',
				attributes: {
					type: 'range',
					min: '1.00',
					max: '5.00',
					value: '3.00',
					step: '1.00'
				}
			});
		},

		addTextRangeInput: function(ev) {
			this.addTextSlider({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Select One',
				type: 'textSlider',
				attributes: {
					type: 'range'
				}
			});
		},

		addTelInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Telephone',
				type: 'tel',
				showPlaceholder: true,
				attributes: {
					type: 'tel'
				}
			});
		},

		addTextInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Untitled',
				type: 'text',
				showPlaceholder: true,
				attributes: {
					type: 'text'
				}
			});
		},

		addTimeInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Time',
				attributes: {
					type: 'time'
				}
			});
		},

		addUrlInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'URL',
				showPlaceholder: true,
				attributes: {
					type: 'url'
				}
			});
		},

		addInfo: function( ev ) {
			this.addInfoWithProperties( { 
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim() 
			} );
		},

		addPagebreak: function( ev ) {
			var pagebreak = new wxApp.FormBuilderControl( {
				control: 'pagebreak',
				controlTitle: 'Page Break'
			} );
			var pagebreakView = new wxApp.FormBuilderControlPagebreakView({
				model: pagebreak
			});
			this.addControl( pagebreak, pagebreakView );
		},

		addInfoWithProperties: function( properties ) {

			var info = new wxApp.FormBuilderControlInfo( properties );
			var infoView = new wxApp.FormBuilderControlInfoView({
				model: info
			});

			this.addControl( info, infoView );
		},

		addDocusignSignature: function( ev ) {
			this.addDocusignSignatureWithProperties( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
		},

		addDocusignSignatureWithProperties: function( properties ) {

			var signature = new wxApp.FormBuilderControlDocusignSignature( properties ),
				sigView   = new wxApp.FormBuilderControlDocusignSignatureView({ model: signature });

			this.addControl( signature, sigView );
		},

		addWeeverSignature: function( ev ) {
			this.addWeeverSignatureWithProperties( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
		},

		addWeeverSignatureWithProperties: function( properties ) {

			var signature = new wxApp.FormBuilderControlWeeverSignature( properties ),
				sigView   = new wxApp.FormBuilderControlWeeverSignatureView({ model: signature });

			this.addControl( signature, sigView );
		},

		addTextarea: function(ev) {
			this.addTextareaWithProperties( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
		},

		addTextareaWithProperties: function( properties ) {

			var textArea = new wxApp.FormBuilderControlTextarea( properties );
			var textAreaView = new wxApp.FormBuilderControlTextareaView({
				model: textArea
			});

			this.addControl( textArea, textAreaView );
		},

		addRadioGroup: function(ev) {
			this.addRadioGroupWithProperties( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
		},

		addRadioGroupWithProperties: function( properties ) {
			var radioFieldset = new wxApp.FormBuilderControlRadioFieldset( properties );
			var radioFieldsetView = new wxApp.FormBuilderControlRadioFieldsetView({
				model: radioFieldset
			});

			this.addControl( radioFieldset, radioFieldsetView );

			var radioGroupView = new wxApp.FormBuilderControlRadioGroupView({
				collection: radioFieldset.get( 'radioGroup' ),
				previewArea: radioFieldsetView.getPreview()
			});

			radioFieldsetView.$( '.wx-form-builder-radio-fieldset' ).append( radioGroupView.render().el );

			if ( properties.radioGroup == undefined || properties.radioGroup.length == 0 ) {
				var optionA = new wxApp.FormBuilderControlRadio( { label: 'Option A' } );
				var optionB = new wxApp.FormBuilderControlRadio( { label: 'Option B' } );
				var optionC = new wxApp.FormBuilderControlRadio( { label: 'Option C' } );

				radioFieldset.get( 'radioGroup' ).add( optionA );
				radioFieldset.get( 'radioGroup' ).add( optionB );
				radioFieldset.get( 'radioGroup' ).add( optionC );
			} else {
				for ( var i = 0; i < properties.radioGroup.length; i++ ) {
					var optionJson = properties.radioGroup[i];	// JSON object coming from the API
					if ( !optionJson ) {
						optionJson = properties.radioGroup.models[i].attributes;	// Backbone object coming from the app
					}
					var option = new wxApp.FormBuilderControlRadio( optionJson );
					radioFieldset.get( 'radioGroup' ).add( option );
				};
			}
		},

		addCheckboxGroup: function(ev) {
			this.addCheckboxGroupWithProperties( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
		},

		addCheckboxGroupWithProperties: function( properties ) {
			var checkboxFieldset = new wxApp.FormBuilderControlCheckboxFieldset( properties );
			var checkboxFieldsetView = new wxApp.FormBuilderControlCheckboxFieldsetView({
				model: checkboxFieldset
			});

			this.addControl( checkboxFieldset, checkboxFieldsetView );

			var checkboxGroupView = new wxApp.FormBuilderControlCheckboxGroupView({
				collection: checkboxFieldset.get( 'checkboxGroup' ),
				previewArea: checkboxFieldsetView.getPreview()
			});

			checkboxFieldsetView.$( '.wx-form-builder-checkbox-fieldset' ).append( checkboxGroupView.render().el );

			if ( properties.checkboxGroup == undefined || properties.checkboxGroup.length == 0 ) {
				checkboxFieldset.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox({label: 'Option A'}) );
				checkboxFieldset.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox({label: 'Option B'}) );
				checkboxFieldset.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox({label: 'Option C'}) );
			} else {
				for ( var i = 0; i < properties.checkboxGroup.length; i++ ) {
					var optionJson = properties.checkboxGroup[i];	// JSON object coming from the API
					if ( !optionJson ) {
						optionJson = properties.checkboxGroup.models[i].attributes;	// Backbone object coming from the app
					}
					var option = new wxApp.FormBuilderControlCheckbox( optionJson );
					checkboxFieldset.get( 'checkboxGroup' ).add( option );
				};
			}
		},

		/**
		 * Structure:
		 * Select Model
		 *	 allowMultipleSelections
		 *	 optionCollection (current Select Group)
		 *		 model: Option
		 *
		 *		 Option Model
		 *			 (current Select Model)
		 */
		addSelect: function(ev) {
			this.addSelectWithProperties( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
		},

		addSelectWithProperties: function( properties ) {
			var select = new wxApp.FormBuilderControlSelect( properties );
			var selectView = new wxApp.FormBuilderControlSelectView({
				model: select
			});

			this.addControl( select, selectView );

			var optionGroupView = new wxApp.FormBuilderControlOptionGroupView({
				collection: select.get('optionGroup'),
				previewArea: selectView.getPreview()
			});

			// Add Option Group to Select
			selectView.$( '.wx-form-builder-select' ).append( optionGroupView.render().el );

			// Add an Option to the Option Group
			if ( properties.optionGroup == undefined || properties.optionGroup.length == 0 ) {
				select.get('optionGroup').add( new wxApp.FormBuilderControlOption( { innerText: 'Option A' } ) );
				select.get('optionGroup').add( new wxApp.FormBuilderControlOption( { innerText: 'Option B' } ) );
				select.get('optionGroup').add( new wxApp.FormBuilderControlOption( { innerText: 'Option C' } ) );
			} else {
				for ( var i = 0; i < properties.optionGroup.length; i++ ) {
					var optionJson = properties.optionGroup[i];	// JSON object coming from the API
					if ( !optionJson ) {
						optionJson = properties.optionGroup.models[i].attributes;	// Backbone object coming from the app
					}
					var optionModel = new wxApp.FormBuilderControlOption( optionJson );
					select.get('optionGroup').add( optionModel );
				};
			}
		},

		addCalculation: function( ev ) {
			
			// Before we can add a calculator, we need to ensure there is at least one numeric 
			// control in the form, with a name attribute assigned.
			var found = false,
			    formElements = this.model.get( 'config' ).formElements;
			for (var i = 0; i < formElements.length; i++) {
				var input = formElements.at(i);
				if ( input.get('attributes') && 
					 input.get('attributes').type === 'number' &&
					 input.get('attributes').attributes.name ) {
					found = true;
					break;
				}
			};

			if ( found )
				this.addCalculationWithProperties({});
			else
				alert('Please add at list one Number control with the "name" attribute set.');
		},

		addCalculationWithProperties: function( properties ) {
			var calculator = new wxApp.FormBuilderCalculator( properties );
			console.log('Creating view with: ', this.model.get( 'config' ).formElements);
			var calculatorView = new wxApp.FormBuilderCalculatorView({
				model: calculator,
				inputs: this.model.get( 'config' ).formElements
			});

			this.addControl( calculator, calculatorView );
		},

		addControl: function( input, view ) {

			var config       = this.model.get( 'config' ),
			    formElements = config.formElements,
			    ordinal      = 0,
			    advanced     = config.advanced || false;
			
			// Get the current largest ordinal
			// NOTE - The ordinal doesn't (necessarily) relate to the order of the form elements. It relates to the order in which elements were added.
			for (var i = 0; i < formElements.length; i++) {
				var model = formElements.at( i );
				if ( model.get( 'ordinal' ) > ordinal )
					ordinal = model.get( 'ordinal' );
			};
			++ordinal;

			input.set( 'ordinal', ordinal );
			view.$el.attr('id', 'wx-form-control-' + ordinal.toString());

			input.set( 'advanced', advanced );

			this.$( this.buildPaneSelector ).append( view.render().el );
			
			// Open the newly added tab.
			$('.wx-form-builder-row').removeClass('wx-active');
			view.$el.addClass('wx-active');

			formElements.push( input );
			$( this.buildPaneSelector ).foundation('reflow');

			// Now show the edit tab, if it exists.
			try {
				$('a[href="#panel-field-settings"]').click();
			} catch(e) {
				console.log(e);
			}

			// Add the view to the Controls array.
			if ( !this.controls ) {
				this.controls = [];
			}
			this.controls.push( view );

			// Add the preview to the Preview tab.
			if ( !this.previews ) {
				this.previews = [];
			}
			this.previews.push( view.getPreview() );
			$( '.' + this.previewPaneClass ).append( view.getPreview().render().el );
		},

		showHideEmailInfo: function( e ) {
			var checked = $( e.currentTarget ).is(':checked');

			if ( checked )
				$('').slideDown();
			else
				$('').slideUp();
		},

		confirmClosePopup: function( e ) {
			e.preventDefault();
			var ok = confirm( 'Are you sure you want to cancel?  Your changes have not been saved.' );
			if ( ! ok ) {
				e.stopImmediatePropagation();
				return false;
			}
		},

		closeConfirmation: function() {
			var ok = confirm( "Are you sure you want to cancel?  Your changes have not been saved." );
			if ( ok ) {
				this.$el.foundation('reveal', 'close');
			}
		},

        next: function() {
        	if ( $('.form-builder-step-one').is(':visible') ) {
            	$('.form-builder-step-one').slideUp();
            	$('.form-builder-step-two').slideDown();
            }
            else {
            	$('.form-builder-step-two').slideUp();
            	$('.form-builder-step-three').slideDown();
            }
            this.$el.foundation('reflow');
            // $( 'html, body' ).animate( { scrollTop: 0 }, 500 );
        },

        back: function() {
            $('.form-builder-step-one').slideDown();
            $('.form-builder-step-two').slideUp();
            this.$el.foundation('reflow');
            // $( 'html, body' ).animate( { scrollTop: 0 }, 500 );
        }

	});

})(jQuery);
