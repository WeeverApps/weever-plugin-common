describe('SubTabFlickrEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.flickr.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.flickrModel = new wxApp.FlickrSubTab();
        this.flickrView = new wxApp.FlickrSubTabEditView({
            model: this.flickrModel
        });
    });

    afterEach(function() {
        this.flickrView.remove();
    });

    it('should render', function() {
        expect( this.flickrView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input boxes', function() {
        expect( this.flickrView.$el.find('.wx-content-radio').length ).toBe(2);
        expect( this.flickrView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have finish button', function() {
        expect( this.flickrView.$el.find('.wx-finish-button').length ).toBe(1);
    });

    it('should add flickr photostream url to the call to validate the feed', function() {
        $('body').append( this.flickrView.el );
        spyOn( $, 'ajax' );
        spyOn( this.flickrView, 'getFeedSample' );
        this.flickrView.delegateEvents();
        this.flickrView.$el.find('.wx-content-radio').filter('[value="flickrPhotostream"]').prop('checked', true);
        this.flickrView.$el.find('.wx-edit-input').val('http://flickr.com/photos/74346189@N05');
        this.flickrView.$el.find('.wx-next-button').click();
        expect( this.flickrView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://flickr.com/photos/74346189@N05');
    });

    it('should add flickr photosets url to the call to validate the feed', function() {
        $('body').append( this.flickrView.el );
        spyOn( $, 'ajax' );
        spyOn( this.flickrView, 'getFeedSample' );
        this.flickrView.delegateEvents();
        this.flickrView.$el.find('.wx-content-radio').filter('[value="flickrPhotosets"]').prop('checked', true);
        this.flickrView.$el.find('.wx-edit-input').val('http://flickr.com/photos/74346189@N05');
        this.flickrView.$el.find('.wx-next-button').click();
        expect( this.flickrView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://flickr.com/photos/74346189@N05');
    });

    it('should have validate area', function() {
        expect( this.flickrView.$el.find('.wx-validate-feed').length ).toBe(1);
    });
});