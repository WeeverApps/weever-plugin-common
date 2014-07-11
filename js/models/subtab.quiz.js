
wxApp = wxApp || {};

(function($) {
    wxApp.QuizBuilderSubTab = wxApp.SubTab.extend({
        defaults: function() {
            var newDefaults = _.extend( this.constructor.__super__.defaults(), {
                quizId: '',
                layout: 'panel',
                quiz  : new wxApp.Quiz()
            } );
            return newDefaults;
        },

        initialize: function( properties ) {

            // Call parent's initialize() function
            Backbone.Model.prototype.initialize.apply( this, arguments );

            console.log( 'PROPERTIES', properties );
            if ( properties ) {
            }
        },

        save: function( onSaveCallback ) {
            var me = this;

            // Save the quiz
            me.get('quiz').save(function() {
                me.set('quizId', me.get('quiz').get('_id'));

                // Save the tab.
                wxApp.SubTab.prototype.save.apply( me, [onSaveCallback] );
            });
        }
    });
})(jQuery);