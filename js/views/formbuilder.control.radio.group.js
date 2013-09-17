// views/formbuilder.control.radio.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioGroupView = Backbone.View.extend({

		initialize: function() {
			console.log('radio group view init');
			this.template = _.template( $('#form-builder-radio-group').html() );
			//console.log(this);
			this.collection.bind('add', this.addOne, this);
		},

		render: function() {
			this.$el.html( this.template() );
			return this;
		},

		addOne: function( radio ) {
			var view = new wxApp.FormBuilderControlInputView({
				model: radio,
				type: 'radio'
			});
			this.$('.wx-form-builder-radio-group').append( view.render().el );
		}

	});
})(jQuery);
