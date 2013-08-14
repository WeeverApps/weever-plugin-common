describe('TabCollection', function() {
    beforeEach(function() {
       this.tabCollection = new wxApp.TabsCollection();
    });

    afterEach(function() {
       this.tabCollection = null;
    });

    it('should handle wufoo content type', function() {
        var tabData = { id: 1234, content: 'wufoo' };
        expect( this.tabCollection.getModelNameByTabData( tabData ) ).toEqual('WufooSubTab');
    })

    it('should handle twitter content type', function() {
        var tabData = { id: 1234, content: 'twitter' };
        expect( this.tabCollection.getModelNameByTabData( tabData ) ).toEqual('TwitterSubTab');
    });

    it('should handle youtube playlist', function() {
        var tabData = { id: 1234, content: 'youtubePlaylist' };
        expect( this.tabCollection.getModelNameByTabData( tabData ) ).toEqual('YoutubeSubTab');
    });

    it('should handle flickr photosets', function() {
        var tabData = { id: 1234, content: 'flickrPhotosets' };
        expect( this.tabCollection.getModelNameByTabData( tabData ) ).toEqual('FlickrSubTab');
    });

    it('should handle type of WordpressCategory', function() {
        var tabData = { id: 1234, content: 'html', type: 'WordpressCategory' };
        expect( this.tabCollection.getModelNameByTabData( tabData ) ).toEqual('WordpressCategorySubTab');
    });
});