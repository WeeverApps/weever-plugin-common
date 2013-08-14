
wxApp = wxApp || {};

(function($){
    wxApp.SubTabView = wxApp.TabView.extend({
        tagName: 'li',
        className: 'wx-ui-row',

        attributes: function() {
            return {
                id: this.model.get('id') + 'SubtabID'
            }
        },

        initialize: function() {
            this.subTabTpl = _.template( $('#subtab-template').html() );
            var me = this;
            this.model.on('save', function() { me.render() });
            this.model.on('destroy', function() {
                wx.log('removing subtab item');
                me.remove();
            });
            this.model.on('tab:move', function() {
                me.remove();
            });
        },

        events: {
            'click .wx-edit-link': 'editSubTab',
            'click .wx-edit-subtab-icon': 'editIcon',
            'click .wx-subtab-delete': 'confirmDeleteSubTab'
        },

        render: function() {
            console.log('starting subtab view')
            this.$el.html( this.subTabTpl( this.model.toJSON() ) );
            // Add a reference to the view, not seeing another way to grab it from within the drop event.
            // Doing _.bind( this.onDrop, this ) would give access to the view it was dropped on, but not the element
            // that was dropped.
            this.$el.data( 'backbone-view', this );
            return this;
        },

        editSubTab: function(event) {
            event.preventDefault();
            wx.log('editSubTab FIRED');
            wx.log(this.model.getModelName());
            wx.log(this.model);

            var editViewName = this.model.getModelName() + 'EditView';
            if ( 'SubTabEditView' != editViewName && undefined !== wxApp[editViewName] )
                var view = new wxApp[editViewName]( { model: this.model } );
            else
                throw new Error( 'Invalid edit type ' + this.model.get('content') + '--' + editViewName );

            if ( false !== view )
                view.show();
        },

        confirmDeleteSubTab: function(event) {
            event.preventDefault();
            if ( confirm('Are you sure you want to delete this item?') )
                this.deleteSubTab();
        },

        deleteSubTab: function() {
            this.model.destroy();
        }
    });
})(jQuery);