describe('SubTabPicasaAlbumsEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.picasaalbums.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.picasaAlbumsModel = new wxApp.PicasaAlbumsSubTab();
        this.picasaAlbumsView = new wxApp.PicasaAlbumsSubTabEditView({
            model: this.picasaAlbumsModel
        });
    });

    afterEach(function() {
        this.picasaAlbumsView.remove();
    });

    it('should render', function() {
        expect( this.picasaAlbumsView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.picasaAlbumsView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.picasaAlbumsView.$el.find('.wx-edit-input').attr('value') ).toEqual( this.picasaAlbumsModel.getConfig().user_id );
    });

    it('should have finish button', function() {
        expect( this.picasaAlbumsView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add picasaAlbums to the call to validate the feed', function() {
        $('body').append( this.picasaAlbumsView.el );
        spyOn( $, 'ajax' );
        spyOn( this.picasaAlbumsView, 'getFeedSample' );
        this.picasaAlbumsView.delegateEvents();
        this.picasaAlbumsView.$el.find('.wx-edit-input').val('aaron@weeverapps.com');
        this.picasaAlbumsView.$el.find('.wx-next-button').click();
        expect( this.picasaAlbumsView.getFeedSample.mostRecentCall.args[0].getConfig().user_id ).toEqual('aaron@weeverapps.com');
    });

    it('should call getFeedSample with proper url', function() {
        $('body').append( this.picasaAlbumsView.el );
        spyOn( $, 'ajax' );
        this.picasaAlbumsView.$el.find('.wx-edit-input').val('aaron@weeverapps.com');
        this.picasaAlbumsView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
    });

    it('should have validate area', function() {
        expect( this.picasaAlbumsView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});