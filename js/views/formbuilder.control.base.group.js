// views/formbuilder.control.base.group.js

wxApp = wxApp || {};

(function($) {
	wxApp.FormBuilderControlBaseGroupView = Backbone.View.extend({

		initialize: function(options) {
			this.template = _.template( $( this.tplSelector ).html() );
			this.collection.bind('add', this.addOne, this);
			this.previewArea = options.previewArea;
		},

		render: function() {
			this.$el.html( this.template() );
			return this;
		},

		addToView: function( view ) {
			this.$el.append( view.render().el );

			this.previewArea.$('fieldset').append( view.getPreview().render().el );
		}

	});
})(jQuery);