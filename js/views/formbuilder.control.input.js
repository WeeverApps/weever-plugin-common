
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlInputView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-input',
		// radioTplSelector: '#form-builder-radio',
		// checkboxTplSelector: '#form-builder-checkbox',
		preview: null,

		// Extend the events from the parent
		// events: function() {
		// 	return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
		// 		// 'click .wx-form-builder-add-radio': 'addRadio',
		// 		// 'click .wx-form-builder-add-checkbox': 'addCheckbox'
		// 	});
		// },

		initialize: function( options ) {
			console.log( options );
			options.type = (typeof options.type == 'undefined' ? 'input' : options.type );
			var $template = $( this[options.type + 'TplSelector'] );
			this.inputTpl = _.template( $template.html() );
			// this.model.bind('change', this.render, this);
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlInputPreview({ model: this.model });
			}
			return this.preview;
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		} //,

		// addRadio: function() {
		// 	console.log('radio view add');
		// 	console.log(this.model);
		// 	this.model.collection.add( new wxApp.FormBuilderControlRadio() );
		// 	console.log(this.model.collection);
		// },

		// addCheckbox: function() {
		// 	console.log('checkbox view add');
		// 	console.log(this.model);
		// 	this.model.collection.add( new wxApp.FormBuilderControlCheckbox() );
		// 	console.log(this.model.collection);
		// }

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
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			if ( model.attributes.attributes.min )
				this.$('input').attr('min', model.attributes.attributes.min );
			if ( model.attributes.attributes.max )
				this.$('input').attr('max', model.attributes.attributes.max );
			if ( model.attributes.attributes.step )
				this.$('input').attr('step', model.attributes.attributes.step );
			if ( model.attributes.attributes.value )
				this.$('input').attr('value', model.attributes.attributes.value );
			return this;
		}

	});

	wxApp.FormBuilderControlRadioView = wxApp.FormBuilderControlView.extend({
		tagName: 'div',
		className: 'row',
		radioTplSelector: '#form-builder-radio',
		preview: null,

		initialize: function( options ) {
			console.log( options );
			var $template = $( this.radioTplSelector );
			this.inputTpl = _.template( $template.html() );
			// this.model.bind('change', this.render, this);
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlRadioPreview({ model: this.model });
			}
			return this.preview;
		},

		updateLabel: function( ev ) {
			console.log('updateRadioLabel');
			var value = $( ev.currentTarget ).val();
			this.model.set( 'label', value );
		},

		setChecked: function( ev ) {
			this.model.collection.models.forEach( function( control ) {
				control.get( 'attributes' ).unset( 'checked' );
			});
			this.model.get( 'attributes' ).set( 'checked', 'checked' );
			this.model.trigger('change');
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		}
	});


	wxApp.FormBuilderControlRadioPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-radio-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			console.log('render radio');
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		}

	});

	wxApp.FormBuilderControlCheckboxView = wxApp.FormBuilderControlView.extend({
		tagName: 'div',
		className: 'row',
		checkTplSelector: '#form-builder-checkbox',
		preview: null,

		initialize: function( options ) {
			console.log( options );
			var $template = $( this.checkTplSelector );
			this.inputTpl = _.template( $template.html() );
			// this.model.bind('change', this.render, this);
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlCheckboxPreview({ model: this.model });
			}
			return this.preview;
		},

		updateLabel: function( ev ) {
			console.log('updateLabel');
			var value = $( ev.currentTarget ).val();
			this.model.set( 'label', value );
		},

		setChecked: function( ev ) {
			// this.model.collection.models.forEach( function( control ) {
			// 	control.get( 'attributes' ).unset( 'checked' );
			// });
			if ( this.model.get( 'attributes' ).get( 'checked' ) ) {
				this.model.get( 'attributes' ).unset( 'checked' );
			} else {
				this.model.get( 'attributes' ).set( 'checked', 'checked' );
			}
			this.model.trigger('change');
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		}
	});


	wxApp.FormBuilderControlCheckboxPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-checkbox-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
		}

	});


})(jQuery);