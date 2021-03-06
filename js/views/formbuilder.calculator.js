
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
			var me = this;
			me.$el.html( me.inputTpl( me.model.toJSON() ) );

			if ( me.firstRender ) {
				// Focus on the label the first time you render this control.
				setTimeout( function() { me.$('.wx-form-builder-label-input').focus(); }, 1);
				me.firstRender = false;

				me.inputs.on('add',    me.updateDropDownLists, me);
				me.inputs.on('remove', me.updateDropDownLists, me);
				me.inputs.on('change', me.updateDropDownLists, me);
			}

			me.updateDropDownLists();
			return me;
		},

		updateDropDownLists: function( e ) {
			var me            = this,
			    dropDownLists = this.$('.wx-calculation-field'),
			    validInputs   = [];

			for (var i = 0; i < this.inputs.length; i++) {
				var input = this.inputs.at(i);
				validInputs.push( input );
			};

			$.each(dropDownLists, function(i, ddl) {
				ddl = $(ddl);

				// Cache the current value & re-initialize the drop down list.
				ddl.html('<option></option>');

				// Build the drop down lists.
				$.each(validInputs, function (i, item) {
					var label   = item.get('label'),
					    ordinal = item.get('ordinal');

				    ddl.append($('<option>', { 
				        value: ordinal,
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
				ddl.val( field.get('ordinal') );
				if ( i > 0 ) {
					me.$('.wx-calculation-operator[data-index="' + i.toString() + '"]').val( field.get('operation') );
				}
				if ( field.get('ordinal') == 'wxConstantValue' ) {
					me.$('div.wx-constant[data-index="' + i.toString() + '"]').show();
				}
				me.$('div.wx-constant[data-index="' + i.toString() + '"] input').val( field.get('constant') );
			});
			
			// Re-render preview (timeout is to ensure the number controls are completely rendered).
			setTimeout(function() {
				me.getPreview().render();
			}, 100);
		},

		/* Start event callbacks */

		addField: function( e ) {
			e.preventDefault();
			this.model.get('fields').add( new wxApp.FormBuilderCalculatorField() );
			this.render();
		},

		deleteField: function( e ) {
			e.preventDefault();
			var ctl = $( e.currentTarget ),
			    i   = ctl.data('index');
			this.model.get('fields').remove( this.model.get('fields').at( i ) );
			this.render();
		},

		changeConstant: function( e ) {
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

			this.model.get('fields').at(i).set('ordinal', val);
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

		initialize: function (attrs, options) {
	        wxApp.FormBuilderControlPreview.prototype.initialize.apply(this, arguments); // call super constructor
	        Backbone.Events.on( 'recalculate', this.recalculate, this );
	    },

		recalculate: function( that ) {
			if ( this.cid !== that.cid ) {
				this.calculate();
			}
		},

		render: function() {
			var me    = this,
			    model = me.model.toJSON();
			me.$el.html( me.inputTpl( model ) );
			me.calculate();
			return me;
		},

		calculate: function() {
			var me            = this,
			    model         = me.model.toJSON(),
			    valid         = true,
			    values        = [],
			    decimalPlaces = 0,
			    result        = 0,
			    form          = me.$el.parents('.wx-validate-feed');

			me.$el.removeClass('wx-error');
			for (var i = 0; i < model.fields.length; i++) {
				var field   = model.fields.models[i].attributes.ordinal,
				    control = form.find("input[data-ordinal='" + field + "']");

				if ( !field ) {
					me.$el.addClass('wx-error');
					me.$('.wx-form-builder-calculation-result strong').html( 'Please update the settings for this field' );
					valid = false;
					return;
				}
				
				if ( field == 'wxConstantValue' ) {
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
					me.$('.wx-form-builder-calculation-result strong').html( 'Could not find a field for the calculation.' );
					valid = false;
					return;
				}

				// Update event listeners.
				control.off( 'change' );
				control.on( 'change', function() { me.calculate(); } );

				var value = control.val();
				if (! $.isNumeric( value ) ) {
					var label = $('.wx-form-control-' + field + ' .wx-form-builder-label-input').val();
					me.$('.wx-form-builder-calculation-result strong').html( 'The value in <em>' + label + '</em> is not a number.' );
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
				var oldResult = me.$('input[type="hidden"]').val();
				me.$('input[type="hidden"]').val( result );

				// If the value has changed, notify the other controls.
				if ( result != oldResult ) {
					Backbone.Events.trigger( 'recalculate', me );
				}
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
