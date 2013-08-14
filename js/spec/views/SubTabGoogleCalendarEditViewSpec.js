describe('SubTabgoogleCalendarEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.googlecalendar.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.googleCalendarModel = new wxApp.GoogleCalendarSubTab();
        this.googleCalendarView = new wxApp.GoogleCalendarSubTabEditView({
            model: this.googleCalendarModel
        });
    });

    afterEach(function() {
        this.googleCalendarView.remove();
    });

    it('should render', function() {
        expect( this.googleCalendarView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.googleCalendarView.$el.find('.wx-edit-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.googleCalendarView.$el.find('.wx-edit-input').attr('value') ).toEqual( this.googleCalendarModel.getConfig().calendar_id );
    });

    it('should have finish button', function() {
        expect( this.googleCalendarView.$el.find('.wx-finish-button').length ).toBe(1);
    });

	it('should add google e-mail to the call to validate the feed', function() {
		$('body').append( this.googleCalendarView.el );
		spyOn( $, 'ajax' );
		spyOn( this.googleCalendarView, 'getFeedSample' );
		this.googleCalendarView.delegateEvents();
		this.googleCalendarView.$el.find('.wx-edit-input').val('abc123@group.calendar.google.com');
		this.googleCalendarView.$el.find('.wx-next-button').click();
		expect( this.googleCalendarView.getFeedSample.mostRecentCall.args[0].getConfig().calendar_id ).toEqual('abc123@group.calendar.google.com');
	});

	it('should call getFeedSample with proper url', function() {
		$('body').append( this.googleCalendarView.el );
		spyOn( $, 'ajax' );
		this.googleCalendarView.$el.find('.wx-edit-input').val('aaron@gmail.com');
		this.googleCalendarView.$el.find('.wx-next-button').click();
		expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
	});

	it('should call getFeedSample with api check / confirm feed set to 1', function() {
		$('body').append( this.googleCalendarView.el );
		spyOn( $, 'ajax' );
		this.googleCalendarView.$el.find('.wx-social-input').val('http://www.facebook.com/pages/Brian-Hogg-Consulting/129044753852112');
		this.googleCalendarView.$el.find('.wx-next-button').click();
		expect( $.ajax.mostRecentCall.args[0].data.api_check ).toBe(1);
		expect( $.ajax.mostRecentCall.args[0].data.confirm_feed ).toBe(1);
	});

	it('should have validate area', function() {
		expect( this.googleCalendarView.$el.find('.wx-validate-feed').length ).toBe(1);
	});
});