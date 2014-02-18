
wxApp = wxApp || {};

(function($){

	wxApp.DocuSignSubTabEditView = wxApp.FormBuilderSubTabEditView.extend({
		baseEditTplSelector: '#docusign-subtab-edit-template',

		initializeEvents: function() {

			var parentEvents = wxApp.FormBuilderSubTabEditView.prototype.events;
			parentEvents = _.extend({}, this.genericEvents, parentEvents);
			this.events = _.extend({}, parentEvents, this.events);
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
			'click .wx-continue-button'                      : 'next'
		},

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
			var post = new wxApp.FormBuilderAction();
			post.set( { method: 'post' } );
			var docusign = new wxApp.FormBuilderAction();
			docusign.set( { method: 'docusign' } );

			this.model.get( 'config' ).formActions.push( post );
			this.model.get( 'config' ).formActions.push( docusign );

			this.addPostAction( post );
			this.docusign = this.addDocusignAction( docusign );
		},

		/********************************/
		/* DocuSign Account Stuff Start */
		/********************************/

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

			this.$('.wx-subnav-item').removeClass('active');
       		this.$('#docusignLogin').addClass('active');

			this.$('#docusignLoginForm .wx-form-builder-docusign-username').focus();
		},

		showCreateAccount: function( ev ) {
			ev.preventDefault();
			this.$('#docusignLoginForm').slideUp();
			this.$('#docusignCreateForm').slideDown();
			this.$('#docusignChangePassord').slideUp();

			this.$('.wx-subnav-item').removeClass('active');
       		this.$('#docusignCreate').addClass('active');

			this.$('#docusignCreateForm .wx-form-builder-docusign-accountName').focus();
		},

		showChangePassword: function( ev ) {
			ev.preventDefault();
			this.$('#docusignLoginForm').slideUp();
			this.$('#docusignCreateForm').slideUp();
			this.$('#docusignChangePassord').slideDown();

			this.$('.wx-subnav-item').removeClass('active');
       		this.$('#docusignChangePassword').addClass('active');

			this.$('#docusignChangePassord .wx-form-builder-docusign-username').focus();
		},

		login: function() {
			var me       = this,
			    username = me.$('#docusignLoginForm .wx-form-builder-docusign-username').val(),
			    password = me.$('#docusignLoginForm .wx-form-builder-docusign-password').val(),
			    success  = function success( data ) {
			    	me.$('#login_loading').hide();
					me.$('#docusignAccountInfo').slideUp();
					me.$('.login.alert-box.success').html( 'You have successfully logged in to your DocuSign account.<a href="#" class="close">&times;</a>' );
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
			if ( true ) params.demomode = 1;	// TODO - Remove this.
			wx.makeApiCall('_docusign/client_login', params, success, failure);
		},

		createAccount: function() {
			var me = this;
				account = me.validateAccount(),
				success = function success( data ) {
					me.$('#docusignAccountInfo').slideUp();
					me.$('.login.alert-box.success').html( 'Success! DocuSign account created.  You are now logged in.<a href="#" class="close">&times;</a>' );
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
				if ( true ) account.demomode = 1;	// TODO - Remove this.

				wx.makeApiCall( '_docusign/create_account', account, success, failure );
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
					me.$('.login.alert-box.success').html( 'Success! DocuSign password updated.  You are now logged in.<a href="#" class="close">&times;</a>' );
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
				if ( true ) params.demomode = 1;	// TODO - Remove this.
				wx.makeApiCall('_docusign/change_password', params, success, failure);
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
				    // middleName  : me.$('.wx-form-builder-docusign-middleName').val().trim(),
				    lastName    : me.$('.wx-form-builder-docusign-lastName').val().trim(),
				    // suffix      : me.$('.wx-form-builder-docusign-suffix').val().trim(),
				    password    : me.$('#docusignCreateForm .wx-form-builder-docusign-password').val()
			    },
			    passwordAgain = me.$('.wx-form-builder-docusign-password-again').val();

            // Validation Rules.
            // 1. Account Name is required.
            if ( accountObject.accountName.length === 0 ) {
            	accountObject.valid = false;
            	accountObject.errors[ accountObject.errors.length ] = "Company Name is required.";
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

		/********************************/
		/* DocuSign Account Stuff End   */
		/********************************/

		
	});

})(jQuery);