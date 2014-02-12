describe( 'FormBuilderControlInputViewSpec', function() {

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = '/test/fixtures/';
		loadFixtures(
			'subtab.formbuilder.edit.tpl.html',
			'subtab.edit.header.tpl.html',
			'subtab.edit.footer.tpl.html',
			'formbuilder.input.tpl.html',
			'formbuilder.radio.group.tpl.html',
			'formbuilder.radio.tpl.html',
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

	afterEach(function() {
		this.formBuilderView.destroyView();
	});

	it('should find add radio group button', function() {
		expect( this.formBuilderView.$el.find('.wx-form-builder-add-radio-group' ).length ).toBe(1);
	})

	it('should add radio group', function() {
		this.formBuilderView.$el.find('.wx-form-builder-add-radio-group').click();
		expect( this.formBuilderView.$el.find('.wx-form-builder-preview .wx-form-builder-radio-group').length ).toBe(1);
	});

});
