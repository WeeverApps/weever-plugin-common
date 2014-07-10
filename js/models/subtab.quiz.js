
wxApp = wxApp || {};

(function($) {
    wxApp.QuizBuilderSubTab = wxApp.SubTab.extend({
        defaults: function() {
            var newDefaults = _.extend( this.constructor.__super__.defaults(), {
                quizId: '',
                quiz  : new wxApp.Quiz()
            } );
        },

        initialize: function( properties ) {

            // Call parent's initialize() function
            Backbone.Model.prototype.initialize.apply( this, arguments );

            console.log( 'PROPERTIES', properties );
            if ( !properties ) {
                this.set('quiz', new wxApp.Quiz());
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