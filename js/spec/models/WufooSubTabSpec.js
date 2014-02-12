describe('Wufoo SubTab', function() {
    beforeEach(function() {
        var model = new wxApp.WufooSubTab();
        this.model = model;
        wx.log( JSON.stringify( this.model.getConfig() ) );
    });

    afterEach(function() {
        this.model = null;
    });

	it('should have default title of Forms', function() {
		expect( this.model.get('title') ).toEqual('Forms');
	});

    it('should have default content of wufoo', function() {
        expect( this.model.get('content') ).toEqual('wufoo');
    });

    it('should be published by default', function() {
        expect( this.model.get('published') ).toEqual(1);
    });

    it('should have default icon id', function() {
        expect( this.model.get('icon_id') ).toEqual( this.model.default_icon_id );
    });

});