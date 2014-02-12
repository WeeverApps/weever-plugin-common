describe('SubTabView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.tpl.html', 'subtab.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html');
        this.subTabModel = new wxApp.FacebookWallSubTab();
        this.subTabView = new wxApp.SubTabView({ model: this.subTabModel });
        spyOn( this.subTabView, 'editIcon' );
        spyOn( this.subTabView, 'editSubTab' );
        spyOn( this.subTabView, 'confirmDeleteSubTab' );
        this.subTabView.delegateEvents();
    });

    afterEach(function() {
        this.subTabView.remove();
    });

    it('should render edit link', function() {
        expect( this.subTabView.render().$el.find('.wx-edit-link').length ).toBe(1);
    });

    it('should spy on editIcon', function() {
        this.subTabView.render();
        this.subTabView.editIcon();
        expect( this.subTabView.editIcon ).toHaveBeenCalled();
    });

    it('clicking edit should trigger edit event', function() {
        this.subTabView.render();
        this.subTabView.$el.find('.wx-edit-link').click();
        expect( this.subTabView.editSubTab ).toHaveBeenCalled();
    });

    it('should trigger confirmDeleteSubTab event when delete clicked', function() {
        this.subTabView.render();
        this.subTabView.$el.find('.wx-subtab-delete').click();
        expect( this.subTabView.confirmDeleteSubTab ).toHaveBeenCalled();
    });

    it('should call delete_tab api when delete clicked', function() {
        spyOn( wx, 'makeApiCall' );
        this.subTabView.deleteSubTab();
        expect( wx.makeApiCall.mostRecentCall.args[0] ).toEqual( 'tabs/delete' );
    })

    it('should trigger deletetab event and remove when delete clicked if api call successful', function() {
        spyOn( wx, 'makeApiCall' );
        var dummy = jasmine.createSpy('dummy');
        spyOn( this.subTabView, 'remove' );
        this.subTabView.deleteSubTab();
        wx.makeApiCall.mostRecentCall.args[2]({ success: true });
        expect( this.subTabView.remove ).toHaveBeenCalled();
    });
});