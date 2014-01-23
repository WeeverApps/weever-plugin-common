describe('SubTabWordpressMapEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpressmap.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('wordpressmapview');
        this.wordpressMapModel = new wxApp.WordpressMapSubTab();
        this.wordpressMapView = new wxApp.WordpressMapSubTabEditView({
            model: this.wordpressMapModel
        });
        console.log(this.wordpressMapView);
    });

    afterEach(function() {
        this.wordpressMapView.remove();
    });

    it('should render', function() {
        expect( this.wordpressMapView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have select dropdown input', function() {
        expect( this.wordpressMapView.$('.wx-add-wordpress-map-select').length ).toBe(1);
    });

    it('should add wordpressMap url to the call to validate the feed', function() {
        $('body').append( this.wordpressMapView.el );
        spyOn( $, 'ajax' );
        spyOn( this.wordpressMapView, 'getFeedSample' );
        this.wordpressMapView.delegateEvents();
        this.wordpressMapView.$('.wx-add-wordpress-map-select').val( this.wordpressMapView.$('.wx-add-wordpress-map-select option:first').val() );
        this.wordpressMapView.$el.find('.wx-next-button').click();
        expect( this.wordpressMapView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual( this.wordpressMapView.$('.wx-add-wordpress-map-select option:first').val() );
    });

    it('should not have validate area', function() {
        expect( this.wordpressMapView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});