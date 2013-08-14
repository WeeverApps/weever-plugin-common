describe('SubTabsView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.container.tpl.html', 'subtab.tpl.html', 'subtab.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html');
        this.tabModel = new wxApp.Tab({ id: 1234 });
        this.subTabModelOne = new wxApp.SubTab({ id: 1234 });
        this.tabModel.addSubTab( this.subTabModelOne );
        this.subTabsView = new wxApp.SubTabsView({ model: this.tabModel })
    });

    afterEach(function() {
        this.subTabsView.remove();
    });

    it('should add a subtab when add called', function() {
        expect( this.subTabsView.$el.find('.wx-ui-row').length ).toEqual(0);
        this.subTabsView.addSubTab( new wxApp.SubTab({ id: 3456 }) );
        expect( this.subTabsView.$el.find('.wx-ui-row').length ).toEqual(1);
    });

//    it('should remove subtab from model when deleteSubTab called', function() {
//        this.tabModel.addSubTab( new wxApp.SubTab({ id: 2345 }) );
//        expect( this.subTabsView.model.getSubTabs().length ).toEqual(2);
//        this.subTabsView.deleteSubTab( this.subTabModelOne );
//        expect( this.subTabsView.model.getSubTabs().length ).toEqual(1);
//    });
//
//    it('should trigger main tab destroy when no subtabs left', function() {
//        var dummy = jasmine.createSpy();
//        this.subTabsView.model.on('destroy', dummy);
//        expect( this.subTabsView.model.getSubTabs().length ).toEqual(1);
//        this.subTabsView.deleteSubTab( this.subTabModelOne );
//        expect( dummy ).toHaveBeenCalled();
//    });
//
//    it('should not trigger delete if there are subtabs left', function() {
//        var dummy = jasmine.createSpy();
//        this.subTabsView.on('delete', dummy);
//        this.tabModel.addSubTab( new wxApp.SubTab({ id: 2345 }) );
//        expect( this.subTabsView.model.getSubTabs().length ).toEqual(2);
//        this.subTabsView.deleteSubTab( this.subTabModelOne );
//        expect( dummy ).not.toHaveBeenCalled();
//    });
});