describe('Main App view', function() {
    beforeEach(function() {
        $('body').append('<div id="toptabs"></div>');
        this.appView = new wxApp.App();
    });

    afterEach(function() {
        this.appView.remove();
        $('#toptabs').remove();
    });

    // This was moved to the Feature class. Move this test.
    // it('should fire addFeature when source icon is clicked', function() {
    //     this.appView.$el.append('<div class="wx-add-feature"></div>');
    //     spyOn( this.appView, 'addFeature' );
    //     this.appView.delegateEvents();
    //     this.appView.$el.find('.wx-add-feature').click();
    //     expect( this.appView.addFeature ).toHaveBeenCalled();
    // });

    // it('should fail if invalid type of feature', function() {
    //     var me = this;
    //     this.appView.$el.append('<div id="add-slkdfjsdlkfjsdlkjfsld" class="wx-add-feature"></div>');
    //     expect( function() { me.appView.$el.find('.wx-add-feature').click(); } ).toThrow( new Error('Invalid type slkdfjsdlkfjsdlkjfsld') );
    // });
});