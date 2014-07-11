(function($){
    wxApp.QuizBuilderSubTabEditView = wxApp.SubTabEditView.extend({
        baseEditTplSelector: '#quizbuilder-subtab-edit-template',

        initializeEvents: function() {
            this.events = _.extend({}, this.genericEvents, this.events);
        },

        initialize: function() {
            // Call parent's initialize() function
            wxApp.SubTabEditView.prototype.initialize.apply( this, arguments );

            // this.model.bind('change', this.render, this);
            this.model.get('quiz').bind('change', this.render, this);
        },

        events: {
            'click .wx-add-question' : 'addQuestion',
            'click .wx-finish'       : 'finish',
            'keyup .wx-edit-title'   : 'updateQuizName'
        },

        render: function() {
            wxApp.SubTabEditView.prototype.render.apply( this, arguments );
            this.$el.foundation('reflow');
        },

        addQuestion: function() {
            var newQuestion = this.model.get('quiz').addQuestion(),
                index       = this.model.get('quiz').get('questions').length,
                view        = new wxApp.QuizBuilderQuestionView( { model: newQuestion, index: index } );

            this.$('#panel-question-fields').append( view.render().el );
            this.$('.accordion').append( view.getPreview().render().el );

            // Open this preview.
            view.getPreview().$('a').click();
        },

        updateQuizName: function( ev ) {
            this.model.get('quiz').set('name', $( ev.currentTarget ).val());
        }
    });
})(jQuery);