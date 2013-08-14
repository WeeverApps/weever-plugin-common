describe('SubTabFacebookEventsEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.facebookevents.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.facebookEventsModel = new wxApp.FacebookEventsSubTab();
        this.facebookEventsView = new wxApp.FacebookEventsSubTabEditView({
            model: this.facebookEventsModel
        });
    });

    afterEach(function() {
        this.facebookEventsView.remove();
    });

    it('should render', function() {
        expect( this.facebookEventsView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.facebookEventsView.$el.find('.wx-social-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.facebookEventsView.$el.find('.wx-social-input').attr('value') ).toEqual( this.facebookEventsModel.getConfig().url );
    });

    it('should have finish button', function() {
        expect( this.facebookEventsView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add facebookEvents to the call to validate the feed', function() {
        $('body').append( this.facebookEventsView.el );
        spyOn( $, 'ajax' );
        spyOn( this.facebookEventsView, 'getFeedSample' );
        this.facebookEventsView.delegateEvents();
        this.facebookEventsView.$el.find('.wx-social-input').val('http://facebook.com/UnitedWay');
        this.facebookEventsView.$el.find('.wx-next-button').click();
        expect( this.facebookEventsView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://facebook.com/UnitedWay');
    });

    it('should call getFeedSample with proper url', function() {
        $('body').append( this.facebookEventsView.el );
        spyOn( $, 'ajax' );
        this.facebookEventsView.$el.find('.wx-social-input').val('http://facebook.com/UnitedWay');
        this.facebookEventsView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
    });

    it('should have validate area', function() {
        expect( this.facebookEventsView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});