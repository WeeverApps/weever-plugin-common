
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlInfoView = wxApp.FormBuilderControlView.extend({
		tplSelector: '#form-builder-info',

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'blur .wx-form-builder-info': 'setInfo'
			});
		},

		initialize: function() {
			console.log('formbuildercontrolinfoview init');
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );
//			this.model.bind('change', this.render, this);
		},

		render: function() {
			console.log('formbuildercontrolinfoview render');
			var modelJSON = this.model.toJSON();
			var inputTpl = this.inputTpl( modelJSON );
			this.$el.html( inputTpl );
			return this;
		},

		setInfo: function( ev ) {
			var $me = $( ev.currentTarget );
			this.model.set( 'innerHTML', $me.val() );
		}

	});
})(jQuery);