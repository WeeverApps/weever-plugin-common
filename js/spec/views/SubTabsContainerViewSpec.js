describe('Subtabs container view', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.container.tpl.html', 'subtab.tpl.html', 'subtab.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html');
        this.tabModel = new wxApp.Tab();
        this.subTabsContainerView = new wxApp.SubTabsContainerView({ model: this.tabModel });
    });

    afterEach(function() {
        this.subTabsContainerView.remove();
    });

    it('should remove on delete event', function() {
        spyOn( this.subTabsContainerView, 'remove' );
        this.subTabsContainerView.delegateEvents();
        this.subTabsContainerView.subTabsView.trigger('delete');
        expect( this.subTabsContainerView.remove ).toHaveBeenCalled();
    })
});