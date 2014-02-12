describe('SubTabWordpressBlogEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpressblog.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('wordpressBlogview');
        this.wordpressBlogModel = new wxApp.WordpressBlogSubTab();
        this.wordpressBlogView = new wxApp.WordpressBlogSubTabEditView({
            model: this.wordpressBlogModel
        });
        console.log(this.wordpressBlogView);
    });

    afterEach(function() {
        this.wordpressBlogView.remove();
    });

    it('should render', function() {
        expect( this.wordpressBlogView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have select dropdown input', function() {
        expect( this.wordpressBlogView.$el.find('.wx-add-wordpress-blog-select').length ).toBe(1);
    });

    it('should add wordpressBlog url to the call to validate the feed', function() {
        $('body').append( this.wordpressBlogView.el );
        spyOn( $, 'ajax' );
        spyOn( this.wordpressBlogView, 'getFeedSample' );
        this.wordpressBlogView.delegateEvents();
        this.wordpressBlogView.$('.wx-add-wordpress-blog-select').val( this.wordpressBlogView.$('.wx-add-wordpress-blog-select option:first').val() );
        this.wordpressBlogView.$('.wx-next-button').click();
        expect( this.wordpressBlogView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual( this.wordpressBlogView.$('.wx-add-wordpress-blog-select option:first').val() );
    });

    it('should not have validate area', function() {
        expect( this.wordpressBlogView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});