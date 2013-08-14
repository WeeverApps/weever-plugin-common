describe('Vimeo SubTab', function() {
    beforeEach(function() {
        var model = new wxApp.VimeoSubTab();
        this.model = model;
        wx.log( JSON.stringify( this.model.getConfig() ) );
    });

    afterEach(function() {
        this.model = null;
    });

	it('should have default title of Vimeo', function() {
		expect( this.model.get('title') ).toEqual('Vimeo');
	});

    it('should have default content of vimeo', function() {
        expect( this.model.get('content') ).toEqual('vimeo');
    });

    it('should be published by default', function() {
        expect( this.model.get('published') ).toEqual(1);
    });

    it('should have default icon id', function() {
        expect( this.model.get('icon_id') ).toEqual( this.model.default_icon_id );
    });

});