describe('SubTabr3sEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.r3s.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.r3sModel = new wxApp.r3sSubTab();
        this.r3sView = new wxApp.r3sSubTabEditView({
            model: this.r3sModel
        });
    });

    afterEach(function() {
        this.r3sView.remove();
    });

    it('should render', function() {
        expect( this.r3sView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.r3sView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.r3sView.$el.find('.wx-edit-input').attr('value') ).toEqual( this.r3sModel.getConfig().url );
    });

    it('should have finish button', function() {
        expect( this.r3sView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add R3S to the call to validate the feed', function() {
        $('body').append( this.r3sView.el );
        spyOn( $, 'ajax' );
        spyOn( this.r3sView, 'getFeedSample' );
        this.r3sView.delegateEvents();
        this.r3sView.$el.find('.wx-edit-input').val('http://weeverapps.com/five-reasons-html5-mobile/?template=weever_cartographer&callback=callback345');
        this.r3sView.$el.find('.wx-next-button').click();
        expect( this.r3sView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://weeverapps.com/five-reasons-html5-mobile/?template=weever_cartographer&callback=callback345');
    });

    it('should call getFeedSample with proper url', function() {
        $('body').append( this.r3sView.el );
        spyOn( $, 'ajax' );
        this.r3sView.$el.find('.wx-edit-input').val('http://weeverapps.com/five-reasons-html5-mobile/?template=weever_cartographer&callback=callback345');
        this.r3sView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
    });

    it('should have validate area', function() {
        expect( this.r3sView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});