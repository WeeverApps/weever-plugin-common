// views/formbuilder.control.radio.group.js

wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlRadioGroupView = Backbone.View.extend({
		className: 'wx-form-builder-radio-group',

		initialize: function() {
			console.log('radio group view init');
			this.template = _.template( $('#form-builder-radio-group').html() );
			//console.log(this);
			this.collection.bind('add', this.addOne, this);
		},

		render: function() {
			console.log('Radio Group');
			console.log( this.template() );
			this.$el.html( this.template() );
			return this;
		},

		addOne: function( radio ) {
			var view = new wxApp.FormBuilderControlRadioView({
				model: radio,
				type: 'radio'
			});
			this.$el.append( view.render().el );

			$('.wx-form-preview-row fieldset').append( view.getPreview().render().el );
		}

	});
})(jQuery);
