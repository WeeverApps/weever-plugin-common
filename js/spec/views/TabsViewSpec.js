describe('TabsView', function() {
    beforeEach(function() {
        $('body').append('<div id="listTabsSortable"></div>');
    });

    afterEach(function() {
        $('listTabsSortable').remove();
    });

    it('should detect newly created tab event', function() {
        spyOn( wxApp.tabsView, 'addTabToCollection' );
        var model = new wxApp.SubTab({ id: 1000 });
        Backbone.Events.trigger('tab:new', model );
        expect( wxApp.tabsView.addTabToCollection ).toHaveBeenCalled();
    });
});