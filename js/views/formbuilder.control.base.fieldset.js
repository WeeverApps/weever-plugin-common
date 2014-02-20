// views/formbuilder.control.base.fieldset.js

wxApp = wxApp || {};

(function($) {
	wxApp.FormBuilderControlBaseFieldsetView = Backbone.View.extend({
		tagName: 'section',
		className: 'wx-form-builder-row',
		preview: null,

		events: {
			'keyup .wx-form-builder-title-input': 'updateTitle',
			'click .wx-form-builder-allow-additional': 'setAllowAdditional',
			'click .wx-form-builder-delete': 'deleteControl',
			'click .wx-form-builder-add-option': 'addOption',
			'click .wx-form-builder-required': 'setRequired'
		},

		initialize: function() {
			var $template = $( this.tplSelector );
			this.tpl = _.template( $template.html() );
		},

		render: function() {
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

		setRequired: function( ev ) {
			var $me = $( ev.currentTarget );
			if ( $me.is( ':checked' ) ) {
				this.model.get( 'attributes' ).set( 'required', 'checked' );
				this.getPreview().$('legend .required').css('display', 'inline');
			}
			else {
				this.model.get( 'attributes' ).unset( 'required' );
				this.getPreview().$('legend .required').css('display', 'none');
			}
		},

		updateTitle: function( ev ) {
			var $me = $( ev.currentTarget );

			this.$('.wx-form-builder-label').text( $me.val() );
			this.getPreview().$('legend .title').text( $me.val() );
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

			console.log('=== model ===');
			console.log( model );
			for (var i = 0; i < model.config.checkboxGroup.length; i++) {
				var checkbox = model.config.checkboxGroup[i]
				console.log('checkbox');
				console.log( checkbox );

				var view = new wxApp.FormBuilderControlCheckboxView({
					model: checkbox,
					type: 'checkbox'
				});
				this.previewArea.$('fieldset').append( view.getPreview().render().el );
			};

			return this;
		}
	});
})(jQuery);