describe('SubTabWordpressSearchtermEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpresssearchterm.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('wordpressSearchtermview');
        this.wordpressSearchtermModel = new wxApp.WordpressSearchtermSubTab();
        this.wordpressSearchtermView = new wxApp.WordpressSearchtermSubTabEditView({
            model: this.wordpressSearchtermModel
        });
        console.log(this.wordpressSearchtermView);
    });

    afterEach(function() {
        this.wordpressSearchtermView.remove();
    });

    it('should render', function() {
        expect( this.wordpressSearchtermView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.wordpressSearchtermView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.wordpressSearchtermView.$el.find('.wx-edit-input').attr('placeholder') ).toEqual( this.wordpressSearchtermModel.getConfig().url );
    });

    it('should have finish button', function() {
        expect( this.wordpressSearchtermView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should not have validate area', function() {
        expect( this.wordpressSearchtermView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});