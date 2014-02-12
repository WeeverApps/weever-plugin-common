describe('SubTabFacebookAlbumsEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.facebookalbums.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.facebookAlbumsModel = new wxApp.FacebookAlbumsSubTab();
        this.facebookAlbumsView = new wxApp.FacebookAlbumsSubTabEditView({
            model: this.facebookAlbumsModel
        });
    });

    afterEach(function() {
        this.facebookAlbumsView.remove();
    });

    it('should render', function() {
        expect( this.facebookAlbumsView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.facebookAlbumsView.$el.find('.wx-social-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.facebookAlbumsView.$el.find('.wx-social-input').attr('value') ).toEqual( this.facebookAlbumsModel.getConfig().url );
    });

    it('should have finish button', function() {
        expect( this.facebookAlbumsView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add facebookAlbums to the call to validate the feed', function() {
        $('body').append( this.facebookAlbumsView.el );
        spyOn( $, 'ajax' );
        spyOn( this.facebookAlbumsView, 'getFeedSample' );
        this.facebookAlbumsView.delegateEvents();
        this.facebookAlbumsView.$el.find('.wx-social-input').val('http://facebook.com/UnitedWay');
        this.facebookAlbumsView.$el.find('.wx-next-button').click();
        expect( this.facebookAlbumsView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://facebook.com/UnitedWay');
    });

    it('should call getFeedSample with proper url', function() {
        $('body').append( this.facebookAlbumsView.el );
        spyOn( $, 'ajax' );
        this.facebookAlbumsView.$el.find('.wx-social-input').val('http://facebook.com/UnitedWay');
        this.facebookAlbumsView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
    });

    it('should have validate area', function() {
        expect( this.facebookAlbumsView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});