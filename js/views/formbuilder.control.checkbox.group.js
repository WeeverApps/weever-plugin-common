// views/formbuilder.control.checkbox.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlCheckboxGroupView = Backbone.View.extend({
		className: 'wx-form-builder-checkbox-group',

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
			var view = new wxApp.FormBuilderControlCheckboxView({
				model: checkbox,
				type: 'checkbox'
			});
			this.$el.append( view.render().el );

			$('.wx-form-preview-row fieldset').append( view.getPreview().render().el );
		}

	});
})(jQuery);
