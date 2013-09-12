
wxApp = wxApp || {};

(function($){
    wxApp.FeatureView = Backbone.View.extend({
        tagName: 'li',
        className: '',

        initialize: function() {
            this.featureTpl = _.template( $('#feature-template').html() );
            this.model.bind( 'change', this.render, this );
            //this.model.bind( 'destroy', this.destroyView, this );
        },

        // TODO - Move click code to here.
        //events: {
        //    'dblclick .wx-nav-icon': 'editIcon',
        //    'dblclick .wx-nav-label': 'editTitle'
        //},

        render: function() {
            this.$el.html( this.featureTpl( this.model.toJSON() ) );

            // TODO - CSS Class, filtering
            if (this.model.get('rel') !== '') {
            	this.$('button').attr('rel', this.model.get('rel'));
        	}

            return this;
        }
    });
})(jQuery);