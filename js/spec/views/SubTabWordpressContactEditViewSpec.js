describe('SubTabWordpressContactEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpresscontacts.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.wordpressContactModel = new wxApp.WordpressContactsSubTab();
        this.wordpressContactView = new wxApp.WordpressContactsSubTabEditView({
            model: this.wordpressContactModel
        });
    });

    afterEach(function() {
        this.wordpressContactView.remove();
    });

    it('should render', function() {
        expect( this.wordpressContactView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input boxes', function() {
        expect( this.wordpressContactView.$el.find('.wx-contact-input-title').length ).toBe(1);
        expect( this.wordpressContactView.$el.find('.wx-contact-input-phone').length ).toBe(1);
        expect( this.wordpressContactView.$el.find('.wx-contact-input-email').length ).toBe(1);
        expect( this.wordpressContactView.$el.find('.wx-contact-input-address').length ).toBe(1);
        expect( this.wordpressContactView.$el.find('.wx-contact-input-town').length ).toBe(1);
        expect( this.wordpressContactView.$el.find('.wx-contact-input-state').length ).toBe(1);
        expect( this.wordpressContactView.$el.find('.wx-contact-input-country').length ).toBe(1);
        expect( this.wordpressContactView.$el.find('.wx-contact-input-misc').length ).toBe(1);
        expect( this.wordpressContactView.$el.find('.wx-contact-input-image').length ).toBe(1);
    });

    it('should have finish button', function() {
        expect( this.wordpressContactView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should not have validate area', function() {
        expect( this.wordpressContactView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});