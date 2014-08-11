
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

			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				// We need to add this 1ms delay for Chrome and Safari, as otherwise the focus doesn't really happen.
				setTimeout( function() { this.$('.wx-form-builder-info').focus().select(); }, 1);
				this.firstRender = false;
			}

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

	wxApp.FormBuilderControlInfoPreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-info-preview',

		render: function() {
			var model = this.model.toJSON();
			model.innerHTML = model.innerHTML.replace(/\n/g, '<br/>');
			this.$el.html( this.inputTpl( model ) );
			return this;
		}
	});

})(jQuery);