
wxApp = wxApp || {};

(function($){
    wxApp.FeatureView = Backbone.View.extend({
        tagName: 'li',
        className: '',

        initialize: function() {
            this.featureTpl = _.template( $('#feature-template').html() );
            this.model.bind( 'change', this.render, this );
        },

        // TODO - Move click code to here.
        //events: {
        //    'dblclick .wx-nav-icon': 'editIcon',
        //    'dblclick .wx-nav-label': 'editTitle'
        //},

        render: function() {
            // Set default tier
            if ( typeof this.model.get('tierRequired') === 'undefined' ) {
                this.model.set('tierRequired', 1);
            }
            this.$el.html( this.featureTpl( this.model.toJSON() ) );

            if (this.model.get('rel') !== '') {
            	this.$('button').attr('rel', this.model.get('rel'));
        	}

            return this;
        }
    });
})(jQuery);