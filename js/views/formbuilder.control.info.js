
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlInfoView = wxApp.FormBuilderControlView.extend({
		tplSelector: '#form-builder-info',
		preview: null,

		// Extend the events from the parent
		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'keyup .wx-form-builder-info': 'setInfo'
			});
		},

		initialize: function() {
			console.log('formbuildercontrolinfoview init');
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );
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
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlInfoPreview({ model: this.model });
			}
			return this.preview;
		}

	});

	wxApp.FormBuilderControlInfoPreview = Backbone.View.extend({
		tagName: 'div',
		className: 'wx-form-preview-row',

		initialize: function() {
			var selector = '#form-builder-info-preview';
			var $template = $( selector );
			this.inputTpl = _.template( $template.html() );
			this.model.bind('change', this.render, this);
		},

		render: function() {
			var model = this.model.toJSON();
			this.$el.html( this.inputTpl( model ) );
			return this;
		}
	});

})(jQuery);