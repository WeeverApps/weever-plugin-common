describe('Twitter SubTab', function() {
    beforeEach(function() {
        var model = new wxApp.TwitterSubTab();
        this.model = model;
        wx.log( JSON.stringify( this.model.getConfig() ) );
    });

    afterEach(function() {
        this.model = null;
    });

	it('should have default title of Social', function() {
		expect( this.model.get('title') ).toEqual('Social');
	});

    it('should have default content of twitterUser', function() {
        expect( this.model.get('content') ).toEqual('twitterUser');
    });

    it('should be published by default', function() {
        expect( this.model.get('published') ).toEqual(1);
    });

    it('should have default icon id', function() {
        expect( this.model.get('icon_id') ).toEqual( this.model.default_icon_id );
    });

});