// views/formbuilder.control.select.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlSelectView = Backbone.View.extend({
		tplSelector: '#form-builder-select',

		events: {
			'click .wx-form-builder-edit-title': 'editTitle',
			'blur .wx-form-builder-title-input': 'updateTitle',
			'blur .wx-form-builder-name-input': 'setName',
			'click .wx-form-builder-select-allow-multiple': 'toggleMultipleSelections',
			'click .wx-form-builder-allow-additional': 'setAllowAdditional',
			'click .wx-form-builder-delete': 'deleteControl'
		},

		initialize: function() {
			console.log('select group view init');
			//this.template = _.template( $('#form-builder-select').html() );
			var $template = $( this.tplSelector );
			this.tpl = _.template( $template.html() );

		},

		render: function() {
			console.log('select group view render');
			this.$el.html( this.tpl( this.model.toJSON() ) );
			return this;
		},

		deleteControl: function() {
			console.log( 'deleteControl' );
			this.remove();
			this.model.destroy();
		},

		setName: function( ev ) {
			var $me = $( ev.currentTarget );
			if ( $me.val() !== '' )
				this.model.get( 'attributes' ).set( 'name', $me.val() );
		},

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

		toggleMultipleSelections: function( ev ) {
			// This field has been removed as Sencha Touch doesn't support multiple selections in a <select> group
			var $me = $( ev.currentTarget );
			if ( $me.is( ':checked' ) ) {
				this.model.get( 'attributes' ).set( 'multiple', 'checked' );
			}
			else {
				this.model.get( 'attributes' ).unset( 'multiple' );
			}
		},

		editTitle: function( ev ) {
			console.log('editTitle');
			ev.preventDefault();
			this.$title = $( ev.currentTarget );
			this.$( '.wx-form-builder-title-input' ).val( this.$title.text() ).show().select();
			this.$title.hide();
		},

		updateTitle: function( ev ) {
			console.log('updateTitle');
			var $me = $( ev.currentTarget );
			this.$title.text( $me.val() ).show();
			$me.hide();

			this.model.set( 'title', $me.val() );
		}

	});
})(jQuery);
