
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

			this.model.get( 'config' ).formElements = new wxApp.FormBuilderCollection();

//			$(window).on('beforeunload', function() {
//				return 'unload';
//			});

			// Populate default controls
//			var form = JSON.parse( '[{"control":"input","type":"text","label":"text1","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"text","valueClass":"","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"text","placeholder":"text1%20placeholder","value":"value1","required":"checked"}},{"control":"input","type":"text","label":"text2","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"text","valueClass":"","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"text","placeholder":"text2%20placeholder","value":"value2","required":"checked"}},{"control":"input","type":"","label":"password1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"password","required":"checked"}},{"control":"input","type":"","label":"password2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"password","required":"checked"}},{"control":"input","type":"","label":"date1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"date","required":"checked"}},{"control":"input","type":"","label":"date2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"date","required":"checked"}},{"control":"input","type":"","label":"datetime1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"datetime-local","required":"checked"}},{"control":"input","type":"","label":"datetime2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"datetime-local","required":"checked"}},{"control":"input","type":"","label":"email1","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"email","placeholder":"email1%20placeholder","multiple":"checked","required":"checked"}},{"control":"input","type":"","label":"email2","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"email","placeholder":"email2%20placeholder","multiple":"checked","required":"checked"}},{"control":"input","type":"","label":"file1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"file","accept":"image%2F*","multiple":"checked","required":"checked"}},{"control":"input","type":"","label":"file2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"file","accept":"image%2F*","multiple":"checked","required":"checked"}},{"control":"input","type":"","label":"month1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"month","required":"checked"}},{"control":"input","type":"","label":"month2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"month","required":"checked"}},{"control":"input","type":"","label":"number1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"","minClass":"","maxClass":"","stepClass":"","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"number","min":"0","max":"10","value":"0","step":"1","required":"checked"}},{"control":"input","type":"","label":"number2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"","minClass":"","maxClass":"","stepClass":"","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"number","min":"10","max":"100","value":"100","step":"10","required":"checked"}},{"control":"input","type":"","label":"telephone1","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"tel","placeholder":"telephone1%20placeholder","required":"checked"}},{"control":"input","type":"","label":"telephone2","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"tel","placeholder":"telephone2%20placeholder","required":"checked"}},{"control":"input","type":"","label":"time1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"time","required":"checked"}},{"control":"input","type":"","label":"time2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"time","required":"checked"}},{"control":"input","type":"","label":"url1","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"url","placeholder":"url1%20placeholder","required":"checked"}},{"control":"input","type":"","label":"url2","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"url","placeholder":"url2%20placeholder","required":"checked"}},{"control":"radiofieldset","title":"radio1%20title","allowAdditional":"checked","allowAdditionalClass":"","attributes":{},"radioGroup":[{"control":"input","type":"","label":"radio1a","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"radio","checked":"checked"},"collectionId":"c80"},{"control":"input","type":"","label":"radio1b","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"radio"},"collectionId":"c80"},{"control":"input","type":"","label":"radio1c","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"radio"},"collectionId":"c80"}]},{"control":"radiofieldset","title":"radio2%20title","allowAdditional":"checked","allowAdditionalClass":"","attributes":{},"radioGroup":[{"control":"input","type":"","label":"radio2a","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"radio"},"collectionId":"c87"},{"control":"input","type":"","label":"radio2b","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"radio","checked":"checked"},"collectionId":"c87"},{"control":"input","type":"","label":"radio2c","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"radio"},"collectionId":"c87"}]},{"control":"checkboxfieldset","title":"checkbox1%20title","allowAdditional":"checked","allowAdditionalClass":"","attributes":{},"checkboxGroup":[{"control":"input","type":"","label":"checkbox1a","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"checkbox","checked":"checked"},"collectionId":"c94"},{"control":"input","type":"","label":"checkbox1b","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"checkbox"},"collectionId":"c94"},{"control":"input","type":"","label":"checkbox1c","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"checkbox"},"collectionId":"c94"}]},{"control":"checkboxfieldset","title":"checkbox2%20title","allowAdditional":"checked","allowAdditionalClass":"","attributes":{},"checkboxGroup":[{"control":"input","type":"","label":"checkbox2a","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"checkbox"},"collectionId":"c101"},{"control":"input","type":"","label":"checkbox2b","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"checkbox","checked":"checked"},"collectionId":"c101"},{"control":"input","type":"","label":"checkbox2c","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"checkbox"},"collectionId":"c101"}]},{"control":"textarea","type":"","label":"textarea1","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"placeholder":"textarea1%20placeholder","required":"checked"}},{"control":"textarea","type":"","label":"textarea2","hidePlaceholderClass":"","showPlaceholder":true,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"placeholder":"textarea2%20placeholder","required":"checked"}},{"control":"input","type":"","label":"range1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"","minClass":"","maxClass":"","stepClass":"","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"range","min":"0","max":"10","value":"0","step":"1","required":"checked"}},{"control":"input","type":"","label":"range2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"checked","allowAdditionalClass":"","valueType":"number","valueClass":"","minClass":"","maxClass":"","stepClass":"","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"type":"range","min":"10","max":"100","value":"100","step":"10","required":"checked"}},{"control":"select","allowAdditional":"checked","allowAdditionalClass":"","attributes":{"multiple":"checked"},"optionGroup":[{"control":"option","type":"","label":"Option","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"select1optiona","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"value":"1a","selected":"checked"},"collectionId":"c120"},{"control":"option","type":"","label":"Option","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"select1optionb","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"value":"1b"},"collectionId":"c120"},{"control":"option","type":"","label":"Option","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"select1optionc","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"value":"1c"},"collectionId":"c120"}]},{"control":"select","allowAdditional":"checked","allowAdditionalClass":"","attributes":{"multiple":"checked"},"optionGroup":[{"control":"option","type":"","label":"Option","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"select2optiona","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"value":"2a"},"collectionId":"c127"},{"control":"option","type":"","label":"Option","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"select2optionb","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"value":"2b","selected":"checked"},"collectionId":"c127"},{"control":"option","type":"","label":"Option","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"select2optionc","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{"value":"2c"},"collectionId":"c127"}]},{"control":"div","type":"","label":"","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","innerHTML":"%3Ch1%3EInfo%20Text%201%3C%2Fh1%3E%0A%3Cp%3ELorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipiscing%20elit.%20Proin%20mattis%20sagittis%20purus%2C%20in%20consequat%20augue%20scelerisque%20at.%20Pellentesque%20nec%20lorem%20vel%20lectus%20egestas%20lobortis.%20Fusce%20euismod%20erat%20a%20tellus%20vulputate%20gravida.%20Integer%20a%20leo%20quis%20diam%20%3C%2Fp%3E","attributes":{}},{"control":"div","type":"","label":"","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","innerHTML":"%3Ch1%3EInfo%20Text%202%3C%2Fh2%3E%0A%3Cp%3EVestibulum%20a%20sodales%20augue.%20Curabitur%20non%20vulputate%20tellus.%20Integer%20eget%20elit%20purus.%20Phasellus%20id%20molestie%20velit.%20Cras%20interdum%20lectus%20sit%20amet%20accumsan%20vestibulum.%20Nulla%20congue%20ut%20leo%20sollicitudin%20hendrerit.%20Cum%20sociis%20natoque%20penatibus%20et%20magnis%20dis%20%3C%2Fp%3E","attributes":{}},{"control":"signature","type":"","label":"sig1","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{}},{"control":"signature","type":"","label":"sig2","hidePlaceholderClass":"wx-hide","showPlaceholder":false,"innerText":"","allowAdditional":"","allowAdditionalClass":"","valueType":"number","valueClass":"wx-hide","minClass":"wx-hide","maxClass":"wx-hide","stepClass":"wx-hide","multiClass":"wx-hide","requiredClass":"","autocompleteClass":"wx-hide","attributes":{}}]' );
//			for ( var i = 0; i < form.length; i++ ) {
//				this.controls.add( form[i] );
//			}
//			console.log( this.controls );
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
			'click .wx-form-builder-add-signature': 'addSignature'
//			,
//			'click .wx-finish-button': 'save'
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
				autocompleteClass: 'wx-hide',
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