
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlView = Backbone.View.extend({
		tagName: 'section',
		className: 'wx-form-builder-row',
		firstRender: true,

		events: {
			// 'click .wx-form-builder-edit-label': 'editLabel',
			'keyup .wx-form-builder-label-input': 'updateLabel',
			'keyup .wx-form-builder-text-input': 'updateText',
			'keyup .wx-form-builder-placeholder-input': 'updatePlaceholder',
			'blur .wx-form-builder-min-input': 'setMin',
			'blur .wx-form-builder-max-input': 'setMax',
			'blur .wx-form-builder-value-input': 'setValue',
			'blur .wx-form-builder-step-input': 'setStep',
			'blur .wx-form-builder-name-input': 'setName',
			// 'click .wx-form-builder-autocomplete': 'setAutocomplete',
			'click .wx-form-builder-control-checked': 'setChecked',
			// 'click .wx-form-builder-control-selected': 'setSelected',
			// 'click .wx-form-builder-allow-multiple': 'setMultiple',
			// 'click .wx-form-builder-allow-additional': 'setAllowAdditional',
			'click .wx-form-builder-required': 'setRequired',
			'click .wx-form-builder-delete': 'deleteControl',
			'focus .wx-form-builder-select-option-text': 'selectInputText',
			'focus .wx-form-builder-label-input': 'selectInputText',
			'focus .wx-form-builder-text-input': 'selectInputText',
			'focus .wx-form-builder-input': 'selectInputText'
		},

		selectInputText: function( ev ) {
			setTimeout( function() {
				ev.currentTarget.select();
			}, 1 );
		},

		deleteControl: function() {
			console.log( 'deleteControl' );
			this.getPreview().remove();
			this.remove();
			this.model.destroy();
		},

		// editLabel: function( ev ) {
		// 	console.log('editLabel');
		// 	ev.preventDefault();
		// 	this.$label = $( ev.currentTarget );
		// 	this.$( '.wx-form-builder-label-input' ).val( this.$label.text() ).show().select();
		// 	this.$label.hide();
		// },

		updateLabel: function( ev ) {
			var value = $( ev.currentTarget ).val();
			this.model.set( 'label', value );

			// Update the title on the 'Add Fields' tab
			this.$('.wx-form-builder-label').text( value );
		},

		updateText: function( ev ) {
			console.log('updateText');
			var value = $( ev.currentTarget ).val();
			this.model.set( 'text', value );
		},

		updatePlaceholder: function(ev) {
			var $me = $( ev.currentTarget );

			// Backbone doesn't notice when attributes are changed, so we 
			// have to trigger a change even manually.
			this.model.get('attributes').set('placeholder', $me.val());
			this.model.trigger('change');
		},

		getFixedValue: function( value, decimalPlaces ) {
			var fixedValue;
			if ( typeof value == 'string' ) {
				fixedValue = parseFloat( value ).toFixed( decimalPlaces );
			}
			else if ( typeof value == 'number' ) {
				fixedValue = value.toFixed( decimalPlaces );
			}
			return fixedValue; // returns a string!
		},

		setMin: function( ev ) {
			// Limit to 2 decimal places
			var fixedValue = this.getFixedValue( $( ev.currentTarget ).val(), 2 );
			$( ev.currentTarget ).val( fixedValue );
			this.model.get( 'attributes' ).set( 'min', parseFloat( fixedValue ) );
			this.model.trigger('change');
		},

		setMax: function ( ev ) {
			// Limit to 2 decimal places
			var fixedValue = this.getFixedValue( $( ev.currentTarget ).val(), 2 );
			$( ev.currentTarget ).val( fixedValue );
			this.model.get( 'attributes' ).set( 'max', parseFloat( fixedValue ) );
			this.model.trigger('change');
		},

		setValue: function ( ev ) {
			// Limit to 2 decimal places
			var fixedValue = this.getFixedValue( $( ev.currentTarget ).val(), 2 );
			$( ev.currentTarget ).val( fixedValue );
			this.model.get( 'attributes' ).set( 'value', parseFloat( fixedValue ) );
			this.model.trigger('change');
		},

		setStep: function ( ev ) {
			// Limit to 2 decimal places
			var fixedValue = this.getFixedValue( $( ev.currentTarget ).val(), 2 );
			$( ev.currentTarget ).val( fixedValue );
			this.model.get( 'attributes' ).set( 'step', parseFloat( fixedValue ) );
			this.model.trigger('change');
		},

		setName: function( ev ) {
			var $me = $( ev.currentTarget );
			if ( $me.val() !== '' )
				this.model.get( 'attributes' ).set( 'name', $me.val() );

			this.getInput().attr( 'name', $me.val() );
			this.model.trigger('change');
		},

		setAutocomplete: function( ev ) {
			this.model.get( 'attributes' ).set( 'autocomplete', $( ev.currentTarget ).val() );
		},

		setChecked: function( ev ) {
			console.log('setChecked');
			this.model.collection.models.forEach( function( control ) {
				control.get( 'attributes' ).unset( 'checked' );
			});
			this.model.get( 'attributes' ).set( 'checked', 'checked' );
			this.model.trigger('change');
		},

		// setSelected: function( ev ) {
		// 	console.log('setSelected');
		// 	this.model.collection.models.forEach( function( control ) {
		// 		control.get( 'attributes' ).unset( 'selected' );
		// 	});
		// 	this.model.get( 'attributes' ).set( 'selected', 'checked' );
		// },

		setMultiple: function( ev ) {
			console.log('setMultiple');
			var $me = $( ev.currentTarget );
			if ( $me.is( ':checked' ) ) {
				this.model.get( 'attributes' ).set( 'multiple', 'checked' );
			}
			else {
				this.model.get( 'attributes' ).unset( 'multiple' );
			}
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

		setRequired: function( ev ) {
			var $me = $( ev.currentTarget );
			if ( $me.is( ':checked' ) ) {
				this.model.get( 'attributes' ).set( 'required', 'checked' );
			}
			else {
				this.model.get( 'attributes' ).unset( 'required' );
			}

			// Backbone doesn't notice when attributes are changed, so we 
			// have to trigger a change even manually.
			this.model.trigger('change');
		},

		getInput: function() {
			var $input = this.$('.wx-form-builder-' + this.model.get('attributes').get('type') + '-input');
			if ( $input.length == 0 ) {
				// Must be a text area.
				$input = this.$('.wx-form-builder-textarea');
			}
			return $input;
		}

	});

	wxApp.FormBuilderControlPreview = Backbone.View.extend({
		tagName  : 'div',
		className: 'wx-form-preview-row',
		selector : '',
		events   : {
			'click'        : 'selectField',
			'sortable-drop': 'sortableDrop'
		},

		initialize: function() {
			var $template = $( this.selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			return this;
		},

		sortableDrop: function( event, index ) {
			console.log( 'sortableDrop', this.model );
			console.log( index );
			this.$el.trigger( 'sortable-update', [this.model, index] );
		},

		selectField: function() {
			var ordinal = this.model.get('ordinal');

			// Highlight this control.
			$('.wx-form-preview-row').removeClass('wx-active');
			this.$el.addClass('wx-active');

			// Show this control.
			$('.wx-form-builder-row').removeClass('wx-active');
			$('#wx-form-control-' + ordinal).addClass('wx-active');

			// Make sure the settings tab is active.
			$('a[href="#panel-field-settings"]').click();
		}
	});
})(jQuery);