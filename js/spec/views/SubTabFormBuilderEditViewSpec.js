describe( 'SubTabFormBuilderEditViewSpec', function() {

    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures(
			'subtab.formbuilder.edit.tpl.html',
			'subtab.edit.header.tpl.html',
			'subtab.edit.footer.tpl.html',
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

    afterEach(function() {
        this.formBuilderView.destroyView();
    });

    it('should render', function() {
        expect( this.formBuilderView.el.tagName.toLowerCase() ).toBe('div');
        expect( this.formBuilderView.$el.find('.wx-form-builder-add-text-input').length).toBe(1);
    });

//    it('should add text input', function() {
//		// Check fixtures (templates)
//		console.log('add text input');
//		this.formBuilderView.$el.find('.wx-form-builder-add-text-input').click();
//		console.log(this.formBuilderView.$el.find('.wx-form-builder-preview input[type="text"]'));
//        expect(this.formBuilderView.$el.find('.wx-form-builder-preview input[type="text"].wx-form-builder-text-input').length).toBe(1);
//    });
//
//	it('should call addTextInput', function() {
//		spyOn(this.formBuilderView, 'addTextInput');
//		this.formBuilderView.delegateEvents();
//		this.formBuilderView.$el.find('.wx-form-builder-add-text-input').click();
//		expect(this.formBuilderView.addTextInput).toHaveBeenCalled();
//	});


//
//	it('should blur', function() {
//		spyOn(this.formBuilderView, 'blurTextInput');
//		this.formBuilderView.delegateEvents();
//		this.formBuilderView.$el.find('.wx-form-builder-add-text-input').click();
//		this.formBuilderView.$el.find(this.formBuilderView.previewPaneSelector + ' .wx-form-builder-text-input' ).val('abc');
//		this.formBuilderView.$el.find(this.formBuilderView.previewPaneSelector + ' .wx-form-builder-text-input' ).blur();
//		expect(this.formBuilderView.blurTextInput ).toHaveBeenCalled();
//	});
//
//	it('should click editLabel', function() {
//		spyOn( this.formBuilderView, 'editLabel' );
//		this.formBuilderView.delegateEvents();
//		this.formBuilderView.$el.find('.wx-form-builder-add-text-input').click();
//		this.formBuilderView.$el.find( '.wx-form-builder-edit-label' ).click();
//		expect( this.formBuilderView.editLabel ).toHaveBeenCalled();
//	});
//
//	it('should change label to text input', function() {
//		expect( this.formBuilderView.$el.find( this.formBuilderView.previewPaneSelector + ' .wx-form-builder-label-input' ).length ).toBe(0);
//		this.formBuilderView.$el.find( '.wx-form-builder-add-text-input').click();
//		this.formBuilderView.$el.find( '.wx-form-builder-edit-label' ).click();
//		expect( this.formBuilderView.$el.find( this.formBuilderView.previewPaneSelector + ' .wx-form-builder-label-input' ).length ).toBe(1);
//	});
//
//	it('should change label', function() {
//		this.formBuilderView.$el.find( '.wx-form-builder-add-text-input').click();
//		this.formBuilderView.$el.find( '.wx-form-builder-edit-label' ).click();
//		this.formBuilderView.$el.find( this.formBuilderView.previewPaneSelector + ' .wx-form-builder-label-input' ).val('A');
//		this.formBuilderView.$el.find( this.formBuilderView.previewPaneSelector + ' .wx-form-builder-label-input' ).blur();
//		expect( this.formBuilderView.$el.find( this.formBuilderView.previewPaneSelector + ' .wx-form-builder-label-input' ).val() ).toBe('A');
//	});

});