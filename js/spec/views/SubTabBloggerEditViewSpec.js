describe('SubTabbloggerEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.blogger.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.bloggerModel = new wxApp.BloggerSubTab();
        this.bloggerView = new wxApp.BloggerSubTabEditView({
            model: this.bloggerModel
        });
    });

    afterEach(function() {
        this.bloggerView.remove();
    });

    it('should render', function() {
        expect( this.bloggerView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.bloggerView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.bloggerView.$el.find('.wx-edit-input').attr('value') ).toEqual( this.bloggerModel.getConfig().blog_url );
    });

    it('should have finish button', function() {
        expect( this.bloggerView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add BLOGGER e-mail to the call to validate the feed', function() {
        $('body').append( this.bloggerView.el );
        spyOn( $, 'ajax' );
        spyOn( this.bloggerView, 'getFeedSample' );
        this.bloggerView.delegateEvents();
        this.bloggerView.$el.find('.wx-edit-input').val('http://dcheartly.blogspot.com');
        this.bloggerView.$el.find('.wx-next-button').click();
        expect( this.bloggerView.getFeedSample.mostRecentCall.args[0].getConfig().blog_url ).toEqual('http://dcheartly.blogspot.com');
    });

    it('should call getFeedSample with proper url', function() {
        $('body').append( this.bloggerView.el );
        spyOn( $, 'ajax' );
        this.bloggerView.$el.find('.wx-edit-input').val('http://dcheartly.blogspot.com');
        this.bloggerView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
    });

    it('should call getFeedSample with api check / confirm feed set to 1', function() {
        $('body').append( this.bloggerView.el );
        spyOn( $, 'ajax' );
        this.bloggerView.$el.find('.wx-social-input').val('http://dcheartly.blogspot.com');
        this.bloggerView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].data.api_check ).toBe(1);
        expect( $.ajax.mostRecentCall.args[0].data.confirm_feed ).toBe(1);
    });

    it('should have validate area', function() {
        expect( this.bloggerView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});