
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
                    wx.refreshAppPreview();
                }
            });

            wx.makeApiCall( 'tabs/set_icon_id', { tab_id: tabId, icon_id: iconId }, function() {
                console.log('Icon Saved');
                me.model.set('icon_id', iconId);
                if (++numCompleted == 2) {
                    wx.refreshAppPreview();
                }
            });

            console.log('Closing...');
            $('#ContainerEditModal').foundation('reveal', 'close');
    	}
    });
})(jQuery);