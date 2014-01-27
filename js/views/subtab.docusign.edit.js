
wxApp = wxApp || {};

(function($){

	wxApp.DocuSignSubTabEditView = wxApp.FormBuilderSubTabEditView.extend({
		baseEditTplSelector: '#form-builder-edit-template',

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
			'click .wx-continue-button'                      : 'next',
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
		}
		
	});

})(jQuery);