
// NOTE - I think this class (and the related views) can be removed, since all of the actions are built into the formbuilder view now.

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
			// 'keyup .wx-form-builder-pdfheader-title'            : 'updatePdfHeader',
			// 'keyup .wx-form-builder-pdfheader-line1'            : 'updatePdfHeader',
			// 'keyup .wx-form-builder-pdfheader-line2'            : 'updatePdfHeader',
			// 'keyup .wx-form-builder-pdfheader-line3'            : 'updatePdfHeader',
			'click .radio-mode'                                 : 'updateMode',
			'click .show-hide-custom-post'                      : 'showHideCustomPost',
			// 'change .wx-form-builder-send-current-user-email'   : 'toggleSendEmailAddress',
			'change .wx-form-builder-docusign-demomode'         : 'toggleDemoMode'
		},

		// toggleSendEmailAddress: function( ev ) {
		// 	var $target = $( ev.currentTarget );
		// 	var $input = $target.closest( '.wx-form-builder-row.email' ).find( 'input.wx-form-builder-action[type="email"]' );
		// 	if ( $target.is( ':checked' ) ) {
		// 		$input.val( wx.currentUserEmail );
		// 		this.model.set( 'value', wx.currentUserEmail );
		// 	}
		// 	else {
		// 		$input.val( '' );
		// 		this.model.set( 'value', '' );
		// 	}

		// },

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

		// updatePdfHeader: function( ev ) {
		// 	var $me = $( ev.currentTarget );

		// 	if ( $me.hasClass( 'wx-form-builder-pdfheader-title' ) ) {
		// 		this.model.get( 'pdfHeader' ).title = $me.val();
		// 		$('.wx-pdf-preview .title').html( $me.val() );
		// 	}
		// 	if ( $me.hasClass( 'wx-form-builder-pdfheader-line1' ) ) {
		// 		this.model.get( 'pdfHeader' ).line1 = $me.val();
		// 		$('.wx-pdf-preview .line1').html( $me.val() );
		// 	}
		// 	if ( $me.hasClass( 'wx-form-builder-pdfheader-line2' ) ) {
		// 		this.model.get( 'pdfHeader' ).line2 = $me.val();
		// 		$('.wx-pdf-preview .line2').html( $me.val() );
		// 	}
		// 	if ( $me.hasClass( 'wx-form-builder-pdfheader-line3' ) ) {
		// 		this.model.get( 'pdfHeader' ).line3 = $me.val();
		// 		$('.wx-pdf-preview .line3').html( $me.val() );
		// 	}
		// },

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
		},

		showHideCustomPost: function( ev ) {
			ev.preventDefault();

			var $action = $('.wx-custom-post');
			if ( $action.is(":visible") )
				$action.slideUp();
			else
				$action.slideDown();
		}
	});
})(jQuery);