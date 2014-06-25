
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderCalculatorView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-calculator',
		preview: null,
		inputs: null,

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
		}
	});


	wxApp.FormBuilderCalculatorPreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-calculator-preview',

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			return this;
		}
	});

})(jQuery);
