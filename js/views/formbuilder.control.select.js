// views/formbuilder.control.select.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlSelectView = Backbone.View.extend({
		tagName: 'section',
		className: 'wx-form-builder-row',
		tplSelector: '#form-builder-select',
		preview: null,
		firstRender: true,

		events: {
			'keyup .wx-form-builder-title-input': 'updateTitle',
			'click .wx-form-builder-add-option': 'addOption',
			'click .wx-form-builder-allow-additional': 'setAllowAdditional',
			'click .wx-form-builder-delete': 'deleteControl',
			'click .wx-form-builder-required': 'setRequired',
			'focus .wx-form-builder-title-input': 'selectInputText'
		},

		selectInputText: function( ev ) {
			setTimeout( function() {
				ev.currentTarget.select();
			}, 1 );
		},

		initialize: function() {
			var $template = $( this.tplSelector );
			this.tpl = _.template( $template.html() );

		},

		render: function() {
			this.$el.html( this.tpl( this.model.toJSON() ) );
			
			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				// We need to add this 1ms delay for Chrome and Safari, as otherwise the focus doesn't really happen.
				setTimeout( function() { this.$('.wx-form-builder-title-input').focus(); }, 1);
				this.firstRender = false;
			}

			return this;
		},

		deleteControl: function() {
			this.remove();
			this.model.destroy();
		},

		addOption: function( ev ) {
			ev.preventDefault();
			this.model.get('optionGroup').add( new wxApp.FormBuilderControlOption() );
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

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlSelectPreview({ model: this.model });
			}
			return this.preview;
		},

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
			this.$('.wx-form-builder-edit-title').text( $me.val() );

			this.model.set( 'title', $me.val() );
			this.getPreview().$('label .title').text( $me.val() );
		}

	});

	wxApp.FormBuilderControlSelectPreview = wxApp.FormBuilderControlPreview.extend({

		initialize: function() {
			var selector = '#form-builder-select-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );

			for (var i = 0; i < this.model.get('optionGroup').length; i++) {
				var item = this.model.get('optionGroup').models[i];
				var view = new wxApp.FormBuilderControlOptionView({
					model: item
				});

				this.$('select').append( view.getPreview().render().el );
			};

			return this;
		}
	});
})(jQuery);
