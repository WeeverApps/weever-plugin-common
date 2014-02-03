
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
            'click .wx-add-feature': 'addFeature'
        },

        render: function() {
            // Set default tier
            if ( typeof this.model.get('tierRequired') === 'undefined' ) {
                this.model.set('tierRequired', 1);
            }
            this.$el.html( this.featureTpl( this.model.toJSON() ) );

            if (this.model.get('rel') !== '') {
            	this.$('a').attr('rel', this.model.get('rel'));
        	}

            return this;
        },

        addFeature: function(ev) {
            var featureName = ev.currentTarget.id.replace('add-', '');

            if (this.$('a').hasClass( 'wx-unavailable' )) {

                // We don't have this feature yet :(
                $('#wx-edit-area-' + featureName).html( $('#please-subscribe').html() );

            } else if ( this.model.get('tierRequired') > parseFloat( wxApp.account.get( 'tier_raw' ) ) ) {

                // The current user doesn't have access to this feature. Prompt them to upgrade.
                $('#wx-edit-area-' + featureName).html( $('#please-upgrade').html() );

            } else {

                wxApp.appView.createFeatureView( featureName, null );

            }
        }
    });
})(jQuery);