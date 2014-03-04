wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioView = wxApp.FormBuilderControlBaseView.extend({
		tplSelector: '#form-builder-radio',

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlRadioPreview({ model: this.model });
			}
			return this.preview;
		},

		setChecked: function( ev ) {
			this.model.collection.models.forEach( function( control ) {
				control.get( 'attributes' ).unset( 'checked' );
			});
			this.model.get( 'attributes' ).set( 'checked', 'checked' );
			this.model.trigger('change');
		}
	});


	wxApp.FormBuilderControlRadioPreview = wxApp.FormBuilderControlBasePreview.extend({
		selector: '#form-builder-radio-preview'
	});

	wxApp.FormBuilderControlTextSliderOptionView = wxApp.FormBuilderControlBaseView.extend({
		tplSelector: '#form-builder-text-slider-option',

		render: function() {

			var jsonModel = this.model.toJSON();
			this.$el.html( this.inputTpl( jsonModel ) );

			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				// We need to add this 1ms delay for Chrome and Safari, as otherwise the focus doesn't really happen.
				setTimeout( function() { this.$('.wx-form-builder-title-input').focus(); }, 1);
				this.firstRender = false;
			}

			return this;
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlTextSliderOptionPreview({ model: this.model });
			}
			return this.preview;
		},

		setChecked: function( ev ) {
			this.model.collection.models.forEach( function( control ) {
				control.get( 'attributes' ).unset( 'checked' );
			});
			this.model.get( 'attributes' ).set( 'checked', 'checked' );
			this.model.trigger('change');
		}
	});


	wxApp.FormBuilderControlTextSliderOptionPreview = Backbone.View.extend({
		tagName: 'li',
		selector: '#form-builder-text-slider-option-preview',

		initialize: function() {
			var $template = $( this.selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			console.log('Render');
			var jsonModel = this.model.toJSON();
			
			this.$el.html( this.inputTpl( jsonModel ) );
			return this;
		}

	});
})(jQuery);