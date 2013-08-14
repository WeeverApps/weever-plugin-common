describe('SubTabtwitterEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.twitter.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.twitterModel = new wxApp.TwitterSubTab();
        this.twitterView = new wxApp.TwitterSubTabEditView({
            model: this.twitterModel
        });
    });

    afterEach(function() {
        this.twitterView.remove();
    });

    it('should render', function() {
        expect( this.twitterView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input boxes', function() {
        expect( this.twitterView.$el.find('.wx-content-radio').length ).toBe(3);
        expect( this.twitterView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have finish button', function() {
        expect( this.twitterView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add twitter screen name to the call to validate the feed', function() {
        $('body').append( this.twitterView.el );
        spyOn( $, 'ajax' );
        spyOn( this.twitterView, 'getFeedSample' );
        this.twitterView.delegateEvents();
        this.twitterView.$el.find('.wx-content-radio').filter('[value="twitterUser"]').prop('checked', true);
        this.twitterView.$el.find('.wx-edit-input').val('@brianhogg');
        this.twitterView.$el.find('.wx-next-button').click();
        expect( this.twitterView.getFeedSample.mostRecentCall.args[0].getConfig().screen_name ).toEqual('@brianhogg');
    });

    it('should add twitter hashtag to the call to validate the feed', function() {
        $('body').append( this.twitterView.el );
        spyOn( $, 'ajax' );
        spyOn( this.twitterView, 'getFeedSample' );
        this.twitterView.delegateEvents();
        this.twitterView.$el.find('.wx-content-radio').filter('[value="twitter"]').prop('checked', true);
        this.twitterView.$el.find('.wx-edit-input').val('#test');
        this.twitterView.$el.find('.wx-next-button').click();
        expect( this.twitterView.getFeedSample.mostRecentCall.args[0].getConfig().q ).toEqual('#test');
    });

    it('should add twitter search term to the call to validate the feed', function() {
        $('body').append( this.twitterView.el );
        spyOn( $, 'ajax' );
        spyOn( this.twitterView, 'getFeedSample' );
        this.twitterView.delegateEvents();
        this.twitterView.$el.find('.wx-content-radio').filter('[value="twitter"]').prop('checked', true);
        this.twitterView.$el.find('.wx-edit-input').val('weever apps :)');
        this.twitterView.$el.find('.wx-next-button').click();
        expect( this.twitterView.getFeedSample.mostRecentCall.args[0].getConfig().q ).toEqual('weever apps :)');
    });

    it('should have validate area', function() {
        expect( this.twitterView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});