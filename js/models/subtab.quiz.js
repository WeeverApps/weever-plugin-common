
wxApp = wxApp || {};

(function($) {
    wxApp.QuizBuilderSubTab = wxApp.SubTab.extend({
        defaults: function() {
            var newDefaults = _.extend( this.constructor.__super__.defaults(), {
                content: 'quiz',
                layout : 'panel',
                config : { quiz_id: '' },
                quiz   : new wxApp.Quiz()
            } );
            return newDefaults;
        },

        initialize: function( properties ) {

            // Call parent's initialize() function
            Backbone.Model.prototype.initialize.apply( this, arguments );

            if ( properties ) {
                // Get the quiz.
                var quiz = new wxApp.Quiz({ _id: this.getConfig().quiz_id });
                this.set( 'quiz', quiz );
                quiz.fetch();
            }
        },

        save: function( onSaveCallback ) {
            var me = this;

            // Save the quiz
            me.get('quiz').save(function() {
                me.setConfig('quiz_id', me.get('quiz').get('_id'));

                // Save the tab.
                wxApp.SubTab.prototype.save.apply( me, [onSaveCallback] );
            });
        }
    });
})(jQuery);