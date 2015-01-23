// views/formbuilder.control.base.group.js

wxApp = wxApp || {};

(function($) {
	wxApp.FormBuilderControlBaseGroupView = Backbone.View.extend({
		firstRender: true,

		initialize: function(options) {
			this.template = _.template( $( this.tplSelector ).html() );
			this.collection.bind('add', this.addOne, this);
			this.previewArea = options.previewArea;
		},

		render: function() {
			this.$el.html( this.template() );

			if ( this.firstRender ) {
				this.firstRender = false;
				for (var i = 0; i < this.collection.length; i++) {
					var model = this.collection.at(i);
					this.addOne( model );
				};
			}

			return this;
		},

		addToView: function( view, controlName ) {
			if ( !controlName )
				controlName = 'fieldset';
			this.$el.append( view.render().el );
			this.previewArea.$( controlName ).append( view.getPreview().render().el );
		}

	});
})(jQuery);