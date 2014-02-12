describe('SubTabWufooEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wufoo.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.wufooModel = new wxApp.WufooSubTab();
        this.wufooView = new wxApp.WufooSubTabEditView({
            model: this.wufooModel
        });
    });

    afterEach(function() {
        this.wufooView.remove();
    });

    it('should render', function() {
        expect( this.wufooView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.wufooView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have default values in the boxes', function() {
        expect( this.wufooView.$el.find('.wx-edit-input').attr('placeholder') ).toEqual( this.wufooModel.getConfig().url );
        expect( this.wufooView.$el.find('.wx-wufoo-api-key-input').attr('placeholder') ).toEqual( this.wufooModel.getConfig().apikey );
    });

    it('should have finish button', function() {
        expect( this.wufooView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add wufoo to the call to validate the feed', function() {
        $('body').append( this.wufooView.el );
        spyOn( $, 'ajax' );
        spyOn( this.wufooView, 'getFeedSample' );
        this.wufooView.delegateEvents();
        this.wufooView.$el.find('.wx-edit-input').val('https://USERNAME.wufoo.com/');
        this.wufooView.$el.find('.wx-wufoo-api-key-input').val('XXXX-XXXX-XXXX-XXXX');
        this.wufooView.$el.find('.wx-next-button').click();
        expect( this.wufooView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('https://USERNAME.wufoo.com/');
        expect( this.wufooView.getFeedSample.mostRecentCall.args[0].getConfig().apikey ).toEqual('XXXX-XXXX-XXXX-XXXX');
    });

    it('should call getFeedSample with proper url', function() {
        $('body').append( this.wufooView.el );
        spyOn( $, 'ajax' );
        this.wufooView.$el.find('.wx-edit-input').val('https://USERNAME.wufoo.com/');
        this.wufooView.$el.find('.wx-wufoo-api-key-input').val('XXXX-XXXX-XXXX-XXXX');
        this.wufooView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
    });

    it('should have validate area', function() {
        expect( this.wufooView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});