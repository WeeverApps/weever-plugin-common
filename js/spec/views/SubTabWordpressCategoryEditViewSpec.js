describe('SubTabWordpressCategoryEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpresscategory.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('wordpressCategoryview');
        this.wordpressCategoryModel = new wxApp.WordpressCategorySubTab();
        this.wordpressCategoryView = new wxApp.WordpressCategorySubTabEditView({
            model: this.wordpressCategoryModel
        });
        console.log(this.wordpressCategoryView);
    });

    afterEach(function() {
        this.wordpressCategoryView.remove();
    });

    it('should render', function() {
        expect( this.wordpressCategoryView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have select dropdown input', function() {
        expect( this.wordpressCategoryView.$('.wx-add-wordpress-category-select').length ).toBe(1);
    });

    it('should add wordpressCategory url to the call to validate the feed', function() {
        $('body').append( this.wordpressCategoryView.el );
        spyOn( $, 'ajax' );
        spyOn( this.wordpressCategoryView, 'getFeedSample' );
        this.wordpressCategoryView.delegateEvents();
        this.wordpressCategoryView.$('.wx-add-wordpress-category-select').val( this.wordpressCategoryView.$('.wx-add-wordpress-category-select option:first').val() );
        this.wordpressCategoryView.$el.find('.wx-next-button').click();
        expect( this.wordpressCategoryView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual( this.wordpressCategoryView.$('.wx-add-wordpress-blog-select option:first').val() );
    });

    it('should not have validate area', function() {
        expect( this.wordpressCategoryView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});