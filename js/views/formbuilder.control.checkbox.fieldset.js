// views/formbuilder.control.checkbox.fieldset.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlCheckboxFieldsetView = Backbone.View.extend({
		tagName: 'section',
		className: 'wx-form-builder-row',
		tplSelector: '#form-builder-checkbox-fieldset',
		preview: null,

		events: {
			// 'click .wx-form-builder-edit-title': 'editTitle',
			'keyup .wx-form-builder-title-input': 'updateTitle',
			// 'blur .wx-form-builder-name-input': 'setName',
			'click .wx-form-builder-allow-additional': 'setAllowAdditional',
			'click .wx-form-builder-delete': 'deleteControl',
			'click .wx-form-builder-add-checkbox': 'addCheckbox'
		},

		initialize: function() {
			console.log('checkbox fieldset view init');
			var $template = $( this.tplSelector );
			this.tpl = _.template( $template.html() );
		},

		render: function() {
			console.log('checkbox fieldset view render');
			this.$el.html( this.tpl( this.model.toJSON() ) );
			return this;
		},

		deleteControl: function() {
			console.log( 'deleteControl' );
			this.remove();
			this.model.destroy();
		},

		// setName: function( ev ) {
		// 	console.log( 'setName' );
		// 	var $me = $( ev.currentTarget );
		// 	console.log( this );
		// 	if ( $me.val() !== '' ) {
		// 		this.model.set( 'name', $me.val() );
		// 		this.model.get( 'checkboxGroup' ).each( function( model ) {
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

			this.$('.wx-form-builder-label').text( $me.val() );
			this.model.set( 'title', $me.val() );
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlCheckboxFieldsetPreview({ model: this.model });
			}
			return this.preview;
		},

		addCheckbox: function() {
			console.log('check view add');
			console.log(this.model.get( 'checkboxGroup' ));
			this.model.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox() );
			console.log(this.model.get( 'checkboxGroup' ));
		}

	});

	wxApp.FormBuilderControlCheckboxFieldsetPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-checkbox-fieldset-preview';
			var $template = $( selector );
			this.fieldsetTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.fieldsetTpl( model ) );

			return this;
		}
	});
})(jQuery);
