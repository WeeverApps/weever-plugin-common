describe('Flickr SubTab', function() {
    beforeEach(function() {
        var model = new wxApp.FlickrSubTab();
        this.model = model;
        wx.log( JSON.stringify( this.model.getConfig() ) );
    });

    afterEach(function() {
        this.model = null;
    });

	it('should have default title of Flickr', function() {
		expect( this.model.get('title') ).toEqual('Flickr');
	});

    it('should have default layout of carousel', function() {
        expect( this.model.get('layout') ).toEqual('carousel');
    });

    it('should have default content of flickr', function() {
        expect( this.model.get('content') ).toEqual('flickrPhotostream');
    });

    it('should be published by default', function() {
        expect( this.model.get('published') ).toEqual(1);
    });

    it('should have default icon id', function() {
        expect( this.model.get('icon_id') ).toEqual( this.model.default_icon_id );
    });

});