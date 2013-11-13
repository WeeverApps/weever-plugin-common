// views/formbuilder.control.radio.fieldset.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioFieldsetView = Backbone.View.extend({
		tagName: 'section',
		className: 'wx-form-builder-row',
		tplSelector: '#form-builder-radio-fieldset',
		preview: null,

		events: {
			// 'click .wx-form-builder-edit-title': 'editTitle',
			'keyup .wx-form-builder-title-input': 'updateTitle',
			// 'blur .wx-form-builder-name-input': 'setName',
			'click .wx-form-builder-allow-additional': 'setAllowAdditional',
			'click .wx-form-builder-delete': 'deleteControl',
			'click .wx-form-builder-add-radio': 'addRadio'
		},

		initialize: function() {
			console.log('Radio fieldset view init');
			var $template = $( this.tplSelector );
			this.tpl = _.template( $template.html() );
		},

		render: function() {
			console.log('Radio fieldset view render');
			this.$el.html( this.tpl( this.model.toJSON() ) );
			return this;
		},

		deleteControl: function() {
			console.log( 'deleteControl' );
			this.getPreview().remove();
			this.remove();
			this.model.destroy();
		},

		// setName: function( ev ) {
		// 	console.log( 'setName' );
		// 	var $me = $( ev.currentTarget );
		// 	console.log( this );
		// 	if ( $me.val() !== '' ) {
		// 		this.model.set( 'name', $me.val() );
		// 		this.model.get( 'radioGroup' ).each( function( model ) {
		// 			model.get( 'attributes' ).set( 'name', $me.val() );
		// 			console.log( model );
		// 		} );
		// 	}
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

		// editTitle: function( ev ) {
		// 	console.log('editTitle');
		// 	ev.preventDefault();
		// 	this.$title = $( ev.currentTarget );
		// 	this.$( '.wx-form-builder-title-input' ).val( this.$title.text() ).show().select();
		// 	this.$title.hide();
		// },

		updateTitle: function( ev ) {
			console.log('updateTitle');
			var $me = $( ev.currentTarget );
			// this.$title.text( $me.val() ).show();
			// $me.hide();

			this.$('.wx-form-builder-label').text( $me.val() );2
			this.model.set( 'title', $me.val() );
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlRadioFieldsetPreview({ model: this.model });
			}
			return this.preview;
		},

		addRadio: function() {
			console.log('radio view add');
			console.log(this.model.get( 'radioGroup' ));
			this.model.get( 'radioGroup' ).add( new wxApp.FormBuilderControlRadio() );
			console.log(this.model.get( 'radioGroup' ));
		}

	});

	wxApp.FormBuilderControlRadioFieldsetPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-radio-fieldset-preview';
			var $template = $( selector );
			this.fieldsetTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.fieldsetTpl( model ) );

			// for (var i = 0; i < this.model.get('radioGroup').length; i++) {
			// 	var preview = this.model.get('radioGroup').models[i].getPreview();
			// 	this.$('fieldset').append( preview.render() );
			// };

			return this;
		}
	});
})(jQuery);
