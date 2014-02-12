describe('SubTab', function() {
    beforeEach(function() {
        this.model = new wxApp.SubTab();
    });

    it('should try to call add_tab if new tab', function() {
        spyOn( wx, 'makeApiCall' );
        this.model.save();
        expect( wx.makeApiCall.mostRecentCall.args[0] ).toEqual( 'tabs/add_tab' );
    });

    it('should save tab id to model', function() {
        spyOn( wx, 'makeApiCall');
        this.model.save();
        spyOn( wxApp.tabsView, 'addTabToCollection' );
        wx.makeApiCall.mostRecentCall.args[2]({ tab_id: 1000 });
        expect( this.model.get('id') ).toEqual(1000);
    });

    it('should add tab when new model saved', function() {
        var dummy = jasmine.createSpy('dummy');
        spyOn( wx, 'makeApiCall' );
        Backbone.Events.on('tab:new', dummy);
        this.model.save();
        spyOn( wxApp.tabsView, 'addTabToCollection' );
        wx.makeApiCall.mostRecentCall.args[2]({ tab_id: 1000 });
        expect( dummy ).toHaveBeenCalled();
    });

/*
    it('should trigger event when save called successfully', function() {
        spyOn( this.subTabView, 'render' );
        spyOn( wx, 'makeApiCall' );
        this.subTabModel.save();
        expect( this.subTabView.render ).toHaveBeenCalled();
    });
*/
});