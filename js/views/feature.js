
wxApp = wxApp || {};

(function($){
    wxApp.FeatureView = Backbone.View.extend({
        tagName: 'li',
        className: '',

        initialize: function() {
            this.featureTpl = _.template( $('#feature-template').html() );
            this.model.bind( 'change', this.render, this );
        },

        events: {
            'click .wx-add-feature': 'addFeature',
        },

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
        },

        addFeature: function(ev) {
            console.log('right');
            console.log( this.model.get('tierRequired') );
            console.log( wxApp.account.tier_raw );

            if ( this.model.get('tierRequired') >= wxApp.account.tier_raw ) {
                wxApp.appView.createFeatureView(ev.currentTarget.id.replace('add-', ''));
            } else {
                alert( 'You cant do this!' )
            }
        }
    });
})(jQuery);