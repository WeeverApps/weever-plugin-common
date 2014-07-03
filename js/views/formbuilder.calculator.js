
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderCalculatorView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-calculator',
		preview: null,
		inputs: null,

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'click .wx-add-calculation-field'   : 'addField',
				'click .wx-delete-calculation-field': 'deleteField',
				'change .wx-calculation-field'      : 'changeField',
				'change .wx-calculation-operator'   : 'changeOperator',
				'blur input.wx-constant'            : 'changeConstant',
				'change input.wx-constant'          : 'changeConstant'
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

			this.updateDropDownLists();
			return this;
		},

		updateDropDownLists: function( e ) {
			var me            = this,
			    dropDownLists = this.$('.wx-calculation-field'),
			    validInputs   = [];

			for (var i = 0; i < this.inputs.length; i++) {
				var input = this.inputs.at(i);
				if (( input.get('attributes') && input.get('attributes').type === 'number' ) ||
					( input.get('control') === 'calculation' )) {
					validInputs.push( input );
				}
			};

			$.each(dropDownLists, function(i, ddl) {
				ddl = $(ddl);

				// Cache the current value & re-initialize the drop down list.
				ddl.html('<option></option>');

				// Build the drop down lists.
				$.each(validInputs, function (i, item) {
					var label = item.get('label'),
					    name  = '';

					if ( item.get('attributes') )
						name = item.get('attributes').attributes.name;
					else
						name = label.toLowerCase().replace(' ', '-');

				    ddl.append($('<option>', { 
				        value: name,
				        text : label
				    }));
				});

				// Add Constant Value option
				ddl.append($('<option>', {
					value: 'wxConstantValue',
					text : '[Constant Value]'
				}))

				// Select old values.
				var field = me.model.get('fields').at( i );
				ddl.val( field.get('name') );
				if ( i > 0 ) {
					me.$('.wx-calculation-operator[data-index="' + i.toString() + '"]').val( field.get('operation') );
				}
				if ( field.get('name') == 'wxConstantValue' ) {
					me.$('div.wx-constant[data-index="' + i.toString() + '"]').show();
				}
				me.$('div.wx-constant[data-index="' + i.toString() + '"] input').val( field.get('constant') );
			});
			
			// Re-render preview.
			this.getPreview().render();
		},

		/* Start event callbacks */

		addField: function( e ) {
			this.model.get('fields').add( new wxApp.FormBuilderCalculatorField() );
			this.render();
		},

		deleteField: function( e ) {
			var ctl = $( e.currentTarget ),
			    i   = ctl.data('index');
			this.model.get('fields').remove( this.model.get('fields').at( i ) );
			this.render();
		},

		changeConstant: function( e ) {
			console.log( 'CHANGE Constant' );
			var ctl = $( e.currentTarget ),
			    val = ctl.val(),
			    i   = ctl.parent().parent().data('index');
			this.model.get('fields').at(i).set('constant', parseFloat( val ));
			this.model.trigger('change');
		},

		changeField: function( e ) {
			var ctl = $( e.currentTarget ),
			    val = ctl.val(),
			    i   = ctl.data('index');

			if ( val === 'wxConstantValue' ) {
				this.$('div.wx-constant[data-index="' + i + '"]').slideDown();
			}
			else {
				this.$('div.wx-constant[data-index="' + i + '"]').slideUp();
			}

			this.model.get('fields').at(i).set('name', val);
			this.model.trigger('change');
		},

		changeOperator: function( e ) {
			var ctl = $( e.currentTarget ),
			    val = ctl.val(),
			    i   = ctl.data('index');
			this.model.get('fields').at(i).set('operation', val);
			this.model.trigger('change');
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
			var me            = this,
			    model         = this.model.toJSON(),
			    valid         = true,
			    values        = [],
			    decimalPlaces = 0,
			    result        = 0;
			console.log('MODEL', model);

			me.$el.removeClass('wx-error');
			for (var i = 0; i < model.fields.length; i++) {
				var fieldName = model.fields.models[i].attributes.name,
				    control   = $("input[name='" + fieldName + "']");

				if ( !fieldName ) {
					me.$el.addClass('wx-error');
					me.$('.wx-form-builder-calculation-result strong').html( 'Please select a field from the drop down list.' );
					valid = false;
					return;
				}
				
				if ( fieldName == 'wxConstantValue' ) {
					var value = parseFloat( model.fields.models[i].attributes.constant );
					if ( isNaN( value ) ) {
						me.$el.addClass('wx-error');
					}
					decimalPlaces = Math.max( decimalPlaces, me.countDecimalPlaces( value ) );
					values.push( value );
					continue;
				}

				if ( control.length === 0 ) {
					me.$el.addClass('wx-error');
					me.$('.wx-form-builder-calculation-result strong').html( 'Could not find control with name <em>' + fieldName + '</em>.' );
					valid = false;
					return;
				}

				// Update event listeners.
				control.off( 'change' );
				control.on( 'change', function() { me.calculate(); } );

				var value = control.val();

				if (! $.isNumeric( value ) ) {
					me.$('.wx-form-builder-calculation-result strong').html( 'The value in <em>' + fieldName + '</em> is not a number.' );
					valid = false;
					continue;
				}

				decimalPlaces = Math.max( decimalPlaces, me.countDecimalPlaces( value ) );
				values.push( parseFloat( value ) );
			};

			if ( !valid ) {
				me.$('input[type="hidden"]').val( 0 );
				me.$('input[type="hidden"]').trigger('change');
				return;
			}

			result = values[0];
			for (var i = 1; i < model.fields.length; i++) {
				var operation = model.fields.models[i].attributes.operation;

				switch ( operation ) {
					case '+':
						result = result + values[i];
						break;
					case '-':
						result = result - values[i];
						break;
					case '*':
						result = result * values[i];
						break;
					case '/':
						result = result / values[i];
						break;
				}
			};

			if ( result ) {
				result = result.toFixed( decimalPlaces );
				me.$('.wx-form-builder-calculation-result strong').html( result );
				me.$('input[type="hidden"]').val( result );
				me.$('input[type="hidden"]').trigger('change');
			}
		},

		// http://stackoverflow.com/a/10454560
		countDecimalPlaces: function( num ) {
			var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
			if (!match) { return 0; }
			return Math.max(
				0,
				// Number of digits right of decimal point.
				(match[1] ? match[1].length : 0)
				// Adjust for scientific notation.
				- (match[2] ? +match[2] : 0));
		}
	});

})(jQuery);
