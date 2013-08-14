// views/formbuilder.control.option.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlOptionGroupView = Backbone.View.extend({

		initialize: function() {
			console.log('option group view init');
			this.template = _.template( $('#form-builder-option-group').html() );
			console.log(this);
			this.collection.bind('add', this.addOne, this);
		},

		render: function() {
			console.log('option group view render');
			this.$el.html( this.template() );
			return this;
		},

		addOne: function( option ) {
			console.log('option group view add');
			var view = new wxApp.FormBuilderControlOptionView({
				model: option
			});
			this.$('.wx-form-builder-option-group').append( view.render().el );
		}

	});
})(jQuery);
