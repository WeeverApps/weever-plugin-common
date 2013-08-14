describe('SubTabFoursquarePhotosEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.foursquarephotos.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.foursquarePhotosModel = new wxApp.FoursquarePhotosSubTab();
        this.foursquarePhotosView = new wxApp.FoursquarePhotosSubTabEditView({
            model: this.foursquarePhotosModel
        });
    });

    afterEach(function() {
        this.foursquarePhotosView.remove();
    });

    it('should render', function() {
        expect( this.foursquarePhotosView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.foursquarePhotosView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.foursquarePhotosView.$el.find('.wx-edit-input').attr('value') ).toEqual( this.foursquarePhotosModel.getConfig().venue_id );
    });

    it('should have finish button', function() {
        expect( this.foursquarePhotosView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add foursquarePhotos to the call to validate the feed', function() {
        $('body').append( this.foursquarePhotosView.el );
        spyOn( $, 'ajax' );
        spyOn( this.foursquarePhotosView, 'getFeedSample' );
        this.foursquarePhotosView.delegateEvents();
        this.foursquarePhotosView.$el.find('.wx-edit-input').val('https://foursquare.com/v/good-life/40b28c80f964a520c9f71ee3');
        this.foursquarePhotosView.$el.find('.wx-next-button').click();
        expect( this.foursquarePhotosView.getFeedSample.mostRecentCall.args[0].getConfig().venue_id ).toEqual('https://foursquare.com/v/good-life/40b28c80f964a520c9f71ee3');
    });

    it('should call getFeedSample with proper url', function() {
        $('body').append( this.foursquarePhotosView.el );
        spyOn( $, 'ajax' );
        this.foursquarePhotosView.$el.find('.wx-edit-input').val('https://foursquare.com/v/good-life/40b28c80f964a520c9f71ee3');
        this.foursquarePhotosView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
    });

    it('should have validate area', function() {
        expect( this.foursquarePhotosView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});