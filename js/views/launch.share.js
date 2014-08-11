
wxApp = wxApp || {};

(function($){
    wxApp.Share = Backbone.View.extend({
        el: '#launch_share',

        initialize: function() {
            var model = this.model.toJSON();
            console.log( model );

            var domain = null;
            if ( model.domain.length )
                domain = model.domain[0].domain;

            this.tpl = _.template( $('#launch-share').html() );
            this.$el.html( this.tpl( { domain: domain } ) );
        }
    });
})(jQuery);
