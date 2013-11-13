// views/formbuilder.control.base.fieldset.js

wxApp = wxApp || {};

(function($) {
	wxApp.FormBuilderControlBaseFieldsetView = Backbone.View.extend({
		tagName: 'section',
		className: 'wx-form-builder-row',
		preview: null,

		events: {
			// 'click .wx-form-builder-edit-title': 'editTitle',
			'keyup .wx-form-builder-title-input': 'updateTitle',
			// 'blur .wx-form-builder-name-input': 'setName',
			'click .wx-form-builder-allow-additional': 'setAllowAdditional',
			'click .wx-form-builder-delete': 'deleteControl',
			'click .wx-form-builder-add-option': 'addOption'
		},

		initialize: function() {
			console.log('Radio fieldset view init');
			var $template = $( this.tplSelector );
			this.tpl = _.template( $template.html() );
		},

		render: function() {
			console.log('checkbox fieldset view render');
			this.$el.html( this.tpl( this.model.toJSON() ) );
			return this;
		},

		deleteControl: function() {
			this.getPreview().remove();
			this.remove();
			this.model.destroy();
		},

		setAllowAdditional: function( ev ) {
			var $me = $( ev.currentTarget );
			if ( $me.is( ':checked' ) ) {
				this.model.set( 'allowAdditional', 'checked' );
			}
			else {
				this.model.set( 'allowAdditional', '' );
			}
		},

		updateTitle: function( ev ) {
			console.log('updateTitle');
			var $me = $( ev.currentTarget );

			this.$('.wx-form-builder-label').text( $me.val() );
			this.getPreview().$('legend').text( $me.val() );
			this.model.set( 'title', $me.val() );
		},

	});

	wxApp.FormBuilderControlBaseFieldsetPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-radio-fieldset-preview';
			var $template = $( selector );
			this.fieldsetTpl = _.template( $template.html() );
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.fieldsetTpl( model ) );

			return this;
		}
	});
})(jQuery);