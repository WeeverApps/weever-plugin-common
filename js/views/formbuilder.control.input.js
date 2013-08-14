
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlInputView = wxApp.FormBuilderControlView.extend({
		inputTplSelector: '#form-builder-input',
		radioTplSelector: '#form-builder-radio',
		checkboxTplSelector: '#form-builder-checkbox',

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'click .wx-form-builder-add-radio': 'addRadio',
				'click .wx-form-builder-add-checkbox': 'addCheckbox'
			});
		},

		initialize: function( options ) {
			console.log( options );
			options.type = (typeof options.type == 'undefined' ? 'input' : options.type );
			var $template = $( this[options.type + 'TplSelector'] );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.inputTpl( this.model.toJSON() ) );
			return this;
			console.log('input render');
		},

		addRadio: function() {
			console.log('radio view add');
			console.log(this.model);
			this.model.collection.add( new wxApp.FormBuilderControlRadio() );
			console.log(this.model.collection);
		},

		addCheckbox: function() {
			console.log('checkbox view add');
			console.log(this.model);
			this.model.collection.add( new wxApp.FormBuilderControlCheckbox() );
			console.log(this.model.collection);
		}

	});
})(jQuery);