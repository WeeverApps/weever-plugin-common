
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
                iconId = $('input:radio[name="wx-icon"]:checked').val();

            wx.makeApiCall( 'tabs/set_tabAttributes', { tab_id: tabId, tabTitle: title, tabIcon: iconId }, function() {
                me.model.set( 'tabTitle', title );
                me.model.set( 'tabIcon_id', null );
                me.model.set( 'tabIcon', iconId );

                wx.rebuildApp();
            });

            console.log('Closing...');
            $('#ContainerEditModal').foundation('reveal', 'close');
    	}
    });
})(jQuery);