describe('SubTabYoutubeEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.youtube.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.youtubeModel = new wxApp.YoutubeSubTab();
        this.youtubeView = new wxApp.YoutubeSubTabEditView({
            model: this.youtubeModel
        });
    });

    afterEach(function() {
        this.youtubeView.remove();
    });

    it('should render', function() {
        expect( this.youtubeView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have default value in box', function() {
        expect( this.youtubeView.$el.find('.wx-edit-input').attr('value') ).toEqual( this.youtubeModel.getConfig().url );
    });

    it('should have input boxes', function() {
        expect( this.youtubeView.$el.find('.wx-content-radio').length ).toBe(2);
        expect( this.youtubeView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have finish button', function() {
        expect( this.youtubeView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add youtube url name to the call to validate the feed', function() {
        $('body').append( this.youtubeView.el );
        spyOn( $, 'ajax' );
        spyOn( this.youtubeView, 'getFeedSample' );
        this.youtubeView.delegateEvents();
        this.youtubeView.$el.find('.wx-content-radio').filter('[value="youtube"]').prop('checked', true);
        this.youtubeView.$el.find('.wx-edit-input').val('http://youtube.com/pres201');
        this.youtubeView.$el.find('.wx-next-button').click();
        expect( this.youtubeView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://youtube.com/pres201');
    });

    it('should add youtube playlist url to the call to validate the feed', function() {
        $('body').append( this.youtubeView.el );
        spyOn( $, 'ajax' );
        spyOn( this.youtubeView, 'getFeedSample' );
        this.youtubeView.delegateEvents();
        this.youtubeView.$el.find('.wx-content-radio').filter('[value="youtubePlaylist"]').prop('checked', true);
        this.youtubeView.$el.find('.wx-edit-input').val('http://youtube.com/playlist?list=12345');
        this.youtubeView.$el.find('.wx-next-button').click();
        expect( this.youtubeView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://youtube.com/playlist?list=12345');
    });

    it('should have validate area', function() {
        expect( this.youtubeView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});