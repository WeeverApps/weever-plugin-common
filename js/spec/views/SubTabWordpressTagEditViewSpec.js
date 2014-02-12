describe('SubTabWordpressTagEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpresstag.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('wordpresstagview');
        this.wordpressTagModel = new wxApp.WordpressTagSubTab();
        this.wordpressTagView = new wxApp.WordpressTagSubTabEditView({
            model: this.wordpressTagModel
        });
        console.log(this.wordpressTagView);
    });

    afterEach(function() {
        this.wordpressTagView.remove();
    });

    it('should render', function() {
        expect( this.wordpressTagView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have select dropdown input', function() {
        expect( this.wordpressTagView.$('.wx-add-wordpress-tag-select').length ).toBe(1);
    });

    it('should add wordpressTag url to the call to validate the feed', function() {
        $('body').append( this.wordpressTagView.el );
        spyOn( $, 'ajax' );
        spyOn( this.wordpressTagView, 'getFeedSample' );
        this.wordpressTagView.delegateEvents();
        this.wordpressTagView.$('.wx-add-wordpress-tag-select').val( this.wordpressTagView.$('.wx-add-wordpress-tag-select option:first').val() );
        this.wordpressTagView.$el.find('.wx-next-button').click();
        expect( this.wordpressTagView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual( this.wordpressTagView.$('.wx-add-wordpress-tag-select option:first').val() );
    });

    it('should not have validate area', function() {
        expect( this.wordpressTagView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});