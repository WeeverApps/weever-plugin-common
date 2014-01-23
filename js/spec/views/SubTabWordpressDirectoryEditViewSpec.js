describe('SubTabWordpressDirectoryEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpressdirectory.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('wordpressDirectoryview');
        this.wordpressDirectoryModel = new wxApp.WordpressDirectorySubTab();
        this.wordpressDirectoryView = new wxApp.WordpressDirectorySubTabEditView({
            model: this.wordpressDirectoryModel
        });
        console.log(this.wordpressDirectoryView);
    });

    afterEach(function() {
        this.wordpressDirectoryView.remove();
    });

    it('should render', function() {
        expect( this.wordpressDirectoryView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have select dropdown input', function() {
        expect( this.wordpressDirectoryView.$('.wx-add-wordpress-directory-select').length ).toBe(1);
    });

    it('should add wordpressDirectory url to the call to validate the feed', function() {
        $('body').append( this.wordpressDirectoryView.el );
        spyOn( $, 'ajax' );
        spyOn( this.wordpressDirectoryView, 'getFeedSample' );
        this.wordpressDirectoryView.delegateEvents();
        this.wordpressDirectoryView.$('.wx-add-wordpress-directory-select').val( this.wordpressDirectoryView.$('.wx-add-wordpress-directory-select option:first').val() );
        this.wordpressDirectoryView.$el.find('.wx-next-button').click();
        expect( this.wordpressDirectoryView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual( this.wordpressDirectoryView.$('.wx-add-wordpress-directory-select option:first').val() );
    });

    it('should not have validate area', function() {
        expect( this.wordpressDirectoryView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});