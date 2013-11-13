// views/formbuilder.control.radio.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioGroupView = Backbone.View.extend({
		className: 'wx-form-builder-radio-group',

		initialize: function(options) {
			console.log('radio group view init');
			this.template = _.template( $('#form-builder-radio-group').html() );
			this.collection.bind('add', this.addOne, this);
			this.previewArea = options.previewArea;
		},

		render: function() {
			console.log('Radio Group');
			this.$el.html( this.template() );
			return this;
		},

		addOne: function( radio ) {
			var view = new wxApp.FormBuilderControlRadioView({
				model: radio,
				type: 'radio'
			});
			this.$el.append( view.render().el );

			this.previewArea.$('fieldset').append( view.getPreview().render().el );
		}

	});
})(jQuery);
