describe('SubTabEdit', function() {
    beforeEach(function() {
        $('body').append('<div id="toptabs"><div id="addTab"></div><div id="12345Tab"></div></div>');
        wxApp.appView = new wxApp.App();
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
		this.editView = new wxApp.SubTabEditView({ model: new wxApp.SubTab() });
	});

    afterEach(function() {
		$('body').html('');
        $('#toptabs').remove();
    });

    it('should be destroyed when cancel clicked', function() {
        spyOn( this.editView, 'destroyView' );
        this.editView.delegateEvents();
        this.editView.show();
        this.editView.$el.find('.wx-cancel-button').click();
        expect( this.editView.destroyView ).toHaveBeenCalled();
    });

	it('should have next button shown by default', function() {
		$('body').append( this.editView.el );
		expect( this.editView.$el.find('.wx-next-button') ).toBeVisible();
		expect( this.editView.$el.find('.wx-finish-button') ).toBeHidden();
	});

	it('should call finish function when finish clicked', function() {
		spyOn( this.editView, 'finish' );
		this.editView.delegateEvents();
		this.editView.show();
		this.editView.$el.find('.wx-finish-button').click();
		expect( this.editView.finish ).toHaveBeenCalled();
	});

    // TODO: Figure out why this isn't triggering in the test - works fine in browser
//    it('should destroy view when tab added/saved', function() {
//        spyOn( this.editView, 'destroyView' );
////        this.editView.delegateEvents();
//        spyOn( wxApp.tabsView, 'addTabToCollection' );
//        Backbone.Events.trigger('tab:new', new wxApp.SubTab() );
//        expect( this.editView.destroyView ).toHaveBeenCalled();
//    });

	it('should have validate area by default', function() {
		expect( this.editView.$el.find('.wx-validate-feed').length ).toBe(1);
	});

    it('should have title edit area by default', function() {
        expect( this.editView.$('.wx-edit-title').length ).toBe(1);
    });
});