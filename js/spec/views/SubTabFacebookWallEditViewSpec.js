describe('SubTabFacebookWallEditView', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/test/fixtures/';
        loadFixtures('subtab.facebookwall.edit.tpl.html', 'subtab.edit.header.tpl.html', 'subtab.edit.footer.tpl.html', 'feedsample.tpl.html');
        this.facebookWallModel = new wxApp.FacebookWallSubTab();
        this.facebookWallView = new wxApp.FacebookWallSubTabEditView({
            model: this.facebookWallModel
        });
    });

    afterEach(function() {
        this.facebookWallView.remove();
    });

    it('should render', function() {
        expect( this.facebookWallView.el.tagName.toLowerCase() ).toBe('div');
    });

    it('should have input box', function() {
        expect( this.facebookWallView.$el.find('.wx-social-input').length ).toBe(1);
    });

    it('should have default value in box', function() {
        expect( this.facebookWallView.$el.find('.wx-social-input').attr('value') ).toEqual( this.facebookWallModel.getConfig().url );
    });

    it('should have finish button', function() {
        expect( this.facebookWallView.$el.find('.wx-finish-button').length ).toBe(1);
    });

	it('should have next button shown by default', function() {
		$('body').append( this.facebookWallView.el );
		expect( this.facebookWallView.$el.find('.wx-next-button').length ).toBe(1);
		expect( this.facebookWallView.$el.find('.wx-next-button') ).toBeVisible();
		expect( this.facebookWallView.$el.find('.wx-finish-button') ).toBeHidden();
	});

	it('should call next when next clicked', function() {
		spyOn( this.facebookWallView, 'next' );
		this.facebookWallView.delegateEvents();
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.next ).toHaveBeenCalled();
	});

	it('should call validateFeed with server when next clicked', function() {
		spyOn( this.facebookWallView, 'validateFeed' );
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.validateFeed ).toHaveBeenCalled();
	});

	it('should call getFeedSample', function() {
		spyOn( this.facebookWallView, 'getFeedSample').andReturn({ success: true });
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.getFeedSample ).toHaveBeenCalled();
	});

	it('should call jquery ajax when getting feed sample', function() {
		spyOn( $, 'ajax' );
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( $.ajax ).toHaveBeenCalled();
	});

	it('should call getAPIData when getting feed sample', function() {
		spyOn( $, 'ajax' );
		spyOn( this.facebookWallModel, 'getAPIData').andReturn({});
		this.facebookWallView.getFeedSample( this.facebookWallModel );
		expect( this.facebookWallModel.getAPIData ).toHaveBeenCalled();
	});

	it('should add facebook url to the call to validate the feed', function() {
		$('body').append( this.facebookWallView.el );
		spyOn( $, 'ajax' );
		spyOn( this.facebookWallView, 'getFeedSample' );
		this.facebookWallView.delegateEvents();
		this.facebookWallView.$el.find('.wx-social-input').val('http://www.facebook.com/pages/Brian-Hogg-Consulting/129044753852112');
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.getFeedSample.mostRecentCall.args[0].getConfig().url ).toEqual('http://www.facebook.com/pages/Brian-Hogg-Consulting/129044753852112');
	});

	it('should call getFeedSample with proper url', function() {
		$('body').append( this.facebookWallView.el );
		spyOn( $, 'ajax' );
		this.facebookWallView.$el.find('.wx-social-input').val('http://www.facebook.com/pages/Brian-Hogg-Consulting/129044753852112');
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( $.ajax.mostRecentCall.args[0].url ).toEqual(wx.apiUrl + 'validator/validate_feed?site_key=' + wx.siteKey);
	});

	it('should call getFeedSample with api check / confirm feed set to 1', function() {
		$('body').append( this.facebookWallView.el );
		spyOn( $, 'ajax' );
		this.facebookWallView.$el.find('.wx-social-input').val('http://www.facebook.com/pages/Brian-Hogg-Consulting/129044753852112');
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( $.ajax.mostRecentCall.args[0].data.api_check ).toBe(1);
		expect( $.ajax.mostRecentCall.args[0].data.confirm_feed ).toBe(1);
	});

	it('should show sample feed results if there are any and show finish button', function() {
		$('body').append( this.facebookWallView.el );
		spyOn( this.facebookWallView, 'displayFeedSample' ).andCallThrough();
		spyOn( $, 'ajax' ).andCallFake(function(params) {
			params.success({ feed: [{ image: "http://static.ak.fbcdn.net/rsrc.php/v2/yz/r/StEh3RhPvjk.gif", url: "http://www.facebook.com/photo.php?fbid=10151553364840903&set=a.280064620902.188824.110849485902&type=1&relevant_count=1", title: "", "content": "Happy International Women's Day! LIVE UNITED \r\n\r\nhttp://ow.ly/izASS" }], success: true });
		});
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.displayFeedSample ).toHaveBeenCalled();
		expect( this.facebookWallView.$el.find('.wx-validate-feed').find('ul').find('li').length ).toBe(1);
		expect( this.facebookWallView.$el.find('.wx-validate-feed').find('ul').find('li:first').find('img').length ).toBe(1);
		expect( this.facebookWallView.$el.find('.wx-validate-feed').find('ul').find('li:first').find('div.wx-content').length ).toBe(1);
		expect( this.facebookWallView.$el.find('.wx-next-button') ).toBeHidden();
		expect( this.facebookWallView.$el.find('.wx-finish-button') ).toBeVisible();
	});

	it('should show special message if no feed items', function() {
		$('body').append( this.facebookWallView.el );
		spyOn( this.facebookWallView, 'displayFeedSample' ).andCallThrough();
		spyOn( $, 'ajax' ).andCallFake(function(params) {
			params.success({ feed: [], success: true });
		});
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.displayFeedSample ).toHaveBeenCalled();
		expect( this.facebookWallView.$el.find('.wx-validate-feed').html() ).toEqual('No content added yet?');
		expect( this.facebookWallView.$el.find('.wx-next-button') ).toBeHidden();
		expect( this.facebookWallView.$el.find('.wx-finish-button') ).toBeVisible();
	});

	it('should re-show the finish button on textbox change', function() {
		$('body').append( this.facebookWallView.el );
		spyOn( $, 'ajax' ).andCallFake(function(params) {
			params.success({ feed: [], success: true });
		});
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.$el.find('.wx-next-button') ).toBeHidden();
		this.facebookWallView.$el.find('.wx-social-input').trigger('change');
		expect( this.facebookWallView.$el.find('.wx-next-button') ).toBeVisible();
	});

	it('should call saveModel when finished clicked', function() {
		spyOn( this.facebookWallView, 'saveModel' );
		this.facebookWallView.$el.find('.wx-finish-button').click();
		expect( this.facebookWallView.saveModel ).toHaveBeenCalled();
	});

	it('should show an error if feed invalid', function() {
		$('body').append( this.facebookWallView.el );
		spyOn( $, 'ajax' ).andCallFake(function(params) {
			params.success({ "error": true });
		});
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.$('.wx-feed-error') ).toBeVisible();
	});

	it('should not show an error if feed valid', function() {
		$('body').append( this.facebookWallView.el );
		spyOn( $, 'ajax' ).andCallFake(function(params) {
			params.success({ feed: [], success: true });
		});
		this.facebookWallView.$el.find('.wx-next-button').click();
		expect( this.facebookWallView.$('.wx-feed-error') ).toBeHidden();
	});

    it('should try to save model on finish', function() {
        spyOn( this.facebookWallModel, 'save' );
        this.facebookWallView.$el.find('.wx-social-input').val('http://www.facebook.com/pages/Brian-Hogg-Consulting/902843');
        this.facebookWallView.$el.find('.wx-finish-button').click();
        expect( this.facebookWallModel.save ).toHaveBeenCalled();
        expect( this.facebookWallView.model.getConfig().url ).toEqual('http://www.facebook.com/pages/Brian-Hogg-Consulting/902843');
    });

    it('should have cancel button', function() {
        expect( this.facebookWallView.$el.find('.wx-cancel-button').length ).toBe(1);
    });

    it('should have header title', function() {
		expect( this.facebookWallView.$el.find('.wx-subtab-edit-header').length ).toBe(1);
    });

	it('should have validate area', function() {
		expect( this.facebookWallView.$el.find('.wx-validate-feed').length ).toBe(1);
	});

//    it('should update model when setModelFromView called', function() {
//        this.facebookWallView.$el.find('.wx-social-input').val('http://facebook.com/UnitedWayy');
//        this.facebookWallView.setModelFromView(this.facebookWallView.model);
//        expect( this.facebookWallView.model.getConfig().url ).toEqual('http://facebook.com/UnitedWayy');
//    });
});