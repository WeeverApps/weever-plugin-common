describe('WordpressPage SubTab', function() {
    beforeEach(function() {
        var model = new wxApp.WordpressPageSubTab();
        this.model = model;
        wx.log( JSON.stringify( this.model.getConfig() ) );
    });

    afterEach(function() {
        this.model = null;
    });

	it('should have default title of Pages', function() {
		expect( this.model.get('title') ).toEqual('Pages');
	});

    it('should have default type of WordpressPage', function() {
        expect( this.model.get('type') ).toEqual('WordpressPage');
    });

    it('should have default layout of panel', function() {
        expect( this.model.get('layout') ).toEqual('panel');
    });

    it('should have default content of htmlPage', function() {
        expect( this.model.get('content') ).toEqual('htmlPage');
    });

    it('should be published by default', function() {
        expect( this.model.get('published') ).toEqual(1);
    });

    it('should have default icon id', function() {
        expect( this.model.get('icon_id') ).toEqual( this.model.default_icon_id );
    });

});