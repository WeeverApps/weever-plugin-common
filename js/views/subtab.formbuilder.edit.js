
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderSubTabEditView = wxApp.SubTabEditView.extend({
		previewPaneClass: 'wx-preview-form',
		buildPaneSelector: '#form-build-area',
		subTabEditTplSelector: '#form-builder-subtab-edit-template',
		hasCalledFinish: false,
		finishView: null,
		previews: null,

		initializeEvents: function() {
			this.events = _.extend({}, this.genericEvents, this.events);
		},

		initialize: function() {
			// Call parent's initialize() function
			wxApp.SubTabEditView.prototype.initialize.apply( this, arguments );
			console.log('FormBuilderSubTabEditView initialize');

			// Clear the preview window
			$( '.wx-validate-feed' ).html( '<br><h3 class="subheader">' + this.model.get('title') + ' &mdash; preview</h3>' );
			$( '.wx-validate-feed' ).append( '<div class="' + this.previewPaneClass + '"></div>' );
			$( '.wx-validate-feed' ).append( '<br><button class="success radius">' + this.model.get('buttonText') + '</button><br><br>' );
			$( '.wx-validate-feed' ).addClass( 'panel' );

			if ( typeof this.model.get( 'config' ).formElements == 'undefined' ) {
				this.model.get( 'config' ).formElements = new wxApp.FormBuilderCollection();
			}
			else {
				// Load currently existing form elements.
				console.log( this.model.get( 'config' ).formElements );
				var elementsJson;
				try {
					elementsJson = JSON.parse( this.model.get( 'config' ).formElements );
				} catch(err) {
					elementsJson = this.model.get( 'config' ).formElements.toJSON();
				}

				this.model.get('config').formElements = new wxApp.FormBuilderCollection();

				for ( var i = 0; i < elementsJson.length; i++ ) {

					if ( elementsJson[i].control === 'div' ) {

						this.addInfoWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].control === 'textarea' ) {

						this.addTextareaWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].control === 'radiofieldset' ) {

						this.addRadioGroupWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].control === 'checkboxfieldset' ) {

						this.addCheckboxGroupWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].control === 'select' ) {

						this.addSelectWithProperties( elementsJson[i] );

					} else if ( elementsJson[i].type === 'textSlider' ) {

						this.addTextSlider( elementsJson[i] );

					} else {

						this.addInput( elementsJson[i] );

					}
				}
			}

			if ( typeof this.model.get( 'config' ).formActions == 'undefined' ) {
				this.getDefaultFormActions();
			}
			else {
				// Load currently existing form actions.
				console.log( this.model.get( 'config' ).formActions );
				var actionsJson;
				try {
					actionsJson = JSON.parse( this.model.get( 'config' ).formActions );
				} catch(err) {
					actionsJson = this.model.get( 'config' ).formActions.toJSON();
				}

				this.model.get( 'config' ).formActions = new Backbone.Collection();

				for ( var i = 0; i < actionsJson.length; i++ ) {
					var action = actionsJson[i];
					if ( action.method == 'docusign' ) {
						this.addDocusignAction( null, action );
					}
					else if ( action.method == 'post' ) {
						this.addPostAction( null, action );
					}
					else if ( action.method == 'email' ) {
						this.addEmailAction( null, action );
					}
				}
			}

			if ( typeof this.model.get( 'config' ).onUpload == 'string' ) {
				this.model.get( 'config' ).onUpload = JSON.parse( this.model.get( 'config' ).onUpload );
			}

		},

		validate: function() {
			var success = false;
			$('.wx-form-builder-action').each(function(index, value) { 
				var $text = $( value );
				if ( $text.val() ) {
					success = true;
				}
			});

			if (!success) {
				// Display an error message.
				var errorMessage = "Sorry! Your form could not be saved.  Please add an email recipient or custom post action in &ldquo;Form submission settings&rdquo;.";
				var $alert = $('.alert-box.alert .message').html( errorMessage );
				$alert.parent().slideDown();
			}

			return success;
		},

		getDefaultFormActions: function() {
			
			console.log(' FORMBUILDER FORM ACTIONS ');
			this.model.get( 'config' ).formActions = new Backbone.Collection();
			var post = new wxApp.FormBuilderAction();
			post.set( { method: 'post' } );
			var email = new wxApp.FormBuilderAction();
			email.set( { method: 'email' } );

			this.model.get( 'config' ).formActions.push( post );
			this.model.get( 'config' ).formActions.push( email );

			this.addPostAction( post );
			this.addEmailAction( email );

		},

		setModelFromView: function( model ) {

			for (var i = 0; i < model.get( 'config' ).formActions.length; i++) {
				var action = model.get( 'config' ).formActions.models[i];
				if ( action.get( 'method' ) === 'post' || action.get( 'method' ) === 'email' ) {

					// Remove from array if nothing is set.
					if ( !action.get('value') ) {
						model.get( 'config' ).formActions.remove( action );
						i--;
					}

				} else {

					// DocuSign - Remove from array if nothing is set.
					if ( (typeof action.get('username') === 'undefined') || !action.get('password') ) {
						model.get( 'config' ).formActions.remove( action );
						i--;
					}
				}
			};

			return model;
		},

		events: {
			'click .wx-form-builder-add-text-input': 'addTextInput',
			'click .wx-form-builder-add-password-input': 'addPasswordInput',
			'click .wx-form-builder-add-date-input': 'addDateInput',
			'click .wx-form-builder-add-datetime-local-input': 'addDateTimeLocalInput',
			'click .wx-form-builder-add-email-input': 'addEmailInput',
			'click .wx-form-builder-add-file-input': 'addFileInput',
			'click .wx-form-builder-add-photo-input': 'addPhotoInput',
			'click .wx-form-builder-add-month-input': 'addMonthInput',
			'click .wx-form-builder-add-number-input': 'addNumberInput',
			'click .wx-form-builder-add-tel-input': 'addTelInput',
			'click .wx-form-builder-add-time-input': 'addTimeInput',
			'click .wx-form-builder-add-url-input': 'addUrlInput',
			'click .wx-form-builder-add-radio-group': 'addRadioGroup',
			'click .wx-form-builder-add-checkbox-group': 'addCheckboxGroup',
			'click .wx-form-builder-add-textarea': 'addTextarea',
			'click .wx-form-builder-add-range-input': 'addRangeInput',
			'click .wx-form-builder-add-text-range-input': 'addTextRangeInput',
			'click .wx-form-builder-add-select': 'addSelect',
			'click .wx-form-builder-add-info': 'addInfo',
			// 'click .wx-form-builder-add-docusign-action': 'addDocusignAction',
			// 'click .wx-form-builder-add-post-action': 'addPostAction',
			// 'click .wx-form-builder-add-email-action': 'addEmailAction',
			'keyup .button-text': 'updateButtonText',
			'sortable-update': 'sortableUpdate'
		},

		updateButtonText: function( ev ) {
			var $text = $( ev.currentTarget );
			this.model.set( 'buttonText', $text.val() );

			// Update in the preview panel.
			$('.wx-validate-feed.panel button.success').text( $text.val() );
		},

		sortableUpdate: function( event, model, position ) {
			console.log( 'sortableUpdate' );
			var formElements = this.model.get( 'config' ).formElements;

			formElements.remove( model );

			formElements.each( function( model, index ) {
				var ordinal = index;
				if ( index >= position ) {
					ordinal += 1;
				}
				model.set( 'ordinal', ordinal );
			});

			model.set( 'ordinal', position );
			formElements.add( model, {at: position} );

			// Re-render the previews.
			var me = this;
			$( '.' + this.previewPaneClass ).html( '' );
			formElements.each( function( model, index ) {
				for (var i = 0; i < me.previews.length; i++) {
					var preview = me.previews[i];
					if ( preview.model.cid === model.cid ) {
						$( '.' + me.previewPaneClass ).append( preview.render().el );
						break;
					}
				}
			});
		},

		/**
		 * Override __super__.finish()
		 */
		finish: function() {
			console.log( 'subtab.formbuilder.edit.finish()' );
			console.log( this );

			var hasUpload = false,
				formElements = this.model.get( 'config' ).formElements,
				formActions = this.model.get( 'config' ).formActions,

				/**
				 * Should be called using .call( this ) or .apply( this ) so that the scope remains the same
				 */
				addFinishView = function() {
					this.finishView = new wxApp.FormBuilderFinishView({
						model: this.model
					});
					this.$( this.buildPaneSelector ).append( this.finishView.render().el );
				};

			console.log( formElements );
			console.log( formActions );

			// Check for an upload element
			var model = {};
			for ( var i = 0; i < formElements.length; i++ ) {
				model = formElements.at( i );
				if ( 'input' == model.get( 'control' ) && 'file' == model.get( 'attributes' ).get( 'type' ) ) {
					hasUpload = true;
					break;
				}
			}

			// Call super and exit if an index has already been identified
			if ( ! hasUpload || typeof this.model.get( 'config' ).idFieldIndex == 'number' ) {
				wxApp.SubTabEditView.prototype.finish.apply( this );
				return;
			}

			// Select index
			if ( typeof this.model.get( 'config' ).idFieldIndex != 'number' && ! this.hasCalledFinish ) {
				addFinishView.apply( this );
				this.hasCalledFinish = true;
				return;
			}

			// Re-add finish view in case elements have changed
			if ( this.hasCalledFinish ) {
				this.finishView.remove();
				addFinishView.apply( this );
			}

		},

		addDocusignAction: function( event, properties ) {
			console.log( 'addDocusignAction' );

			var action;
			if ( typeof properties != 'undefined' ) {
				action = this.addCustomAction( properties );
			}
			else {
				action = this.addCustomAction( { method : 'docusign' } );
			}

			return action;
		},

		addEmailAction: function( event, properties ) {
			console.log( 'addEmailAction' );

			var action;
			if ( typeof properties != 'undefined' ) {
				action = this.addCustomAction( properties );
			}
			else {
				action = this.addCustomAction( { method : 'email' } );
			}

			return action;
		},

		addPostAction: function( event, properties ) {
			console.log( 'addPostAction' );

			var action;
			if ( typeof properties != 'undefined' ) {
				action = this.addCustomAction( properties );
			}
			else {
				action = this.addCustomAction( { method : 'post' } );
			}

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
			this.$( '#form-settings-accordion' ).append( actionView.render().el );

			this.model.get( 'config' ).formActions.push( action );
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
			for ( var attrKey in attributes ) {
				input.get( 'attributes' )[attrKey] = attributes[attrKey];
			};

			var inputView = new wxApp.FormBuilderControlInputView({
				model: input
			});
			
			this.addControl( input, inputView );

			return input;
		},

		addTextSlider: function( properties ) {
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

			var input = new wxApp.FormBuilderControlTextRange( mainProperties );
			for ( var attrKey in attributes ) {
				input.get( 'attributes' )[attrKey] = attributes[attrKey];
			};

			var inputView = new wxApp.FormBuilderControlTextRangeView({
				model: input
			});

			this.addControl( input, inputView );

			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'S. Disagree' } ) );
			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'Disagree' } ) );
			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'N/A' } ) );
			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'Agree' } ) );
			input.get( 'options' ).add( new wxApp.FormBuilderControlTextSliderOption( { text: 'S. Agree' } ) );
			
			return input;
		},

		addDateInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Date',
				attributes: {
					type: 'date'
				}
			});
		},

		addDateTimeLocalInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Date / Time',
				attributes: {
					type: 'datetime-local'
				}
			});
		},

		addEmailInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Email',
				showPlaceholder: true,
				multiClass: '',
				attributes: {
					type: 'email'
				}
			});
		},

		addFileInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'File upload',
				multiClass: '',
				autocompleteClass: 'hide',
				attributes: {
					type: 'file',
					accept: 'image/*'
				}
			});
		},

		addPhotoInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Photo upload',
				multiClass: '',
				autocompleteClass: 'hide',
				attributes: {
					type: 'file',
					accept: 'image/*'
				}
			});
		},

		addMonthInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Month',
				attributes: {
					type: 'month'
				}
			});
		},

		addNumberInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
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

		addPasswordInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Password',
				showPlaceholder: true,
				attributes: {
					type: 'password'
				}
			});
		},

		addRangeInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Untitled',
				minClass: '',
				maxClass: '',
				stepClass: '',
				valueClass: '',
				attributes: {
					type: 'range'
				}
			});
		},

		addTextRangeInput: function(ev) {
			this.addTextSlider({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Select One',
				type: 'textSlider',
				attributes: {
					type: 'textSlider'
				}
			});
		},

		addTelInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Telephone',
				type: 'tel',
				showPlaceholder: true,
				attributes: {
					type: 'tel'
				}
			});
		},

		addTextInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Untitled',
				type: 'text',
				showPlaceholder: true,
				attributes: {
					type: 'text'
				}
			});
		},

		addTimeInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'Time',
				attributes: {
					type: 'time'
				}
			});
		},

		addUrlInput: function(ev) {
			this.addInput({
				controlTitle: $(ev.currentTarget).text(),
				label: 'URL',
				showPlaceholder: true,
				attributes: {
					type: 'url'
				}
			});
		},

		addInfo: function( ev ) {
			this.addInfoWithProperties( { 
				controlTitle: $(ev.currentTarget).text() 
			} );
		},

		addInfoWithProperties: function( properties ) {

			var info = new wxApp.FormBuilderControlInfo( properties );
			var infoView = new wxApp.FormBuilderControlInfoView({
				model: info
			});

			this.addControl( info, infoView );
			// this.$( this.buildPaneSelector ).append( infoView.render().el );
			// this.model.get( 'config' ).formElements.push( info );

		},

		addTextarea: function(ev) {
			this.addTextareaWithProperties( {
				controlTitle: $(ev.currentTarget).text()
			} );
		},

		addTextareaWithProperties: function( properties ) {

			var textArea = new wxApp.FormBuilderControlTextarea( properties );
			var textAreaView = new wxApp.FormBuilderControlTextareaView({
				model: textArea
			});

			this.addControl( textArea, textAreaView );
			// this.$( this.buildPaneSelector ).append( textAreaView.render().el );
			// this.model.get( 'config' ).formElements.push( textArea );
		},

		addRadioGroup: function(ev) {
			this.addRadioGroupWithProperties( {
				controlTitle: $(ev.currentTarget).text()
			} );
		},

		addRadioGroupWithProperties: function( properties ) {
			var radioFieldset = new wxApp.FormBuilderControlRadioFieldset( properties );
			var radioFieldsetView = new wxApp.FormBuilderControlRadioFieldsetView({
				model: radioFieldset
			});

			// this.$( this.buildPaneSelector ).append( radioFieldsetView.render().el );
			this.addControl( radioFieldset, radioFieldsetView );

			var radioGroupView = new wxApp.FormBuilderControlRadioGroupView({
				collection: radioFieldset.get( 'radioGroup' ),
				previewArea: radioFieldsetView.getPreview()
			});

			radioFieldsetView.$( '.wx-form-builder-radio-fieldset' ).append( radioGroupView.render().el );

			if ( properties.radioGroup == undefined || properties.radioGroup.length == 0 ) {
				var optionA = new wxApp.FormBuilderControlRadio( { label: 'Option A' } );
				var optionB = new wxApp.FormBuilderControlRadio( { label: 'Option B' } );
				var optionC = new wxApp.FormBuilderControlRadio( { label: 'Option C' } );

				radioFieldset.get( 'radioGroup' ).add( optionA );
				radioFieldset.get( 'radioGroup' ).add( optionB );
				radioFieldset.get( 'radioGroup' ).add( optionC );
			} else {
				for ( var i = 0; i < properties.radioGroup.length; i++ ) {
					var option = new wxApp.FormBuilderControlRadio( properties.radioGroup[i] );
					radioFieldset.get( 'radioGroup' ).add( option );
				};
			}
			
			// radioFieldsetView.getPreview().render();
			// this.model.get( 'config' ).formElements.push( radioFieldset );
		},

		addCheckboxGroup: function(ev) {
			this.addCheckboxGroupWithProperties( {
				controlTitle: $(ev.currentTarget).text()
			} );
		},

		addCheckboxGroupWithProperties: function( properties ) {
			var checkboxFieldset = new wxApp.FormBuilderControlCheckboxFieldset( properties );
			var checkboxFieldsetView = new wxApp.FormBuilderControlCheckboxFieldsetView({
				model: checkboxFieldset
			});

			// this.$( this.buildPaneSelector ).append( checkboxFieldsetView.render().el );
			this.addControl( checkboxFieldset, checkboxFieldsetView );

			var checkboxGroupView = new wxApp.FormBuilderControlCheckboxGroupView({
				collection: checkboxFieldset.get( 'checkboxGroup' ),
				previewArea: checkboxFieldsetView.getPreview()
			});

			checkboxFieldsetView.$( '.wx-form-builder-checkbox-fieldset' ).append( checkboxGroupView.render().el );

			if ( properties.checkboxGroup == undefined || properties.checkboxGroup.length == 0 ) {
				checkboxFieldset.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox({label: 'Option A'}) );
				checkboxFieldset.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox({label: 'Option B'}) );
				checkboxFieldset.get( 'checkboxGroup' ).add( new wxApp.FormBuilderControlCheckbox({label: 'Option C'}) );
			} else {
				for ( var i = 0; i < properties.checkboxGroup.length; i++ ) {
					var option = new wxApp.FormBuilderControlCheckbox( properties.checkboxGroup[i] );
					checkboxFieldset.get( 'checkboxGroup' ).add( option );
				};
			}

			// this.model.get( 'config' ).formElements.push( checkboxFieldset );
		},

		/**
		 * Structure:
		 * Select Model
		 *	 allowMultipleSelections
		 *	 optionCollection (current Select Group)
		 *		 model: Option
		 *
		 *		 Option Model
		 *			 (current Select Model)
		 */
		addSelect: function(ev) {
			this.addSelectWithProperties( {
				controlTitle: $(ev.currentTarget).text()
			} );
		},

		addSelectWithProperties: function( properties ) {
			var select = new wxApp.FormBuilderControlSelect( properties );
			var selectView = new wxApp.FormBuilderControlSelectView({
				model: select
			});

			this.addControl( select, selectView );

			// Add Select to build pane
			// this.$( this.buildPaneSelector ).append( selectView.render().el );

			var optionGroupView = new wxApp.FormBuilderControlOptionGroupView({
				collection: select.get('optionGroup'),
				previewArea: selectView.getPreview()
			});

			// Add Option Group to Select
			selectView.$( '.wx-form-builder-select' ).append( optionGroupView.render().el );

			// Add an Option to the Option Group
			console.log( properties );
			if ( properties.optionGroup == undefined || properties.optionGroup.length == 0 ) {
				select.get('optionGroup').add( new wxApp.FormBuilderControlOption( { innerText: 'Option A' } ) );
				select.get('optionGroup').add( new wxApp.FormBuilderControlOption( { innerText: 'Option B' } ) );
				select.get('optionGroup').add( new wxApp.FormBuilderControlOption( { innerText: 'Option C' } ) );
			} else {
				for ( var i = 0; i < properties.optionGroup.length; i++ ) {
					var option = new wxApp.FormBuilderControlOption( properties.optionGroup[i] );
					select.get('optionGroup').add( option );
				};
			}
		},

		addControl: function( input, view ) {
			var count = this.model.get( 'config' ).formElements.length;
			count++;
			input.set( 'ordinal', count );

			this.$( this.buildPaneSelector ).append( view.render().el );
			
			// Open the newly added tab.
			$('.wx-form-builder-row').removeClass('active');
			view.$el.addClass('active');

//			this.model.get( 'controls' ).push( input );
			this.model.get( 'config' ).formElements.push( input );
			$( this.buildPaneSelector ).foundation('section', 'reflow');

			// Now scroll down to it
			var offset = $('.wx-form-builder-row.active').offset().top - 230;
			console.log( offset );
			$('#form-creation').animate({scrollTop: offset}, 1000);

			// Add the preview to the Preview tab.
			if ( !this.previews ) {
				this.previews = []
			}
			this.previews.push( view.getPreview() );
			console.log( 'previews:' + this.previews.length );
			$( '.' + this.previewPaneClass ).append( view.getPreview().render().el );
		}

	});

	wxApp.DocuSignSubTabEditView = wxApp.FormBuilderSubTabEditView.extend({

		validate: function() {
			var success = false;
			if ( $('.wx-form-builder-docusign-username').val() && $('.wx-form-builder-docusign-password').val() ) {
				success = true;
			}

			if (!success) {
				// Display an error message.
				var errorMessage = "Your form could not be saved! Please enter your DocuSign&trade; username and password under the <b>Form Settings</b> tab.";
				var $alert = $('.alert-box.alert .message').html( errorMessage );
				$alert.parent().slideDown();
			}


			return success;
		},

		getDefaultFormActions: function() {
			console.log(' DOCUSIGN FORM ACTIONS ');

			this.model.get( 'config' ).formActions = new Backbone.Collection();
			var post = new wxApp.FormBuilderAction();
			post.set( { method: 'post' } );
			var docusign = new wxApp.FormBuilderAction();
			docusign.set( { method: 'docusign' } );

			this.model.get( 'config' ).formActions.push( post );
			this.model.get( 'config' ).formActions.push( docusign );

			this.addPostAction( post );
			this.addDocusignAction( docusign );
		}
		
	});

})(jQuery);