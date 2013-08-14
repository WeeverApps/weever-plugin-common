// Example (html and css): https://github.com/velesin/jasmine-jquery/issues/95
// TODO: Ability to have fixtures not be duplicated in the tests folder?

describe('TabView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/spec/fixtures/';
        loadFixtures('tab.tpl.html');
    });

    it('should pass', function() {
        var tab = new wxApp.Tab();
        var view = new wxApp.TabView({ model: tab });
        expect(view.model).toBeDefined();
        expect(view.model.get('id')).toBe(''); //fails
    });
});
