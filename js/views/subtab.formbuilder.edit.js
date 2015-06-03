
wxApp = wxApp || {};

(function($){
	'use strict';

	wxApp.FormBuilderSubTabEditView = wxApp.SubTabEditView.extend({
		previewPaneClass: 'wx-main-preview-form',
		buildPaneSelector: '.form-build-area',
		baseEditTplSelector: '#formbuilder-subtab-edit-template',
		hasCalledFinish: false,
		finishView: null,
		docusign: null,
		numberControls: null,

		initializeEvents: function() {
			this.events = _.extend({}, this.genericEvents, this.events);
		},

		/**
		 * Show the "We're going to delete all your data" warning panel.
		 */
		dataCleanupOnFormEdit: function() {
			this.$('.form-builder-delete-data').show();
			this.$('.form-builder-step-one').hide();
		},

		initialize: function() {
			// var me           = this,
			//     isEditing    = false;

			this.populateForm();

			// If they're editing an existing form, warn them that their data may (will) be deleted.
			//if ( isEditing ) {
			//	me.dataCleanupOnFormEdit( me.populateForm, me, arguments );
			//}
			// Call parent's initialize() function
			wxApp.SubTabEditView.prototype.initialize.apply( this, arguments );
		},

		populateForm: function() {
			var me           = this,
				config       = this.model.get( 'config' );

			wx.isVisible = false;

			// Set up config object to have properly typed properties
			// Fix because the get_tabs API is broken, and returns strings for everything in config.

			// We use this collection to cache the Number controls for calculators.
			me.numberControls = new wxApp.FormBuilderCollection();

			$( document ).on('opened.fndtn.reveal', '[data-reveal]', function () {
				$( document ).off('opened.fndtn.reveal', '[data-reveal]');
				wx.isVisible = true;
				$( me.buildPaneSelector ).foundation('reflow');

                // Make the form preview sortable.
                $( '.wx-preview-form' ).sortable({
                    axis:  'y',
                    start: function() {
                        $( '.wx-preview-form .wx-form-preview-row' ).removeClass('wx-active');
                    },
                    stop:  function( event, ui ) {
                        ui.item.trigger( 'sortable-drop', ui.item.index() );
                    }
                });
			});

			if ( config.formElements === undefined ) {
				config.formElements = new wxApp.FormBuilderCollection();
			}
			else {

				// Load currently existing form elements.
				setTimeout( function() {
					me.drawAllElements( config.formElements );
				}, 100 );
			}

			if ( config.formActions === undefined || config.formActions.length === 0 ) {
				me.getDefaultFormActions();
			}
			else {
				// Load currently existing form actions.
				for ( var i = 0; i < config.formActions.length; i++ ) {
					var action = config.formActions.at(i);
					if ( action.get('method') === 'docusign' ) {
						me.docusign = action;
					}
					else if ( action.get('method') === 'email' ) {
						// Equivalent to calling updateAction on the email address field
						var newAction = this.__getActionByMethod( action.get('method') );
						newAction.set( 'value', action.get('value') );
					}
				}
			}
		},

		drawAllElements: function( formElements ) {
			var me = this;
			for ( var i = 0; i < formElements.length; i++ ) {
				var element = formElements.at( i );
				switch ( element.get('control') ) {
					case 'div':
						me.addInfoWithProperties( element );
						break;
					case 'textarea':
						me.addTextareaWithProperties( element );
						break;
					case 'radiofieldset':
						me.addRadioGroupWithProperties( element );
						break;
					case 'checkboxfieldset':
						me.addCheckboxGroupWithProperties( element );
						break;
					case 'select':
						me.addSelectWithProperties( element );
						break;
					case 'docusignSignature':
						me.addDocusignSignatureWithProperties( element );
						break;
					case 'weeverSignature':
						me.addWeeverSignatureWithProperties( element );
						break;
					case 'calculation':
						me.addCalculationWithProperties( element );
						break;
					case 'hierarchical-drop-down':
						me.addHierarchicalDropDownListWithProperties( element );
						break;
					case 'repeatableform':
						me.addRepeatableFormWithProperties( element );
						break;
					case 'pagebreak':
						me.addPagebreakWithProperties( element );
						break;
					default:
						if ( element.get('type') === 'textSlider' )
							me.addTextRangeInputWithProperties( element );
						else
							me.addInput( element );
				}
			}
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
						});
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
				var action = model.get( 'config' ).formActions.at(i),
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
			'click .wx-form-builder-add-hierarchical-drop-down-list': 'addHierarchicalDropDownList',
			'click .wx-form-builder-add-repeatable-form'     : 'addRepeatableForm',
			'click .wx-submit-button'                        : 'showSubmitButtonInfo',
			'keyup .submit-button-text'                      : 'updateSubmitButtonText',
			'sortable-update'                                : 'sortableUpdate',
            'click .wx-continue-button'                      : 'next',
            'click .wx-back-button'                          : 'back',
			'click .wx-close-button'                         : 'closeConfirmation',
			'click .wx-close-reveal-modal'                   : 'closeConfirmation',
			// Form action events
			'change .email-pdf-to-recipients'                : 'showHideEmailInfo',
			'change .custom-post'                            : 'showHideCustomPostInfo',
			'blur .wx-form-builder-action'                   : 'updateAction',
			'change .wx-form-builder-send-current-user-email': 'toggleSendEmailAddress',
			'keyup .wx-form-builder-pdfheader-title'         : 'updatePdfHeader',
			'keyup .wx-form-builder-pdfheader-line1'         : 'updatePdfHeader',
			'keyup .wx-form-builder-pdfheader-line2'         : 'updatePdfHeader',
			'keyup .wx-form-builder-pdfheader-line3'         : 'updatePdfHeader',
			'click .radio-mode'                              : 'updateMode',

			// Data deletion warning.
			'click .wx-dd-close-button'                      : 'closeReveal',
			'click .wx-form-builder-warning-acknowledged'    : 'acknowledgementReceived',
			'click .wx-form-builder-warning-proceed'         : 'proceed'
		},

		updateSubmitButtonText: function( ev ) {
			var $text = $( ev.currentTarget );
			this.model.get( 'config' ).submitButtonText = $text.val();

			// Update in the preview panel.
			$('.wx-validate-feed.panel button.wx-submit-button').text( $text.val() );
			this.$('span.submit-button-text').text( $text.val() );
		},

		showSubmitButtonInfo: function( ev ) {
			// Highlight the preview div.
			$('.wx-form-preview-row.wx-active').removeClass('wx-active');
			$('.wx-submit-button').parent().addClass('wx-active');

			var me          = this,
			    openControl = me.$('.wx-form-builder-row.wx-active');

		    me.$('a[href="#panel-field-settings"]').click();

			openControl.css('display', 'block');
			openControl.slideUp( 200, function() {
				openControl.removeClass( 'wx-active' );
				me.$( '.wx-button-controls' ).css('display', 'none');
				me.$( '.wx-button-controls' ).addClass( 'wx-active' );
				me.$( '.wx-button-controls' ).slideDown(200);
			});
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

		addDocusignAction: function( event, action ) {
			if ( action === undefined ) {
				action = new wxApp.FormBuilderAction( { method : 'docusign' } );
			}
			this.addCustomAction( action );

			return action;
		},

		addEmailAction: function( event, action ) {
			if ( action === undefined ) {
				action = new wxApp.FormBuilderAction( { method : 'email' } );
			}
			this.addCustomAction( action );

			return action;
		},

		addPostAction: function( event, action ) {
			if ( action === undefined ) {
				action = new wxApp.FormBuilderAction( { method : 'post' } );
			}
			this.addCustomAction( action );

			return action;
		},

		addCustomAction: function( action ) {
			this.model.get( 'config' ).formActions.push( action );
			return action;
		},

		addInput: function( input ) {
			var inputView = new wxApp.FormBuilderControlInputView({
				model: input
			});
			
			this.addControl( input, inputView );

			return input;
		},

		addDateInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Date',
				attributes: {
					type: 'date'
				}
			});
			this.addInput( input );
		},

		addDateTimeLocalInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Date / Time',
				attributes: {
					type: 'datetime-local'
				}
			});
			this.addInput( input );
		},

		addEmailInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Email',
				showPlaceholder: true,
				multiClass: '',
				emailOptionClass: '',
				attributes: {
					type: 'email'
				}
			});
			this.addInput( input );
		},

		addFileInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'File upload',
				multiClass: '',
				autocompleteClass: 'hide',
				attributes: {
					type: 'file',
					accept: 'image/*'
				}
			});
			this.addInput( input );
		},

		addPhotoInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Photo upload',
				multiClass: '',
				autocompleteClass: 'hide',
				attributes: {
					type: 'file',
					accept: 'image/*'
				}
			});
			this.addInput( input );
		},

		addMonthInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Month',
				attributes: {
					type: 'month'
				}
			});
			this.addInput( input );
		},

		addNumberInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
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
			this.addInput( input );
		},

		addPasswordInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Password',
				showPlaceholder: true,
				attributes: {
					type: 'password'
				}
			});
			this.addInput( input );
		},

		addRangeInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
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
			this.addInput( input );
		},

		addTextRangeInput: function(ev) {
			var input = new wxApp.FormBuilderControlTextRange({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Select One',
				type: 'textSlider',
				attributes: {
					type: 'range'
				}
			});
			this.addTextRangeInputWithProperties( input );
		},

		addTextRangeInputWithProperties: function( input ) {
			var inputView = new wxApp.FormBuilderControlTextRangeView({
				model: input
			});

			this.addControl( input, inputView );

			return input;
		},

		addTelInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Telephone',
				type: 'tel',
				showPlaceholder: true,
				attributes: {
					type: 'tel'
				}
			});
			this.addInput( input );
		},

		addTextInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Untitled',
				type: 'text',
				showPlaceholder: true,
				attributes: {
					type: 'text'
				}
			});
			this.addInput( input );
		},

		addTimeInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'Time',
				attributes: {
					type: 'time'
				}
			});
			this.addInput( input );
		},

		addUrlInput: function(ev) {
			var input = new wxApp.FormBuilderControlInput({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim(),
				label: 'URL',
				showPlaceholder: true,
				attributes: {
					type: 'url'
				}
			});
			this.addInput( input );
		},

		addPagebreak: function( ev ) {
			var pagebreak = new wxApp.FormBuilderControlPagebreak();
			this.addPagebreakWithProperties( pagebreak );
		},

		addPagebreakWithProperties: function( pagebreak ) {
			var pagebreakView = new wxApp.FormBuilderControlPagebreakView({
				model: pagebreak
			});
			this.addControl( pagebreak, pagebreakView );
		},

		addInfo: function( ev ) {
			var infobox = new wxApp.FormBuilderControlInfo({ 
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim() 
			});
			this.addInfoWithProperties( infobox );
		},

		addInfoWithProperties: function( info ) {
			var infoView = new wxApp.FormBuilderControlInfoView({
				model: info
			});

			this.addControl( info, infoView );
		},

		addDocusignSignature: function( ev ) {
			var signature = new wxApp.FormBuilderControlDocusignSignature ( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
			this.addDocusignSignatureWithProperties( signature );
		},

		addDocusignSignatureWithProperties: function( signature ) {
			var sigView   = new wxApp.FormBuilderControlDocusignSignatureView({ model: signature });
			this.addControl( signature, sigView );
		},

		addWeeverSignature: function( ev ) {
			var signature = new wxApp.FormBuilderControlWeeverSignature( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
			this.addWeeverSignatureWithProperties( signature );
		},

		addWeeverSignatureWithProperties: function( signature ) {
			var sigView = new wxApp.FormBuilderControlWeeverSignatureView({ model: signature });
			this.addControl( signature, sigView );
		},

		addTextarea: function(ev) {
			var textArea = new wxApp.FormBuilderControlTextarea( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
			this.addTextareaWithProperties( textArea );
		},

		addTextareaWithProperties: function( textArea ) {
			var textAreaView = new wxApp.FormBuilderControlTextareaView({
				model: textArea
			});

			this.addControl( textArea, textAreaView );
		},

		addRadioGroup: function(ev) {
			var radioFieldset = new wxApp.FormBuilderControlRadioFieldset({
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
			this.addRadioGroupWithProperties( radioFieldset );
		},

		addRadioGroupWithProperties: function( radioFieldset ) {
			var radioFieldsetView = new wxApp.FormBuilderControlRadioFieldsetView({
				model: radioFieldset
			});
			this.addControl( radioFieldset, radioFieldsetView );
		},

		addCheckboxGroup: function(ev) {
			var checkboxFieldset = new wxApp.FormBuilderControlCheckboxFieldset( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
			this.addCheckboxGroupWithProperties( checkboxFieldset );
		},

		addCheckboxGroupWithProperties: function( checkboxFieldset ) {
			var checkboxFieldsetView = new wxApp.FormBuilderControlCheckboxFieldsetView({
				model: checkboxFieldset
			});
			this.addControl( checkboxFieldset, checkboxFieldsetView );
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
			var select = new wxApp.FormBuilderControlSelect( {
				controlTitle: $(ev.currentTarget).children('.wx-button-label').text().trim()
			} );
			this.addSelectWithProperties( select );
		},

		addSelectWithProperties: function( select ) {
			var selectView = new wxApp.FormBuilderControlSelectView({
				model: select
			});

			this.addControl( select, selectView );

			
		},

		addCalculation: function( ev ) {
			
			// Before we can add a calculator, we need to ensure there is at 
			// least one numeric control in the form.
			if ( this.numberControls.length ) {
				var calculator = new wxApp.FormBuilderCalculator();
				this.addCalculationWithProperties( calculator );
			}
			else {
				alert('Please add at least one number field.');
			}
		},

		addCalculationWithProperties: function( calculator ) {
			var calculatorView = new wxApp.FormBuilderCalculatorView({
				model: calculator,
				inputs: this.numberControls
			});
			this.addControl( calculator, calculatorView );
		},

		addHierarchicalDropDownList: function( ev ) {
            var defaults = {},
                model    = new wxApp.FormBuilderHierarchicalDropDownList( defaults );
			this.addHierarchicalDropDownListWithProperties( model );
		},

		addHierarchicalDropDownListWithProperties: function( model ) {
			var view  = new wxApp.FormBuilderHierarchicalDropDownListView({
		    	model: model
			});
		    this.addControl( model, view );
		},

		addRepeatableForm: function( ev ) {
			var model = new wxApp.FormBuilderRepeatableForm( {} );
			this.addRepeatableFormWithProperties( model );
		},

		addRepeatableFormWithProperties: function( model ) {
			var me = this,
			    view = new wxApp.FormBuilderRepeatableFormView( { model: model } );
			me.addControl( model, view );

			me.$('.add-element-to-form').append('<option value="' + model.get('ordinal') + '">&mdash; ' + model.get('label') + '</option>');

			if ( model.get('formElements') ) {
				// setTimeout(function() {
					console.log('drawAllElements', model.get('formElements'));
					me.$('.add-element-to-form').val( model.get('ordinal') );
					me.drawAllElements( model.get('formElements') );
					me.$('.add-element-to-form').val('');
				// }, 1000);
			}
			else {
				me.$('.add-element-to-form').val( model.get('ordinal') );
			}

			$('.add-element-ddl-container').show();
		},

		addControl: function( input, view ) {

			var me           = this,
			    config       = this.model.get( 'config' ),
			    formElements = config.formElements,
			    ordinal      = input.get('ordinal'),
			    advanced     = config.advanced || false,
			    flowed       = false,
			    subformId    = parseInt( me.$('.add-element-to-form').val() ),
			    previewPane  = '.' + this.previewPaneClass;

			if ( subformId ) {
				for (var i = 0; i < formElements.length; i++) {
					var model = formElements.at( i );
					if ( model.get( 'ordinal' ) === subformId ) {
						formElements = model.get( 'formElements' );
						previewPane  = '.subform-' + model.get( 'ordinal' ) + '-preview-form';
						break;
					}
				};
			}

			if ( !ordinal ) {
				ordinal = me._getLargestOrdinal( config.formElements );
				input.set( 'ordinal', ++ordinal );
			}

			// Remove any existing wx-form-control-[ordinal] classes
			view.$el.removeClass(function(index, css) {
				return (css.match (/\bwx-form-control-\S+/g) || []).join(' ');
			});
			view.$el.addClass( 'wx-form-control-' + ordinal.toString() );

			input.set( 'advanced', advanced );

			this.$( this.buildPaneSelector ).append( view.render().el );
			
			// Hide the current control & show the new control.
			$('.wx-form-builder-row.wx-active').removeClass('wx-active').css('display', 'none');
			$('.wx-form-preview-row.wx-active').removeClass('wx-active');
			view.$el.addClass('wx-active').css('display', 'block');

			if ( wx.isVisible )
				formElements.push( input );

			// Add number fields and calculations to the numberControls array.
			if (( input.get( 'attributes' ) && input.get( 'attributes' ).get('type') === 'number' ) ||
				( input.get( 'control' ) === 'calculation' )) {
				this.numberControls.push( input );
			}

			// If the reveal is visible, we reflow everything and open the 'Field Settings' panel.
			if ( wx.isVisible ) {
				$( me.buildPaneSelector ).foundation('reflow');
				me.$('a[href="#panel-field-settings"]').click();
			}

			// Add the preview to the Preview tab.
			var $preview = view.getPreview().render().$el;
			$( previewPane ).append( $preview );
			setTimeout(function() {
				$preview.addClass('wx-active');
			}, 1);	// If we just add this class right away, we don't get the CSS transition, so we wait 1ms before applying it.
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

        next: function( e ) {
        	e.preventDefault();
        	if ( $('.form-builder-step-one').is(':visible') ) {
            	$('.form-builder-step-one').slideUp();
            	$('.form-builder-step-two').slideDown();

            	// If the form is being *created* (not edited), default it to the form's title.
            	var action = this.__getActionByMethod( 'email' );
            	if ( ! this.model.get('id') ) {
            		var title = $('.wx-edit-form-title').val();
					if ( action )
						action.get( 'pdfHeader' ).title = title;			// Set the model
					$( '.wx-form-builder-pdfheader-title' ).val( title );	// Set the input
					this.$('.wx-pdf-preview .title').html( title );			// Set the preview
            	}
            }
            else {
            	$('.form-builder-step-two').slideUp();
            	$('.form-builder-step-three').slideDown();
            }
            this.$el.foundation('reflow');
        },

        back: function() {
        	if ( $('.form-builder-step-two').is(':visible') ) {
	            $('.form-builder-step-one').slideDown();
	            $('.form-builder-step-two').slideUp();
	        }
	        else {
	        	$('.form-builder-step-two').slideDown();
	            $('.form-builder-step-three').slideUp();
	        }
            this.$el.foundation('reflow');
        },

        // Email action events
		showHideEmailInfo: function( e ) {
			var checked = $( e.currentTarget ).is(':checked');
			if ( checked )
				$('.wx-email-action').slideDown();
			else
				$('.wx-email-action').slideUp();
		},

		showHideCustomPostInfo: function( e ) {
			var checked = $( e.currentTarget ).is(':checked');
			if ( checked )
				$('.wx-custom-post').slideDown();
			else
				$('.wx-custom-post').slideUp();
		},


		toggleSendEmailAddress: function( ev ) {
			var action  = this.__getActionByMethod( 'email' ),
			    $target = $( ev.currentTarget ),
			    $input  = this.$('.wx-email-action input[type="email"]');
			if ( $target.is( ':checked' ) ) {
				$input.val( wx.currentUserEmail );
				action.set( 'value', wx.currentUserEmail );
			}
			else {
				$input.val( '' );
				action.set( 'value', '' );
			}
		},

		updatePdfHeader: function( ev ) {
			var action = this.__getActionByMethod( 'email' ),
			    $me    = $( ev.currentTarget );

			if ( $me.hasClass( 'wx-form-builder-pdfheader-title' ) ) {
				action.get( 'pdfHeader' ).title = $me.val();
				this.$('.wx-pdf-preview .title').html( $me.val() );
			}
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line1' ) ) {
				action.get( 'pdfHeader' ).line1 = $me.val();
				this.$('.wx-pdf-preview .line1').html( $me.val() );
			}
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line2' ) ) {
				action.get( 'pdfHeader' ).line2 = $me.val();
				this.$('.wx-pdf-preview .line2').html( $me.val() );
			}
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line3' ) ) {
				action.get( 'pdfHeader' ).line3 = $me.val();
				this.$('.wx-pdf-preview .line3').html( $me.val() );
			}
		},

		updateAction: function( ev ) {
			console.log( 'updateAction!' );
			ev.preventDefault();
			var $me    = $( ev.currentTarget ),
			    method = 'email';
			if ( $me.hasClass( 'wx-form-builder-action-post' ) )
				method = 'post';

			var action = this.__getActionByMethod( method );
			action.set( 'value', $me.val() );
		},

		updateMode: function( ev ) {
			var action = this.__getActionByMethod( 'post' ),
			    $me = $( ev.currentTarget );
			action.set( 'mode', $me.val() );
		},

		__getActionByMethod: function( method ) {
			var actionToReturn = null;
			for (var i = 0; i < this.model.get( 'config' ).formActions.length; i++) {
				var action = this.model.get( 'config' ).formActions.models[i];
				if ( action.get( 'method' ) === method ) {
					actionToReturn = action;
					break;
				}
			}
			return actionToReturn;
		},

		acknowledgementReceived: function( e ) {
			if ( $( e.currentTarget ).is( ':checked' ) ) {
				$( '.wx-form-builder-warning-proceed' ).removeClass( 'disabled' );
			}
			else {
				$( '.wx-form-builder-warning-proceed' ).addClass( 'disabled' );
			}
		},
		proceed: function( e ) {
			var me = this;
			e.preventDefault();

			if ( $( e.currentTarget ).hasClass( 'disabled' ) ) {
				return;
			}

			var confirmed = window.confirm( 'Are you SURE you want to proceed? All of your existing form submissions will be erased!' );
			if ( ! confirmed ) {
				return;
			}

			// Delete data
			$.ajax({
				url: wx.apiUrl + '_formbuilder/delete_form_data?tab_id=' + this.model.get( 'id' ),
				success: function( data ) {
					me.$('.form-builder-delete-data').slideUp();
					me.$('.form-builder-step-one').slideDown();
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					alert( 'An unknown error has occurred deleting the data. Please contact support@weeverapps.com.' );
				}
			});
        },

        /**
         * NOTE - The ordinal doesn't (necessarily) relate to the order of the form elements.
         * It relates to the order in which elements were added.
         */
        _getLargestOrdinal: function( formElements, ordinal ) {
        	if (!ordinal)
        		ordinal = 0;
			for (var i = 0; i < formElements.length; i++) {
				var model = formElements.at( i );
				if ( model.get( 'ordinal' ) > ordinal )
					ordinal = model.get( 'ordinal' );
				if ( model.get('formElements') )
					ordinal = this._getLargestOrdinal( model.get('formElements'), ordinal );
			}
			return ordinal;
        }
	});

})(jQuery);
