
wxApp = wxApp || {};

(function($){
	wxApp.FormBuilderControlDocusignSignatureView = wxApp.FormBuilderControlView.extend({
		tplSelector: '#form-builder-docusign-signature',
		preview: null,

		events: function() {
			return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
				'change [name="wx-form-builder-docusign-label-option"]': 'labelOption'
			});
		},

		labelOption: function( ev ) {

			var option = this.model.get( 'labelOption' ),
				$ev = $( ev.currentTarget ),
				val = $ev.val(),
				valArray = val.split( '-' ),
				verb = valArray.shift(),
				field = valArray.shift(),
				fieldIndex = option.fields.indexOf( field );

			if ( $ev.is( ':checked' ) ) {
				option.verb = verb;
				if ( fieldIndex === -1 ) {
					option.fields.push( field );
				}
			}
			else {
				if ( fieldIndex !== -1 ) {
					option.fields.splice( fieldIndex, 1 );
				}
				if ( option.fields.length === 0 ) {
					option.verb = '';
				}
			}

			this.model.set( 'labelOption', option );

		},

		initialize: function() {
			var $template = $( this.tplSelector );
			this.inputTpl = _.template( $template.html() );
		},

		render: function() {

			var templateDataObject = this.model.toJSON();

			templateDataObject.appendName = '';
			templateDataObject.appendEmail = '';
			if ( templateDataObject.labelOption.fields.indexOf( 'email' ) > -1 ) {
				templateDataObject[ templateDataObject.labelOption.verb + 'Email' ] = 'checked';
			}
			if ( templateDataObject.labelOption.fields.indexOf( 'name' ) > -1 ) {
				templateDataObject[ templateDataObject.labelOption.verb + 'Name' ] = 'checked';
			}

			this.$el.html( this.inputTpl( templateDataObject ) );
						
			if ( this.firstRender ) {
				// Focus on the label the first time you render this control.
				// We need to add this 1ms delay for Chrome and Safari, as otherwise the focus doesn't really happen.
				setTimeout( function() { this.$('.wx-form-builder-label-input').focus(); }, 1);
				this.firstRender = false;
			}

			return this;
		},

		getPreview: function() {
			if ( this.preview === null ) {
				this.preview = new wxApp.FormBuilderControlDocusignSignaturePreview({ model: this.model });
			}
			return this.preview;
		}

	});

	wxApp.FormBuilderControlDocusignSignaturePreview = wxApp.FormBuilderControlPreview.extend({
		selector: '#form-builder-docusign-signature-preview'
	});

})(jQuery);