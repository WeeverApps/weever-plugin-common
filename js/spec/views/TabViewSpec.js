describe('TabView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('tab.tpl.html', 'subtab.tpl.html', 'subtab.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html');
        this.tabModel = new wxApp.Tab({ id: 1234, title: 'test' });
        this.tabView = new wxApp.TabView({ model: this.tabModel });
        spyOn( this.tabView, 'loadIcon' );
    });

    afterEach(function() {
        this.tabView.remove();
    });

    it('should render with class li', function() {
        expect( this.tabView.render().el.tagName.toLowerCase() ).toBe('li');
    });

    it('should render tab title', function() {
        expect( this.tabView.render().$el.find('.wx-nav-label').html().trim() ).toEqual('test');
    });

    it('should call loadIcon when rendered', function() {
        this.tabView.render();
        expect( this.tabView.loadIcon ).toHaveBeenCalled();
    });

    it('should update tab on model change', function() {
        this.tabView.render();
        this.tabModel.set('title', 'changed');
        expect( this.tabView.$el.find('.wx-nav-label').html().trim() ).toEqual('changed');
    });

    it('should destroyView on model destroy', function() {
        spyOn( this.tabView, 'remove' );
        this.tabModel.destroy();
        expect( this.tabView.remove ).toHaveBeenCalled();
    });

    /*it('should call render on updateTabId', function() {
        spyOn( this.tabView, 'render' );
        this.tabView.updateTabId( 1234, 4321 );
        expect( this.tabView.render ).toHaveBeenCalled();
    });*/
});