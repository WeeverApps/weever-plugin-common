describe( 'FormBuilderControlInputViewSpec', function() {

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = './js/spec/fixtures/';
		loadFixtures(
			'subtab.formbuilder.edit.tpl.html',
			'formbuilder.input.tpl.html',
			'subtab.container.tpl.html',
			'subtab.tpl.html',
			'tab.tpl.html',
			'feedsample.tpl.html'
		);
		this.formBuilderModel = new wxApp.FormBuilderSubTab();
		this.formBuilderView = new wxApp.FormBuilderSubTabEditView({
			model: this.formBuilderModel
		});
	});

	// afterEach(function() {
	// 	this.formBuilderView.destroyView();
	// });

	var inputTypes = ['text', 'password', 'color', 'date', 'datetime', 'datetime-local', 'month', 'number', 'tel', 'time', 'url', 'week'];
	var type;
	for ( var i = 0; i < inputTypes.length; i++ ) {
		type = inputTypes[i];
		it('should add ' + type + ' input', function() {
			// Check fixtures (templates)
			this.formBuilderView.$el.find('.wx-form-builder-add-' + type + '-input').click();
			expect(this.formBuilderView.$el.find('.wx-form-builder-preview input[type="' + type + '"].wx-form-builder-' + type + '-input').length).toBe(1);
		});
	}

//	it('should change label', function() {
//		this.formBuilderView.$el.find( '.wx-form-builder-add-text-input').click();
//		this.formBuilderView.$el.find( '.wx-form-builder-edit-label' ).click();
//		this.formBuilderView.$el.find( this.formBuilderView.previewPaneSelector + ' .wx-form-builder-label-input' ).val('A');
//		this.formBuilderView.$el.find( this.formBuilderView.previewPaneSelector + ' .wx-form-builder-label-input' ).blur();
//		expect( this.formBuilderView.$el.find( this.formBuilderView.previewPaneSelector + ' .wx-form-builder-label-input' ).val() ).toBe('A');
//	});

});
