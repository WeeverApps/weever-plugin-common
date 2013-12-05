// views/formbuilder.control.option.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlOptionGroupView = Backbone.View.extend({
		className: 'wx-form-builder-option-group',

		initialize: function( options ) {
			this.template = _.template( $('#form-builder-option-group').html() );
			this.collection.bind('add', this.addOne, this);
			this.previewArea = options.previewArea;
		},

		render: function() {
			this.$el.html( this.template() );
			return this;
		},

		addOne: function( option ) {
			var view = new wxApp.FormBuilderControlOptionView({
				model: option
			});

			this.$el.append( view.render().el );
			
			this.previewArea.$('select').append( view.getPreview().render().el );
		}

	});
})(jQuery);
