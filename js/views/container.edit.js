
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
            var me = this,
                tabId = this.model.get('id'),
                title = $('#container-title').val(),
                iconId = $('input:radio[name="wx-icon"]:checked').val(),
                numCompleted = 0;

            wx.makeApiCall( 'tabs/set_tabTitle', { tab_id: tabId, tabTitle: title }, function() {
                me.model.set('tabTitle', title);
                if (++numCompleted == 2) {
                    wx.rebuildApp();
                }
            });

            wx.makeApiCall( 'tabs/set_tabIcon', { tab_id: tabId, tabIcon: iconId }, function() {
                me.model.set('tabIcon_id', null);
                me.model.set('tabIcon', iconId);
                if (++numCompleted == 2) {
                    wx.rebuildApp();
                }
            });

            //console.log('Closing...');
            $('#ContainerEditModal').foundation('reveal', 'close');
    	}
    });
})(jQuery);