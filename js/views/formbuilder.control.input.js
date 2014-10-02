
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlInputView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-input',
		preview: null,
		firstRender: true,

		initialize: function( options ) {
			options.type = (typeof options.type == 'undefined' ? 'input' : options.type );
			var $template = $( this[options.type + 'TplSelector'] );
			this.inputTpl = _.template( $template.html() );
		},

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'click .wx-form-builder-send-copy'   : 'setOptionalSendPdf'
			});
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlInputPreview({ model: this.model });
			}
			return this.preview;
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );

			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				setTimeout( function() { this.$('.wx-form-builder-label-input').focus(); }, 1);
				this.firstRender = false;
			}

			return this;
		},

		setOptionalSendPdf: function( ev ) {
			var $me = $( ev.currentTarget );
			this.model.set( 'optionSendPDF', $me.is(':checked') );
		},

	});

	wxApp.FormBuilderControlInputPreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-input-preview',

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			if ( model.attributes.min )
				this.$('input').attr('min', model.attributes.min );
			if ( model.attributes.max )
				this.$('input').attr('max', model.attributes.max );
			if ( model.attributes.step )
				this.$('input').attr('step', model.attributes.step );
			if ( model.attributes.value )
				this.$('input').attr('value', model.attributes.value );
			return this;
		}
	});
	
})(jQuery);