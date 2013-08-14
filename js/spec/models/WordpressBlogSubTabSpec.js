describe('WordpressBlog SubTab', function() {
    beforeEach(function() {
        var model = new wxApp.WordpressBlogSubTab();
        this.model = model;
        wx.log( JSON.stringify( this.model.getConfig() ) );
    });

    afterEach(function() {
        this.model = null;
    });

	it('should have default title of Blog', function() {
		expect( this.model.get('title') ).toEqual('Blog');
	});

    it('should have default type of wordpressCategory', function() {
        expect( this.model.get('type') ).toEqual('WordpressBlog');
    });

    it('should have default content of html', function() {
        expect( this.model.get('content') ).toEqual('html');
    });

    it('should be published by default', function() {
        expect( this.model.get('published') ).toEqual(1);
    });

    it('should have default icon id', function() {
        expect( this.model.get('icon_id') ).toEqual( this.model.default_icon_id );
    });

});