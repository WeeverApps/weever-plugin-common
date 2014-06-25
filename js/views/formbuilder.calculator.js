
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderCalculatorView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-calculator',
		preview: null,
		inputs: null,

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'change .wx-calculation-field-1': 'changeField1',
				'change .wx-calculation-field-2': 'changeField2',
				'change .wx-calculation-operator': 'changeOperator'
			});
		},

		initialize: function( options ) {
			var $template = $( this.inputTplSelector );
			this.inputTpl = _.template( $template.html() );
			this.inputs   = options.inputs;
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderCalculatorPreview({ model: this.model });
			}
			return this.preview;
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );

			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				setTimeout( function() { this.$('.wx-form-builder-label-input').focus(); }, 1);
				this.firstRender = false;

				this.inputs.on('add',    this.updateDropDownLists, this);
				this.inputs.on('remove', this.updateDropDownLists, this);
				this.inputs.on('change', this.updateDropDownLists, this);
			}

			return this;
		},

		updateDropDownLists: function( e ) {
			var validInputs = [];
			for (var i = 0; i < this.inputs.length; i++) {
				var input = this.inputs.at(i);
				if ( input.get('attributes') && input.get('attributes').type === 'number' ) {
					validInputs.push( input );
				}
			};

			$('.wx-calculation-field-1').html('');
			$('.wx-calculation-field-2').html('');
			$.each(validInputs, function (i, item) {
			    $('.wx-calculation-field-1').append($('<option>', { 
			        value: item.get('attributes').attributes.name,
			        text : item.get('label')
			    }));
			    $('.wx-calculation-field-2').append($('<option>', { 
			        value: item.get('attributes').attributes.name,
			        text : item.get('label')
			    }));
			});

			// TODO - Select old values.
			// TODO - Update preview.
		},

		/* Start event callbacks */

		changeField1: function( e ) {
			var value = $( e.currentTarget ).val();
			this.model.set('control1', value);
		},

		changeField2: function( e ) {
			var value = $( e.currentTarget ).val();
			this.model.set('control2', value);
		},

		changeOperator: function( e ) {
			var value = $( e.currentTarget ).val();
			this.model.set('operation', value);
		},

		/* Endof event callbacks */
	});


	wxApp.FormBuilderCalculatorPreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-calculator-preview',

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			this.calculate();
			return this;
		},

		calculate: function() {
			console.log( 'calculating' );

			var me        = this,
			    model     = this.model.toJSON(),
			    control1  = $( "input[name='" + model.control1 + "']" ),
			    control2  = $( "input[name='" + model.control2 + "']" ),
			    operation = model.operation;

			if ( control1.length === 0 ) {
				this.$('.wx-form-builder-calculation-result').html( '<strong>#REF1!</strong>' );
				return;
			}
			if ( control2.length === 0 ) {
				this.$('.wx-form-builder-calculation-result').html( '<strong>#REF2!</strong>' );
				return;
			}

			control1.off('change');
			control2.off('change');
			control1.on('change', function() { me.calculate(); });
			control2.on('change', function() { me.calculate(); });

			var val1 = control1.val(),
			    val2 = control2.val();

			if (! $.isNumeric( val1 ) ) {
				this.$('.wx-form-builder-calculation-result').html( '<strong>#VAL1!</strong>' );
				return;
			}
			if (! $.isNumeric( val2 ) ) {
				this.$('.wx-form-builder-calculation-result').html( '<strong>#VAL2!</strong>' );
				return;
			}

			result = 0;
			val1 = parseFloat( val1 );
			val2 = parseFloat( val2 );

			switch ( operation ) {
				case '+':
					result = val1 + val2;
					break;
				case '-':
					result = val1 - val2;
					break;
				case '*':
					result = val1 * val2;
					break;
				case '/':
					result = val1 / val2;
					break;
			}

			this.$('.wx-form-builder-calculation-result').html( '<strong>' + result + '</strong>' );
		}
	});

})(jQuery);
