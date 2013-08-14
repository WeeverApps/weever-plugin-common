describe('SubTabWordpressProximityEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.wordpressproximity.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        console.log('wordpressProximityview');
        this.wordpressProximityModel = new wxApp.WordpressProximitySubTab();
        this.wordpressProximityView = new wxApp.WordpressProximitySubTabEditView({
            model: this.wordpressProximityModel
        });
        console.log(this.wordpressProximityView);
    });

    afterEach(function() {
        this.wordpressProximityView.remove();
    });

    it('should render', function() {
        expect( this.wordpressProximityView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have select dropdown input', function() {
        expect( this.wordpressProximityView.$('.wx-add-wordpress-proximity-select').length ).toBe(1);
    });

    it('should add wordpressProximity url to the call to validate the feed', function() {
        $('body').append( this.wordpressProximityView.el );
        spyOn( $, 'ajax' );
        spyOn( this.wordpressProximityView, 'getFeedSample' );
        this.wordpressProximityView.delegateEvents();
        this.wordpressProximityView.$('.wx-add-wordpress-proximity-select').val( this.wordpressProximityView.$('.wx-add-wordpress-proximity-select option:first').val() );
        this.wordpressProximityView.$el.find('.wx-next-button').click();
        expect( this.wordpressProximityView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual( this.wordpressProximityView.$('.wx-add-wordpress-proximity-select option:first').val() );
    });

    it('should not have validate area', function() {
        expect( this.wordpressProximityView.$el.find('.wx-validate-feed').length ).toBe(0);
    });
});