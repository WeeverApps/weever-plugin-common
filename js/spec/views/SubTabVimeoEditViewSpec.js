describe('SubTabVimeoEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.vimeo.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('vimeoview');
        this.vimeoModel = new wxApp.VimeoSubTab();
        this.vimeoView = new wxApp.VimeoSubTabEditView({
            model: this.vimeoModel
        });
        console.log(this.vimeoView);
    });

    afterEach(function() {
        this.vimeoView.remove();
    });

    it('should render', function() {
        expect( this.vimeoView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.vimeoView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.vimeoView.$el.find('.wx-edit-input').attr('value') ).toEqual( this.vimeoModel.getConfig().url );
    });

    it('should have finish button', function() {
        expect( this.vimeoView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add vimeo url to the call to validate the feed', function() {
        $('body').append( this.vimeoView.el );
        spyOn( $, 'ajax' );
        spyOn( this.vimeoView, 'getFeedSample' );
        this.vimeoView.delegateEvents();
        this.vimeoView.$el.find('.wx-edit-input').val('http://dcheartly.blogspot.com');
        this.vimeoView.$el.find('.wx-next-button').click();
        expect( this.vimeoView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://dcheartly.blogspot.com');
    });

    it('should call getFeedSample with proper url', function() {
        $('body').append( this.vimeoView.el );
        spyOn( $, 'ajax' );
        this.vimeoView.$el.find('.wx-edit-input').val('http://dcheartly.blogspot.com');
        this.vimeoView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
    });

    it('should call getFeedSample with api check / confirm feed set to 1', function() {
        $('body').append( this.vimeoView.el );
        spyOn( $, 'ajax' );
        this.vimeoView.$el.find('.wx-social-input').val('http://dcheartly.blogspot.com');
        this.vimeoView.$el.find('.wx-next-button').click();
        expect( $.ajax.mostRecentCall.args[0].data.api_check ).toBe(1);
        expect( $.ajax.mostRecentCall.args[0].data.confirm_feed ).toBe(1);
    });

    it('should have validate area', function() {
        expect( this.vimeoView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});