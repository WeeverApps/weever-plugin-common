
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderActionView = Backbone.View.extend({
		tagName: 'section',
		className: 'wx-form-builder-row',
		tplPostSelector: '#form-builder-action-post',
		tplEmailSelector: '#form-builder-action-email',
		tplDocusignSelector: '#form-builder-action-docusign',

		events: {
			'blur .wx-form-builder-action'                      : 'updateAction',
			'click .wx-form-builder-delete'                     : 'deleteControl',
			'blur .wx-form-builder-docusign-username'           : 'updateUsername',
			'blur .wx-form-builder-docusign-password'           : 'updatePassword',
			'blur .wx-form-builder-docusign-returnUrl'          : 'updateReturnUrl',
			'blur .wx-form-builder-pdfheader-title'             : 'updatePdfHeader',
			'blur .wx-form-builder-pdfheader-line1'             : 'updatePdfHeader',
			'blur .wx-form-builder-pdfheader-line2'             : 'updatePdfHeader',
			'blur .wx-form-builder-pdfheader-line3'             : 'updatePdfHeader',
			'click .radio-mode'                                 : 'updateMode',
			'change .wx-form-builder-send-current-user-email'   : 'toggleSendEmailAddress',
			'change .wx-form-builder-docusign-demomode'         : 'toggleDemoMode'
			// 'click #docusignLogin'                     : 'showLogin',
			// 'click #docusignCreate'                    : 'showCreateAccount',
			// 'click #docusignChangePassword'            : 'showChangePassword',
			// 'click #wx-docusign-login-button'          : 'login',
			// 'click #wx-docusign-create-account-button' : 'createAccount',
			// 'click #wx-docusign-change-password-button': 'changePassword'
		},

		toggleSendEmailAddress: function( ev ) {
			var $target = $( ev.currentTarget );
			var $input = $target.closest( '.wx-form-builder-row.email' ).find( 'input.wx-form-builder-action[type="email"]' );
			if ( $target.is( ':checked' ) ) {
				$input.val( wx.currentUserEmail );
				this.model.set( 'value', wx.currentUserEmail );
			}
			else {
				$input.val( '' );
				this.model.set( 'value', '' );
			}

		},

		initialize: function() {
			var tplSelector = '';
			switch( this.model.get( 'method' ) ) {
				case 'post':
					tplSelector = this.tplPostSelector;
					break;
				case 'email':
					tplSelector = this.tplEmailSelector;
					break;
				case 'docusign':
					tplSelector = this.tplDocusignSelector;
					break;
			}
			var $template = $( tplSelector );
			this.tpl = _.template( $template.html() );
			console.log( 'action init', this );
		},

		render: function() {
			var templateDataObject = this.model.toJSON();

			templateDataObject.useCurrentUserEmail = '';
			if ( templateDataObject.value == wx.currentUserEmail ) {
				templateDataObject.useCurrentUserEmail = 'checked';
			}

			this.$el.html( this.tpl( templateDataObject ) );
			this.$el.addClass( this.model.get( 'method' ) );
			return this;
		},

		toggleDemoMode: function( ev ) {

			if ( $( ev.currentTarget ).is( ':checked' ) ) {
				this.model.set( 'demomode', true );
			}
			else {
				this.model.unset( 'demomode' );
			}

		},

		updateUsername: function( ev ) {
			this.model.set( 'username', $( ev.currentTarget ).val() );
		},

		updatePassword: function( ev ) {
			this.model.set( 'password', $( ev.currentTarget ).val() );
		},

		updateReturnUrl: function( ev ) {
			this.model.set( 'returnUrl', $( ev.currentTarget ).val() );
		},

		updatePdfHeader: function( ev ) {
			var $me = $( ev.currentTarget );

			if ( $me.hasClass( 'wx-form-builder-pdfheader-title' ) )
				this.model.get( 'pdfHeader' ).title = $me.val();
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line1' ) )
				this.model.get( 'pdfHeader' ).line1 = $me.val();
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line2' ) )
				this.model.get( 'pdfHeader' ).line2 = $me.val();
			if ( $me.hasClass( 'wx-form-builder-pdfheader-line3' ) )
				this.model.get( 'pdfHeader' ).line3 = $me.val();
		},

		updateAction: function( ev ) {
			ev.preventDefault();
			var $me = $( ev.currentTarget );
			this.model.set( 'value', $me.val() );
		},

		deleteControl: function() {
			this.remove();
			this.model.destroy();
		},

		updateMode: function( ev ) {
			var $me = $( ev.currentTarget );
			this.model.set( 'mode', $me.val() );
		}

		 //,

		// Commented out DocuSign Stuff Below.

		/*showLogin: function( ev ) {
			ev.preventDefault();
			this.$('#docusignLoginForm').slideDown();
			this.$('#docusignCreateForm').slideUp();
			this.$('#docusignChangePassord').slideUp();
		},

		showCreateAccount: function( ev ) {
			ev.preventDefault();
			this.$('#docusignLoginForm').slideUp();
			this.$('#docusignCreateForm').slideDown();
			this.$('#docusignChangePassord').slideUp();
		},

		showChangePassword: function( ev ) {
			ev.preventDefault();
			this.$('#docusignLoginForm').slideUp();
			this.$('#docusignCreateForm').slideUp();
			this.$('#docusignChangePassord').slideDown();
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
			wx.makeApiCall('_docusign/client_login', params, success, failure);
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
				wx.makeApiCall('_docusign/change_password', params, success, failure);
			}
		},

		validateAccount: function() {

            var me = this,
                accountObject = {
            		valid       : true,
            		errors      : [],
	                accountName : me.$('.wx-form-builder-docusign-accountName').val().trim(),
				    username    : me.$('#docusignCreateForm .wx-form-builder-docusign-username').val().trim(),
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

		}*/

	});
})(jQuery);