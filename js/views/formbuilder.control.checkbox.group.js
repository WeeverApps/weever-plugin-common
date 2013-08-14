// views/formbuilder.control.checkbox.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlCheckboxGroupView = Backbone.View.extend({

		initialize: function() {
			console.log('checkbox group view init');
			this.template = _.template( $('#form-builder-checkbox-group').html() );
			this.collection.bind('add', this.addOne, this);
		},

		render: function() {
			console.log('checkbox group view render');
			this.$el.html( this.template() );
			return this;
		},

		addOne: function( checkbox ) {
			console.log('checkbox group view add');
			var view = new wxApp.FormBuilderControlInputView({
				model: checkbox,
				type: 'checkbox'
			});
			this.$('.wx-form-builder-checkbox-group').append( view.render().el );
		}

	});
})(jQuery);
