
wxApp = wxApp || {};

(function($){
    wxApp.FormBuilderSubTabEditView = wxApp.SubTabEditView.extend({
		previewPaneSelector: '.wx-form-builder-preview',

        subTabEditTplSelector: '#form-builder-subtab-edit-template',

        initializeEvents: function() {
            this.events = _.extend({}, this.genericEvents, this.events);
//			this.controls = new wxApp.FormBuilderCollection();
        },

		initialize: function() {
			// Call parent's initialize() function
			this.constructor.__super__.initialize.apply( this, arguments );
			console.log('FormBuilderSubTabEditView initialize');
			
			if (this.model.get( 'config' ).formElements == undefined) {
				
				// New form; set the collection
				this.model.get('config').formElements = new wxApp.FormBuilderCollection();
			
			} else {

				// Load currently existing form elements.
				console.log( this.model.get( 'config' ).formElements );
				var elementsJson = JSON.parse( this.model.get( 'config' ).formElements );

				this.model.get('config').formElements = new wxApp.FormBuilderCollection();

				for (var i = elementsJson.length - 1; i >= 0; i--) {

					var input = new wxApp.FormBuilderControlInput( elementsJson[i] );
					input.get( 'attributes' ).set( elementsJson[i].attributes );

					var inputView = new wxApp.FormBuilderControlInputView({
						model: input
					});
					this.$( this.previewPaneSelector ).append( inputView.render().el );

					this.model.get( 'config' ).formElements.push( input );

				};
			}
		},

		setModelFromView: function( model ) {
			console.log( 'setModelFromView' );
//			model.setConfig( 'formElements', JSON.stringify( this.model.get( 'config' ).formElements ) );
			console.log( model.toJSON() );
			return model;
		},

        events: {
            'click .wx-form-builder-add-text-input': 'addTextInput',
			'click .wx-form-builder-add-password-input': 'addPasswordInput',
			'click .wx-form-builder-add-date-input': 'addDateInput',
			'click .wx-form-builder-add-datetime-local-input': 'addDateTimeLocalInput',
			'click .wx-form-builder-add-email-input': 'addEmailInput',
			'click .wx-form-builder-add-file-input': 'addFileInput',
			'click .wx-form-builder-add-month-input': 'addMonthInput',
			'click .wx-form-builder-add-number-input': 'addNumberInput',
			'click .wx-form-builder-add-tel-input': 'addTelInput',
			'click .wx-form-builder-add-time-input': 'addTimeInput',
			'click .wx-form-builder-add-url-input': 'addUrlInput',
			'click .wx-form-builder-add-radio-group': 'addRadioGroup',
			'click .wx-form-builder-add-checkbox-group': 'addCheckboxGroup',
			'click .wx-form-builder-add-textarea': 'addTextarea',
			'click .wx-form-builder-add-range-input': 'addRangeInput',
			'click .wx-form-builder-add-select': 'addSelect',
			'click .wx-form-builder-add-info': 'addInfo',
			'click .wx-form-builder-add-signature': 'addSignature',
			'click .wx-form-builder-add-custom-action': 'addCustomAction',
			'click .wx-form-builder-add-email-action': 'addEmailAction'
//			,
//			'click .wx-finish-button': 'save'
		},

		addEmailAction: function() {
			console.log( 'addEmailAction' );

			var action = this.addCustomAction( { method : 'email' } );

			return action;
		},

		addCustomAction: function( customAction ) {
			console.log( 'addCustomAction' );
			var action = new wxApp.FormBuilderAction();
			if ( typeof customAction == 'object' ) {
				action.set( customAction );
			}

			var actionView = new wxApp.FormBuilderActionView({
				model: action
			});
			this.$( this.previewPaneSelector ).append( actionView.render().el );

			this.model.get( 'config' ).formElements.push( action );
			return action;
		},

		addInput: function( properties ) {
			var mainProperties = {};
			var attributes = {};
			for ( var propKey in properties ) {
				if ( propKey != 'attributes' ) {
					mainProperties[propKey] = properties[propKey];
				}
				else {
					for ( var attrKey in properties[propKey] ) {
						attributes[attrKey] = properties[propKey][attrKey];
					}
				}
			}

			var input = new wxApp.FormBuilderControlInput( mainProperties );
			input.get( 'attributes' ).set( attributes );

			var inputView = new wxApp.FormBuilderControlInputView({
				model: input
			});
			this.$( this.previewPaneSelector ).append( inputView.render().el );

//			this.model.get( 'controls' ).push( input );
			this.model.get( 'config' ).formElements.push( input );
			return input;
		},

		addDateInput: function() {
			this.addInput({
				label: 'Date',
//				minClass: '',
//				maxClass: '',
//				valueClass: '',
//				minType: 'date',
//				maxType: 'date',
//				valueType: 'date',
				attributes: {
					type: 'date'
				}
			});
		},

		addDateTimeLocalInput: function() {
			this.addInput({
				label: 'Date/Time',
//				minClass: '',
//				maxClass: '',
//				stepClass: '',
//				valueClass: '',
//				minType: 'date',
//				maxType: 'date',
//				valueType: 'date',
				attributes: {
					type: 'datetime-local'
				}
			});
		},

		addEmailInput: function() {
			this.addInput({
				label: 'Email',
				showPlaceholder: true,
				multiClass: '',
				attributes: {
					type: 'email'
				}
			});
		},

		addFileInput: function() {
			this.addInput({
				label: 'File',
				multiClass: '',
				autocompleteClass: 'hide',
				attributes: {
					type: 'file',
					accept: 'image/*'
				}
			});
		},

		addMonthInput: function() {
			this.addInput({
				label: 'Month',
				attributes: {
					type: 'month'
				}
			});
		},

		addNumberInput: function() {
			this.addInput({
				label: 'Number',
				minClass: '',
				maxClass: '',
				stepClass: '',
				valueClass: '',
				attributes: {
					type: 'number'
				}
			});
		},

		addPasswordInput: function() {
			this.addInput({
				label: 'Password',
				attributes: {
					type: 'password'
				}
			});
		},

		addRangeInput: function() {
			this.addInput({
				label: 'Range',
				minClass: '',
				maxClass: '',
				stepClass: '',
				valueClass: '',
				attributes: {
					type: 'range'
				}
			});
		},

		addTelInput: function() {
			this.addInput({
				label: 'Telephone',
				showPlaceholder: true,
				attributes: {
					type: 'tel'
				}
			});
		},

		addTextInput: function() {
			this.addInput({
				label: 'Text',
				type: 'text',
				showPlaceholder: true,
				valueType: 'text',
				valueClass: '',
				attributes: {
					type: 'text'
				}
			});
		},

		addTimeInput: function() {
			this.addInput({
				label: 'Time',
				attributes: {
					type: 'time'
				}
			});
		},

		addUrlInput: function() {
			this.addInput({
				label: 'URL',
				showPlaceholder: true,
				attributes: {
					type: 'url'
				}
			});
		},

		addInfo: function( event ) {
			var info = new wxApp.FormBuilderControlInfo();
			var infoView = new wxApp.FormBuilderControlInfoView({
				model: info
			});
			this.$( this.previewPaneSelector ).append( infoView.render().el );
//			this.model.get( 'controls' ).push( info );
			this.model.get( 'config' ).formElements.push( info );
		},

		addSignature: function() {
			var signature = new wxApp.FormBuilderControlSignature();
			var signatureView = new wxApp.FormBuilderControlSignatureView({
				model: signature
			});
			this.$( this.previewPaneSelector ).append( signatureView.render().el );
//			this.model.get( 'controls' ).push( signature );
			this.model.get( 'config' ).formElements.push( signature );
		},

		addTextarea: function() {
			var textArea = new wxApp.FormBuilderControlTextarea();
			var textAreaView = new wxApp.FormBuilderControlTextareaView({
				model: textArea
			});
			this.$( this.previewPaneSelector ).append( textAreaView.render().el );
//			this.model.get( 'controls' ).push( textArea );
			this.model.get( 'config' ).formElements.push( textArea );
		},

		addRadioGroup: function() {
			var radioFieldset = new wxApp.FormBuilderControlRadioFieldset();
			var radioFieldsetView = new wxApp.FormBuilderControlRadioFieldsetView({
				model: radioFieldset
			});
			this.$( this.previewPaneSelector ).append( radioFieldsetView.render().el );

			var radioGroupView = new wxApp.FormBuilderControlRadioGroupView({
				collection: radioFieldset.get( 'radioGroup' )
			});

			radioFieldsetView.$( '.wx-form-builder-radio-fieldset' ).append( radioGroupView.render().el );
			radioFieldset.get( 'radioGroup' ).add( new wxApp.FormBuilderControlRadio() );
//			this.model.get( 'controls' ).push( radioFieldset );
			this.model.get( 'config' ).formElements.push( radioFieldset );
		},

		addCheckboxGroup: function() {
			var checkboxFieldset = new wxApp.FormBuilderControlCheckboxFieldset();
			var checkboxFieldsetView = new wxApp.FormBuilderControlCheckboxFieldsetView({
				model: checkboxFieldset
			});
			this.$( this.previewPaneSelector ).append( checkboxFieldsetView.render().el );

			var checkboxGroupView = new wxApp.FormBuilderControlCheckboxGroupView({
				collection: checkboxFieldset.get( 'checkboxGroup' )
			});

			checkboxFieldsetView.$( '.wx-form-builder-checkbox-fieldset' ).append( checkboxGroupView.render().el );

			checkboxFieldset.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox() );

//			this.model.get( 'controls' ).push( checkboxFieldset );
			this.model.get( 'config' ).formElements.push( checkboxFieldset );
		},

		/**
		 * Structure:
		 * Select Model
		 *     allowMultipleSelections
		 *     optionCollection (current Select Group)
		 *         model: Option
		 *
		 *         Option Model
		 *             (current Select Model)
		 */
		addSelect: function() {
			var select = new wxApp.FormBuilderControlSelect();
			var selectView = new wxApp.FormBuilderControlSelectView({
				model: select
			});

			// Add Select to preview pane
			this.$( this.previewPaneSelector ).append( selectView.render().el );

			var optionGroupView = new wxApp.FormBuilderControlOptionGroupView({
				collection: select.get('optionGroup')
			});

			// Add Option Group to Select
			selectView.$( '.wx-form-builder-select' ).append( optionGroupView.render().el );

			// Add an Option to the Option Group
			select.get('optionGroup').add( new wxApp.FormBuilderControlOption() );

			// Add Select to control collection
//			this.model.get( 'controls' ).push( select );
			this.model.get( 'config' ).formElements.push( select );
		}
//		,
//
//		save: function() {
//			wx.log( 'formbuilder save' );
//			wx.log( this.controls.toJSONrecursive() );
//			wx.log( JSON.stringify( this.controls.toJSONrecursive() ) );
//			wx.log( 'Form Objects: ' + this.controls.length );
//			alert( JSON.stringify( this.controls.toJSONrecursive() ) );
//		}

	});
})(jQuery);