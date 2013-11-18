// views/formbuilder.control.select.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlSelectView = Backbone.View.extend({
		tagName: 'section',
		className: 'wx-form-builder-row',
		tplSelector: '#form-builder-select',
		preview: null,

		events: {
			// 'click .wx-form-builder-edit-title': 'editTitle',
			'keyup .wx-form-builder-title-input': 'updateTitle',
			// 'blur .wx-form-builder-name-input': 'setName',
			// 'click .wx-form-builder-select-allow-multiple': 'toggleMultipleSelections',
			'click .wx-form-builder-add-option': 'addOption',
			'click .wx-form-builder-allow-additional': 'setAllowAdditional',
			'click .wx-form-builder-delete': 'deleteControl',
			'click .wx-form-builder-required': 'setRequired'
		},

		initialize: function() {
			console.log('select group view init');
			//this.template = _.template( $('#form-builder-select').html() );
			var $template = $( this.tplSelector );
			this.tpl = _.template( $template.html() );

		},

		render: function() {
			this.$el.html( this.tpl( this.model.toJSON() ) );
			return this;
		},

		deleteControl: function() {
			this.remove();
			this.model.destroy();
		},

		addOption: function() {
			this.model.get('optionGroup').add( new wxApp.FormBuilderControlOption() );
		},

		// setName: function( ev ) {
		// 	var $me = $( ev.currentTarget );
		// 	if ( $me.val() !== '' )
		// 		this.model.get( 'attributes' ).set( 'name', $me.val() );
		// },

		setAllowAdditional: function( ev ) {
			console.log('setAllowAdditional');
			var $me = $( ev.currentTarget );
			if ( $me.is( ':checked' ) ) {
				console.log('checked');
				this.model.set( 'allowAdditional', 'checked' );
			}
			else {
				this.model.set( 'allowAdditional', '' );
			}
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlSelectPreview({ model: this.model });
			}
			return this.preview;
		},

		// toggleMultipleSelections: function( ev ) {
		// 	// This field has been removed as Sencha Touch doesn't support multiple selections in a <select> group
		// 	var $me = $( ev.currentTarget );
		// 	if ( $me.is( ':checked' ) ) {
		// 		this.model.get( 'attributes' ).set( 'multiple', 'checked' );
		// 	}
		// 	else {
		// 		this.model.get( 'attributes' ).unset( 'multiple' );
		// 	}
		// },

		// editTitle: function( ev ) {
		// 	console.log('editTitle');
		// 	ev.preventDefault();
		// 	this.$title = $( ev.currentTarget );
		// 	this.$( '.wx-form-builder-title-input' ).val( this.$title.text() ).show().select();
		// 	this.$title.hide();
		// },

		setRequired: function( ev ) {
			console.log('Set Required.')
			var $me = $( ev.currentTarget );
			if ( $me.is( ':checked' ) ) {
				this.model.get( 'attributes' ).set( 'required', 'checked' );
				this.getPreview().$('.required').removeClass('hide');
			}
			else {
				this.model.get( 'attributes' ).unset( 'required' );
				this.getPreview().$('.required').addClass('hide');
			}
		},

		updateTitle: function( ev ) {
			console.log('updateTitle');
			var $me = $( ev.currentTarget );
			this.$('.wx-form-builder-edit-title').text( $me.val() ); //.show();
			// $me.hide();

			this.model.set( 'title', $me.val() );
			this.getPreview().$('label .title').text( $me.val() );
		}

	});

	wxApp.FormBuilderControlSelectPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-select-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
			// this.model.bind('change', this.render, this);
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			return this;
		}
	});
})(jQuery);
