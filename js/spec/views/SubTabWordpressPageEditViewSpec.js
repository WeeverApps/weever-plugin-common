describe('SubTabWordpressPageEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpresspage.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('wordpresspageview');
        this.wordpressPageModel = new wxApp.WordpressPageSubTab();
        this.wordpressPageView = new wxApp.WordpressPageSubTabEditView({
            model: this.wordpressPageModel
        });
        console.log(this.wordpressPageView);
    });

    afterEach(function() {
        this.wordpressPageView.remove();
    });

    it('should render', function() {
        expect( this.wordpressPageView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have select dropdown input', function() {
        expect( this.wordpressPageView.$('.wx-add-wordpress-page-select').length ).toBe(1);
    });

    it('should add wordpressPage url to the call to validate the feed', function() {
        $('body').append( this.wordpressPageView.el );
        spyOn( $, 'ajax' );
        spyOn( this.wordpressPageView, 'getFeedSample' );
        this.wordpressPageView.delegateEvents();
        this.wordpressPageView.$('.wx-add-wordpress-page-select').val( this.wordpressPageView.$('.wx-add-wordpress-page-select option:first').val() );
        this.wordpressPageView.$el.find('.wx-next-button').click();
        expect( this.wordpressPageView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual( this.wordpressPageView.$('.wx-add-wordpress-page-select option:first').val() );
    });

    it('should not have validate area', function() {
        expect( this.wordpressPageView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});