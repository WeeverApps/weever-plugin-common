
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderSubTabEditView = wxApp.SubTabEditView.extend({
		previewPaneClass: 'wx-preview-form',
		buildPaneSelector: '#form-build-area',
		subTabEditTplSelector: '#form-builder-subtab-edit-template',
		baseEditTplSelector: '#form-builder-edit-template',
		hasCalledFinish: false,
		finishView: null,
		previews: null,
		controls: null,
		docusign: null,

		initializeEvents: function() {
			this.events = _.extend({}, this.genericEvents, this.events);
		},

		initialize: function() {

			if ( typeof this.model.get( 'config' ).formElements == 'undefined' ) {
				this.model.get( 'config' ).formElements = new wxApp.FormBuilderCollection();
			}
			else {
				// Load currently existing form elements.
				var elementsJson;
				try {
					elementsJson = JSON.parse( this.model.get( 'config' ).formElements );
				} catch(err) {
					elementsJson = this.model.get( 'config' ).formElements.toJSON();
				}

				this.model.get('config').formElements = new wxApp.FormBuilderCollection();

				for ( var i = 0; i < elementsJson.length; i++ ) {

					if ( elementsJson[i].control === 'div' ) {

						this.addInfoWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].control === 'textarea' ) {

						this.addTextareaWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].control === 'radiofieldset' ) {

						this.addRadioGroupWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].control === 'checkboxfieldset' ) {

						this.addCheckboxGroupWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].control === 'select' ) {

						this.addSelectWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].type === 'textSlider' ) {

						this.addTextSlider( elementsJson[i] );

					} else {

						this.addInput( elementsJson[i] );

					}
				}
			}

			if ( typeof this.model.get( 'config' ).formActions == 'undefined' ) {
				this.getDefaultFormActions();
			}
			else {
				// Load currently existing form actions.
				var actionsJson;
				try {
					actionsJson = JSON.parse( this.model.get( 'config' ).formActions );
				} catch(err) {
					actionsJson = this.model.get( 'config' ).formActions.toJSON();
				}

				this.model.get( 'config' ).formActions = new Backbone.Collection();

				var hasDocusign	= false,
					hasPost		= false,
					hasEmail	= false;
				for ( var i = 0; i < actionsJson.length; i++ ) {
					var action = actionsJson[i];
					if ( action.method == 'docusign' ) {
						this.docusign = this.addDocusignAction( null, action );
						hasDocusign = true;
					}
					else if ( action.method == 'post' ) {
						this.addPostAction( null, action );
						hasPost = true;
					}
					else if ( action.method == 'email' ) {
						this.addEmailAction( null, action );
						hasEmail = true;
					}
				}

				// If we don't have some of the actions, we should add them.
				if ( !hasDocusign ) {
					this.docusign = this.addDocusignAction( null, { method: 'docusign' } );
				}

				if ( !hasPost ) {
					this.addPostAction( null, { method: 'post' } );
				}

				if ( !hasEmail ) {
					this.addEmailAction( null, { method: 'email' } );
				}
			}

			if ( typeof this.model.get( 'config' ).onUpload == 'string' ) {
				this.model.get( 'config' ).onUpload = JSON.parse( this.model.get( 'config' ).onUpload );
			}


			// Call parent's initialize() function
			wxApp.SubTabEditView.prototype.initialize.apply( this, arguments );
		},

		validate: function() {
			var success = false;
			$('.wx-form-builder-action').each(function(index, value) { 
				var $text = $( value );
				if ( $text.val() ) {
					success = true;
				}
			});

			// If DocuSign username or password is provided,
			// both username and password must be provided.
			if ( $('.wx-form-builder-docusign-username').val() || $('.wx-form-builder-docusign-password').val() ) {
				if ( $('.wx-form-builder-docusign-username').val() && $('.wx-form-builder-docusign-password').val() ) {
					success = true;
				}
			}

			if (!success) {
				// Display an error message.
				var errorMessage = "Sorry! Your form could not be saved.  Please add an email recipient, DocuSign login information, or custom post action in &ldquo;Form submission settings&rdquo;.";
				var $alert = $('.alert-box.alert .message').html( errorMessage );
				$alert.parent().slideDown();
			}

			return success;
		},

		getDefaultFormActions: function() {
			
			// this.model.get( 'config' ).formActions = new Backbone.Collection();
			// var post = new wxApp.FormBuilderAction();
			// post.set( { method: 'post' } );
			// var email = new wxApp.FormBuilderAction();
			// email.set( { method: 'email' } );
			// var docusign = new wxApp.FormBuilderAction();
			// docusign.set( { method: 'docusign' } );

			// this.model.get( 'config' ).formActions.push( post );
			// this.model.get( 'config' ).formActions.push( email );
			this.model.get( 'config' ).formActions.push( docusign );

			// this.addPostAction( post );
			// this.addEmailAction( email );
			this.docusign = this.addDocusignAction( docusign );

		},

		setModelFromView: function( model ) {

			for (var i = 0; i < model.get( 'config' ).formActions.length; i++) {
				var action = model.get( 'config' ).formActions.models[i];
				if ( action.get( 'method' ) === 'post' || action.get( 'method' ) === 'email' ) {

					// Remove from array if nothing is set.
					if ( !action.get('value') ) {
						model.get( 'config' ).formActions.remove( action );
						i--;
					}

				} else {

					// DocuSign - Remove from array if nothing is set.
					if ( (typeof action.get('username') === 'undefined') || !action.get('password') ) {
						model.get( 'config' ).formActions.remove( action );
						i--;
					}
				}
			};

			return model;
		},

		events: {
			
			// "Step One" stuff (ie, DocuSign)
			'blur .wx-form-builder-docusign-username'        : 'updateUsername',
			'blur .wx-form-builder-docusign-password'        : 'updatePassword',
			'keyup .wx-form-builder-docusign-password'       : 'passwordKeyUp',
			'blur .wx-form-builder-docusign-returnUrl'       : 'updateReturnUrl',
			'blur .wx-form-builder-pdfheader-title'          : 'updatePdfHeader',
			'blur .wx-form-builder-pdfheader-line1'          : 'updatePdfHeader',
			'blur .wx-form-builder-pdfheader-line2'          : 'updatePdfHeader',
			'blur .wx-form-builder-pdfheader-line3'          : 'updatePdfHeader',
			'click #docusignLogin'                           : 'showLogin',
			'click #docusignCreate'                          : 'showCreateAccount',
			'click #docusignChangePassword'                  : 'showChangePassword',
			'click #wx-docusign-login-button'                : 'login',
			'click #wx-docusign-create-account-button'       : 'createAccount',
			'click #wx-docusign-change-password-button'      : 'changePassword',
			'click .wx-continue-button'                      : 'next',

			// "Step Two" stuff (ie, FormBuilder)
			'change .switch-advanced'                        : 'toggleAdvancedMode',
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
			'keyup .button-text'                             : 'updateButtonText',
			'sortable-update'                                : 'sortableUpdate'
		},

		/******************/
		/* Step One Start */
		/******************/

		updateUsername: function( ev ) {
			this.docusign.set( 'username', $( ev.currentTarget ).val() );
		},

		updatePassword: function( ev ) {
			this.docusign.set( 'password', $( ev.currentTarget ).val() );
		},

		// Login when 'enter' is pressed.
		passwordKeyUp: function( ev ) {
			if ( ev.keyCode == 13 ) {
				// Login.
				ev.preventDefault();
				this.login();
			}
		},

		updateReturnUrl: function( ev ) {
			this.docusign.set( 'returnUrl', $( ev.currentTarget ).val() );
		},

		updatePdfHeader: function( ev ) {
			var $me = $( ev.currentTarget );

			if ( $me.hasClass( 'wx-form-builder-pdfheader-title' ) )
				this.docusign.get( 'pdfHeader' ).title = $me.val();
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line1' ) )
				this.docusign.get( 'pdfHeader' ).line1 = $me.val();
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line2' ) )
				this.docusign.get( 'pdfHeader' ).line2 = $me.val();
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line3' ) )
				this.docusign.get( 'pdfHeader' ).line3 = $me.val();
		},


		showLogin: function( ev ) {
			ev.preventDefault();
			this.$('#docusignLoginForm').slideDown();
			this.$('#docusignCreateForm').slideUp();
			this.$('#docusignChangePassord').slideUp();

			this.$('#docusignLoginForm .wx-form-builder-docusign-username').focus();
		},

		showCreateAccount: function( ev ) {
			ev.preventDefault();
			this.$('#docusignLoginForm').slideUp();
			this.$('#docusignCreateForm').slideDown();
			this.$('#docusignChangePassord').slideUp();

			this.$('#docusignCreateForm .wx-form-builder-docusign-accountName').focus();
		},

		showChangePassword: function( ev ) {
			ev.preventDefault();
			this.$('#docusignLoginForm').slideUp();
			this.$('#docusignCreateForm').slideUp();
			this.$('#docusignChangePassord').slideDown();

			this.$('#docusignChangePassord .wx-form-builder-docusign-username').focus();
		},

		login: function() {
			var me       = this,
			    username = me.$('#docusignLoginForm .wx-form-builder-docusign-username').val(),
			    password = me.$('#docusignLoginForm .wx-form-builder-docusign-password').val(),
			    success  = function success( data ) {
			    	me.$('#login_loading').hide();
					me.$('#docusignAccountInfo').slideUp();
					me.$('.login.alert-box.success').text( 'Okay! You\'ve been logged in!' );
					me.$('#docusignOtherInfo').slideDown();
			    },
			    failure  = function failure( data ) {
			    	me.$('#login_loading').hide();
					me.$('.login.alert-box.alert').text( data.message );
					me.$('.login.alert-box.alert').slideDown();
			    }

			// Hide the alerts, show the loading gif.
			me.$('.login.alert-box.alert').slideUp();
			me.$('#login_loading').show();

			var params = { username: username, password: password };
			if ( true ) params.demo = 1;	// TODO - Remove this.
			wx.makeApiCall('_docusign/clientLogin', params, success, failure);
		},

		createAccount: function() {
			var me = this;
				account = me.validateAccount(),
				success = function success( data ) {
					me.$('#docusignAccountInfo').slideUp();
					me.$('.login.alert-box.success').text( 'Okay! Your account has been created!' );
					me.$('#docusignOtherInfo').slideDown();
				},
				failure = function failure( data ) {
					me.$('.account.alert-box.alert').text( data.message );
					me.$('.account.alert-box.alert').slideDown();
				};

			if ( account.valid ) {
				// Remove values we don't need to send to the API.
				delete account.valid;
				delete account.errors;
				if ( true ) account.demo = 1;	// TODO - Remove this.

				wx.makeApiCall( '_docusign/createAccount', account, success, failure );
			}
			else {

				// Display validation errors.
				var msg = 'There were some validation errors. Please correct them and try again.<br/><ul>';
				for (var i = 0; i < account.errors.length; i++) {
					msg += '<li>' + account.errors[i] + '</li>';
				};
				msg += '</ul>';
				me.$('.account.alert-box.alert').html( msg );
				me.$('.account.alert-box.alert').slideDown();
			}
		},

		changePassword: function() {
			var me               = this,
			    username         = me.$('#docusignChangePassord .wx-form-builder-docusign-username').val(),
			    oldPassword      = me.$('#docusignChangePassord .wx-form-builder-docusign-old-password').val(),
			    newPassword      = me.$('#docusignChangePassord .wx-form-builder-docusign-password').val(),
			    newPasswordAgain = me.$('#docusignChangePassord .wx-form-builder-docusign-new-password-again').val(),
			    question1        = me.$('#docusignChangePassord .wx-form-builder-docusign-forgot-password-q1').val(),
			    answer1          = me.$('#docusignChangePassord .wx-form-builder-docusign-forgot-password-a1').val(),
			    success          = function success( data ) {
			    	me.$('#change_password_loading').hide();
					me.$('#docusignAccountInfo').slideUp();
					me.$('.login.alert-box.success').text( 'Okay! Your password has been changed, and you\'ve been logged in!' );
					me.$('#docusignOtherInfo').slideDown();
			    },
			    failure          = function failure( data ) {
			    	me.$('#change_password_loading').hide();
					me.$('.changePassword.alert-box.alert').text( data.message );
					me.$('.changePassword.alert-box.alert').slideDown();
			    }

			// Hide the alerts, show the loading gif.
			me.$('.changePassword.alert-box.alert').slideUp();
			me.$('#change_password_loading').show();

			if ( newPassword !== newPasswordAgain ) {

				me.$('.changePassword.alert-box.alert').text( 'Validation Error: Your passwords do not match.' );

			} else {

				var params = { username: username, password: oldPassword, newPassword: newPassword, question1: question1, answer1: answer1 };
				if ( true ) params.demo = 1;	// TODO - Remove this.
				wx.makeApiCall('_docusign/changePassword', params, success, failure);
			}
		},

		validateAccount: function() {

            var me = this,
                accountObject = {
            		valid       : true,
            		errors      : [],
	                accountName : me.$('.wx-form-builder-docusign-accountName').val().trim(),
				    // username    : me.$('#docusignCreateForm .wx-form-builder-docusign-username').val().trim(),
				    username    : me.$('.wx-form-builder-docusign-email').val().trim(),
				    email       : me.$('.wx-form-builder-docusign-email').val().trim(),
				    title       : me.$('.wx-form-builder-docusign-title').val().trim(),
				    firstName   : me.$('.wx-form-builder-docusign-firstName').val().trim(),
				    middleName  : me.$('.wx-form-builder-docusign-middleName').val().trim(),
				    lastName    : me.$('.wx-form-builder-docusign-lastName').val().trim(),
				    suffix      : me.$('.wx-form-builder-docusign-suffix').val().trim(),
				    password    : me.$('#docusignCreateForm .wx-form-builder-docusign-password').val()
			    },
			    passwordAgain = me.$('.wx-form-builder-docusign-password-again').val();

            // Validation Rules.
            // 1. Account Name is required.
            if ( accountObject.accountName.length === 0 ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "Account Name is required.";
            }

            // 2. User Name is required.
            if ( accountObject.username.length === 0 ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "User Name is required.";
            }

            // 3. Email address is required.
            if ( accountObject.email.length === 0 ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "Email address is required.";
            }

            // 4. Email address must be valid.
            else if ( !accountObject.email.match( /.+@.+/ ) ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "Email address is not valid.";
            }

            // 5. First name is required.
            if ( accountObject.firstName.length === 0 ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "First name is required.";
            }

            // 6. Last name is required.
            if ( accountObject.lastName.length === 0 ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "Last name is required.";
            }

            // 7. Password is required.
            if ( accountObject.password.length === 0 ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "Password is required.";
            }

            // 8. Passwords must match.
            else if ( accountObject.password !== passwordAgain ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "Passwords must match.";
            }

            return accountObject;

		},

		next: function() {

			$('.form-builder-step-one').slideUp();
			$('.form-builder-step-two').slideDown();

		},

		/****************/
		/* Step One End */
		/****************/

		toggleAdvancedMode: function( ev ) {

			var advanced = $( ev.currentTarget ).attr('id') === 'on',
			    formElements = this.model.get( 'config' ).formElements;

			// Set the 'advanced' flag on all the models.
			for (var i = 0; i < formElements.length; i++) {
				var model = formElements.models[i];
				model.set('advanced', advanced);
			};

			// Re-render all of the controls
			if ( this.controls ) {
				for (var i = 0; i < this.controls.length; i++) {
					this.controls[i].render();
				};
			}

			// Add or show the Custom POST form action.
			if ( advanced ) {

				if ( this.$('.wx-form-builder-row.post').length ) {

					// POST action already exists; Show it.
					this.$('.wx-form-builder-row.post').show();
				}
				else {

					// POST action doesn't exist; Add it.
					var post = new wxApp.FormBuilderAction();
					post.set( { method: 'post' } );
					this.model.get( 'config' ).formActions.push( post );
					this.addPostAction( post );
				}
			}
			else {

				// Hide the POST action.
				this.$('.wx-form-builder-row.post').hide();
			}
		},

		updateButtonText: function( ev ) {
			var $text = $( ev.currentTarget );
			this.model.set( 'buttonText', $text.val() );

			// Update in the preview panel.
			$('.wx-validate-feed.panel button.success').text( $text.val() );
		},

		sortableUpdate: function( event, model, position ) {
			var formElements = this.model.get( 'config' ).formElements;

			formElements.remove( model );

			formElements.each( function( model, index ) {
				var ordinal = index;
				if ( index >= position ) {
					ordinal += 1;
				}
				model.set( 'ordinal', ordinal );
			});

			model.set( 'ordinal', position );
			formElements.add( model, {at: position} );

			// Re-render the previews.
			var me = this;
			$( '.' + this.previewPaneClass ).html( '' );
			formElements.each( function( model, index ) {
				for (var i = 0; i < me.previews.length; i++) {
					var preview = me.previews[i];
					if ( preview.model.cid === model.cid ) {
						$( '.' + me.previewPaneClass ).append( preview.render().el );
						break;
					}
				}
			});
		},

		/**
		 * Override __super__.finish()
		 */
		finish: function() {
			console.log( 'subtab.formbuilder.edit finish' );
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
				action = this.addCustomAction( { method : 'docusign' } );
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
			var action = new wxApp.FormBuilderAction();
			if ( typeof customAction == 'object' ) {
				action.set( customAction );
			}

			var actionView = new wxApp.FormBuilderActionView({
				model: action
			});
			this.$( '#form-settings-accordion' ).append( actionView.render().el );

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

			var input = new wxApp.FormBuilderControlTextRange( mainProperties );
			input.get( 'attributes' ).set( attributes );
			for ( var attrKey in attributes ) {
				input.get( 'attributes' )[attrKey] = attributes[attrKey];
			};

			var inputView = new wxApp.FormBuilderControlTextRangeView({
				model: input
			});

			console.log( input );

			this.addControl( input, inputView );

			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'NA' } ) );
			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'SA' } ) );
			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'A' } ) );
			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'D' } ) );
			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'SD' } ) );

			return input;
		},

		addDateInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Date',
				attributes: {
					type: 'date'
				}
			});
		},

		addDateTimeLocalInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Date / Time',
				attributes: {
					type: 'datetime-local'
				}
			});
		},

		addEmailInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
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
				controlTitle: $(ev.currentTarget).text(),
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
				controlTitle: $(ev.currentTarget).text(),
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
				controlTitle: $(ev.currentTarget).text(),
				label: 'Month',
				attributes: {
					type: 'month'
				}
			});
		},

		addNumberInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
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
				controlTitle: $(ev.currentTarget).text(),
				label: 'Password',
				showPlaceholder: true,
				attributes: {
					type: 'password'
				}
			});
		},

		addRangeInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Range',
				minClass: '',
				maxClass: '',
				stepClass: '',
				valueClass: '',
				attributes: {
					type: 'range'
				}
			});
		},

		addTextRangeInput: function(ev) {
			this.addTextSlider({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Select One',
				type: 'textSlider',
				attributes: {
					type: 'range'
				}
			});
		},

		addTelInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
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
				controlTitle: $(ev.currentTarget).text(),
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
				controlTitle: $(ev.currentTarget).text(),
				label: 'Time',
				attributes: {
					type: 'time'
				}
			});
		},

		addUrlInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'URL',
				showPlaceholder: true,
				attributes: {
					type: 'url'
				}
			});
		},

		addInfo: function( ev ) {
			this.addInfoWithProperties( { 
				controlTitle: $(ev.currentTarget).text() 
			} );
		},

		addInfoWithProperties: function( properties ) {

			var info = new wxApp.FormBuilderControlInfo( properties );
			var infoView = new wxApp.FormBuilderControlInfoView({
				model: info
			});

			this.addControl( info, infoView );
			// this.$( this.buildPaneSelector ).append( infoView.render().el );
			// this.model.get( 'config' ).formElements.push( info );

		},

		addTextarea: function(ev) {
			this.addTextareaWithProperties( {
				controlTitle: $(ev.currentTarget).text()
			} );
		},

		addTextareaWithProperties: function( properties ) {

			var textArea = new wxApp.FormBuilderControlTextarea( properties );
			var textAreaView = new wxApp.FormBuilderControlTextareaView({
				model: textArea
			});

			this.addControl( textArea, textAreaView );
			// this.$( this.buildPaneSelector ).append( textAreaView.render().el );
			// this.model.get( 'config' ).formElements.push( textArea );
		},

		addRadioGroup: function(ev) {
			this.addRadioGroupWithProperties( {
				controlTitle: $(ev.currentTarget).text()
			} );
		},

		addRadioGroupWithProperties: function( properties ) {
			var radioFieldset = new wxApp.FormBuilderControlRadioFieldset( properties );
			var radioFieldsetView = new wxApp.FormBuilderControlRadioFieldsetView({
				model: radioFieldset
			});

			// this.$( this.buildPaneSelector ).append( radioFieldsetView.render().el );
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
			
			// radioFieldsetView.getPreview().render();
			// this.model.get( 'config' ).formElements.push( radioFieldset );
		},

		addCheckboxGroup: function(ev) {
			this.addCheckboxGroupWithProperties( {
				controlTitle: $(ev.currentTarget).text()
			} );
		},

		addCheckboxGroupWithProperties: function( properties ) {
			var checkboxFieldset = new wxApp.FormBuilderControlCheckboxFieldset( properties );
			var checkboxFieldsetView = new wxApp.FormBuilderControlCheckboxFieldsetView({
				model: checkboxFieldset
			});

			// this.$( this.buildPaneSelector ).append( checkboxFieldsetView.render().el );
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

			// this.model.get( 'config' ).formElements.push( checkboxFieldset );
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
				controlTitle: $(ev.currentTarget).text()
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

		addControl: function( input, view ) {
			var count = this.model.get( 'config' ).formElements.length;
			count++;
			input.set( 'ordinal', count );

			this.$( this.buildPaneSelector ).append( view.render().el );
			
			// Open the newly added tab.
			$('.wx-form-builder-row').removeClass('active');
			view.$el.addClass('active');

			this.model.get( 'config' ).formElements.push( input );
			$( this.buildPaneSelector ).foundation('section', 'reflow');

			// Now scroll down to it
			var offset = $('.wx-form-builder-row.active').offset().top - 230;
			$('body').animate({scrollTop: offset}, 250);

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
		}

	});

	wxApp.DocuSignSubTabEditView = wxApp.FormBuilderSubTabEditView.extend({

		validate: function() {
			var success = false;
			if ( $('.wx-form-builder-docusign-username').val() && $('.wx-form-builder-docusign-password').val() ) {
				success = true;
			}

			if (!success) {
				// Display an error message.
				var errorMessage = "Your form could not be saved! Please enter your DocuSign&trade; username and password under the <b>Form Settings</b> tab.";
				var $alert = $('.alert-box.alert .message').html( errorMessage );
				$alert.parent().slideDown();
			}


			return success;
		},

		getDefaultFormActions: function() {
			
			this.model.get( 'config' ).formActions = new Backbone.Collection();
			// var post = new wxApp.FormBuilderAction();
			// post.set( { method: 'post' } );
			var docusign = new wxApp.FormBuilderAction();
			docusign.set( { method: 'docusign' } );

			// this.model.get( 'config' ).formActions.push( post );
			this.model.get( 'config' ).formActions.push( docusign );

			// this.addPostAction( post );
			this.docusign = this.addDocusignAction( docusign );
		}
		
	});

})(jQuery);