// views/formbuilder.control.radio.fieldset.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioFieldsetView = Backbone.View.extend({
		tplSelector: '#form-builder-radio-fieldset',

		events: {
			'click .wx-form-builder-edit-title': 'editTitle',
			'blur .wx-form-builder-title-input': 'updateTitle',
			'click .wx-form-builder-allow-additional': 'setAllowAdditional'
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
