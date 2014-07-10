(function($){
    wxApp.QuizBuilderSubTabEditView = wxApp.SubTabEditView.extend({
        baseEditTplSelector: '#quizbuilder-subtab-edit-template',

        initializeEvents: function() {
            this.events = _.extend({}, this.genericEvents, this.events);
        },

        initialize: function() {
            // Call parent's initialize() function
            wxApp.SubTabEditView.prototype.initialize.apply( this, arguments );

            this.model.bind('change', this.render, this);
            this.model.get('quiz').bind('change', this.render, this);
            // this.model.get('quiz').get('questions').bind('add', this.render, this);
        },

        events: {
            'click .wx-add-question' : 'addQuestion'
        },

        render: function() {
            wxApp.SubTabEditView.prototype.render.apply( this, arguments );
            this.$el.foundation('reflow');
        },

        addQuestion: function() {
            var index       = this.model.get('quiz').get('questions').length,
                newQuestion = this.model.get('quiz').addQuestion(),
                template    = _.template( $('#quiz-question').html(), { question: newQuestion, index: index } );
            this.$('.accordion').append( template );
        }

    });
})(jQuery);