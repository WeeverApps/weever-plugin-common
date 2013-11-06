
wxApp = wxApp || {};

(function($){
    wxApp.ContainerEditView = Backbone.View.extend({
    	initialize: function() {
    		this.tpl = _.template( $('#ContainerEditContent').html() );
    	},

    	events: {
    		'click .wx-save-button': 'save'
    	},

    	render: function() {
    		this.$el.html( this.tpl( this.model.toJSON() ) );
    		return this;
    	},

    	cancel: function() {
    		try {
    			this.remove();
    		} catch (e) {}
    	},

    	save: function() {
    		console.log('Save.');
            var me = this;
            var tabId = this.model.get('id');
            var title = $('#container-title').val();
            var iconId = $('input:radio[name="wx-icon"]:checked').val();
            var numCompleted = 0;

            wx.makeApiCall( 'tabs/set_tabTitle', { tab_id: tabId, tabTitle: title }, function() {
                console.log('Title Saved');
                me.model.set('tabTitle', title);
                if (++numCompleted == 2) {
                    wx.rebuildApp();
                }
            });

            wx.makeApiCall( 'tabs/set_tabIcon_id', { tab_id: tabId, tabIcon_id: iconId }, function() {
                console.log('Tab Icon Saved');
                me.model.set('tabIcon_id', iconId);
                if (++numCompleted == 2) {
                    wx.rebuildApp();
                }
            });

            console.log('Closing...');
            $('#ContainerEditModal').foundation('reveal', 'close');
    	}
    });
})(jQuery);