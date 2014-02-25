
wxApp = wxApp || {};

(function($){

	var templateDataObject = {};

	wxApp.FormBuilderControlInputView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-input',
		preview: null,
		firstRender: true,

		initialize: function( options ) {
			options.type = (typeof options.type == 'undefined' ? 'input' : options.type );
			var $template = $( this[options.type + 'TplSelector'] );
			this.inputTpl = _.template( $template.html() );
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlInputPreview({ model: this.model });
			}
			return this.preview;
		},

		render: function() {

			templateDataObject = getTemplateDataObject( this.model );

//			console.log( templateDataObject.toJSON() );
//			console.log( this.model.toJSON() );

			this.$el.html( this.inputTpl( templateDataObject ) );
//			this.$el.html( this.inputTpl( this.model.toJSON() ) );

			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				setTimeout( function() { this.$('.wx-form-builder-label-input').focus(); }, 1);
				this.firstRender = false;
			}

			return this;
		}
	});

	wxApp.FormBuilderControlInputPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-input-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			console.log('render preview');
//			var model = this.model.toJSON();
			templateDataObject = getTemplateDataObject( this.model );
			var model = templateDataObject;
			console.log( model );
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

	var getTemplateDataObject = function( model ) {
		console.log( 'getTemplateDataObject' );

		console.log( model.get( 'controlTitle' ) );

		var min = model.get( 'htmlAttributes' ).get( 'min' );
		var max = model.get( 'htmlAttributes' ).get( 'max' );
		var step = model.get( 'htmlAttributes' ).get( 'step' );
		var value = model.get( 'htmlAttributes' ).get( 'value' );
		var showPlaceholder = model.get( 'showPlaceholder' );

		var extensions = {
			minClass: ( typeof min == 'undefined' ? 'hide' : '' ),
			maxClass: ( typeof max == 'undefined' ? 'hide' : '' ),
			stepClass: ( typeof step == 'undefined' ? 'hide' : '' ),
			valueClass: ( typeof value == 'undefined' ? 'hide' : '' ),
			hidePlaceholderClass: ( showPlaceholder ? '' : 'hide' ),
			requiredClass: ''
		};

		var htmlAttributesExtensions = {
//			placeholder: ''
		};

		var extendedHtmlAttributes = _.extend( {}, htmlAttributesExtensions, model.toJSONrecursive().htmlAttributes );

		var extended = _.extend( {}, extensions, model.toJSONrecursive() );

		extended.htmlAttributes = extendedHtmlAttributes;

		console.log( model.toJSONrecursive() );
		console.log( extended );

		return extended;

	};
	
})(jQuery);