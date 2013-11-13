// views/formbuilder.control.option.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlOptionGroupView = Backbone.View.extend({
		className: 'wx-form-builder-option-group',

		initialize: function( options ) {
			console.log('option group view init');
			console.log( options.collection );
			console.log( this.collection );
			this.template = _.template( $('#form-builder-option-group').html() );
			this.collection.bind('add', this.addOne, this);
			this.previewArea = options.previewArea;
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

			this.$el.append( view.render().el );
			
			this.previewArea.$('select').append( view.getPreview().render().el );
		}

	});
})(jQuery);
