// views/formbuilder.control.checkbox.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlCheckboxGroupView = Backbone.View.extend({
		className: 'wx-form-builder-checkbox-group',

		initialize: function(options) {
			console.log('checkbox group view init');
			this.template = _.template( $('#form-builder-checkbox-group').html() );
			this.collection.bind('add', this.addOne, this);
			this.previewArea = options.previewArea;
		},

		render: function() {
			console.log('checkbox group view render');
			this.$el.html( this.template() );
			return this;
		},

		addOne: function( checkbox ) {
			var view = new wxApp.FormBuilderControlCheckboxView({
				model: checkbox,
				type: 'checkbox'
			});
			this.$el.append( view.render().el );

			this.previewArea.$('fieldset').append( view.getPreview().render().el );
		}

	});
})(jQuery);
