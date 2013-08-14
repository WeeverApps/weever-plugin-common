describe('Main App view', function() {
    beforeEach(function() {
        $('body').append('<div id="toptabs"></div>');
        this.appView = new wxApp.App();
    });

    afterEach(function() {
        this.appView.remove();
        $('#toptabs').remove();
    });

    it('should fire addFeature when source icon is clicked', function() {
        this.appView.$el.append('<div class="wx-add-source-icon"></div>');
        spyOn( this.appView, 'addFeature' );
        this.appView.delegateEvents();
        this.appView.$el.find('.wx-add-source-icon').click();
        expect( this.appView.addFeature ).toHaveBeenCalled();
    });

    it('should try to call show when a new facebookwall feature is clicked', function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.facebookwall.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.appView.$el.append('<div id="add-FacebookWall" class="wx-add-source-icon"></div>');
        spyOn( this.appView, 'showEditView' );
        this.appView.$el.find('.wx-add-source-icon').click();
        expect( this.appView.showEditView ).toHaveBeenCalled();
    });

    it('should try to call show when a new googleCalendar feature is clicked', function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.googlecalendar.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.appView.$el.append('<div id="add-GoogleCalendar" class="wx-add-source-icon"></div>');
        spyOn( this.appView, 'showEditView' );
        this.appView.$el.find('.wx-add-source-icon').click();
        expect( this.appView.showEditView ).toHaveBeenCalled();
    });

    it('should fail if invalid type of feature', function() {
        var me = this;
        this.appView.$el.append('<div id="add-slkdfjsdlkfjsdlkjfsld" class="wx-add-source-icon"></div>');
        expect( function() { me.appView.$el.find('.wx-add-source-icon').click(); } ).toThrow( new Error('Invalid type slkdfjsdlkfjsdlkjfsld') );
    });
});