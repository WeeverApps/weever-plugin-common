// views/formbuilder.control.option.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlOptionView = wxApp.FormBuilderControlView.extend({

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'click .wx-form-builder-add-select-option': 'addOption',
				'blur .wx-form-builder-select-option-text': 'updateOptionText',
				'blur .wx-form-builder-select-option-value': 'updateOptionValue'
			});
		},

		initialize: function() {
			this.selectTpl = _.template( $('#form-builder-select-option').html() );
//			this.model.bind('change', this.render, this);
		},

		render: function() {
			console.log('select view render');
			this.$el.html( this.selectTpl( this.model.toJSON() ) );
			return this;
		},

		addOption: function() {
			console.log('select view add');
			this.model.collection.add( new wxApp.FormBuilderControlOption() );
			console.log(this.model.collection);
		},

		updateOptionText: function( ev ) {
			var $me = $( ev.currentTarget );
			this.model.set({
				innerText: $me.val()
			});
			console.log( this.model.toJSONrecursive() );
		},

		updateOptionValue: function( ev ) {
			var $me = $( ev.currentTarget );
			if ( $me.val() != '' )
				this.model.get( 'attributes' ).set( 'value', $me.val() );
		}

	});
})(jQuery);
