
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderFinishElementView = Backbone.View.extend({
		className: 'wx-form-builder-finish-row',

		initialize: function() {
			console.log( 'finish element view init' );
			var $template = $( '#form-builder-finish-element' );
			this.template = _.template( $template.html() );
			return this;
		},

		render: function() {
			console.log( 'finish element render' );
			console.log( this.model );
			this.$el.html( this.template( this.model.toJSON() ) );
			console.log( 'finish element render end' );
			return this;
		}
	});

	wxApp.FormBuilderFinishView = Backbone.View.extend({

		events: {
			'click input[type=radio]': 'setIdFieldIndex',
			'blur .wx-form-builder-upload-message': 'setUploadMessage'
		},

		initialize: function() {
			console.log( 'finish view init' );
			this.template = _.template( $('#form-builder-finish').html() );
			console.log( this.model );
		},

		render: function() {
			console.log( 'finish view render' );
			this.$el.html( this.template({
				collection: this.model.get( 'config' ).formElements
			}) );
			return this;
		},

		setUploadMessage: function( ev ) {
			this.model.get( 'config' ).onUpload.message = $( ev.currentTarget ).val();
		},

		setIdFieldIndex: function( ev ) {
			console.log( 'setIdFieldIndex' );
			console.log( $( ev.currentTarget ) );
			this.model.get( 'config' ).idFieldIndex = parseInt( $( ev.currentTarget ).attr( 'value' ) );
			console.log( this.model );
		}

	});
})(jQuery);