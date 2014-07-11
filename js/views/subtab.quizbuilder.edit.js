(function($){
    wxApp.QuizBuilderSubTabEditView = wxApp.SubTabEditView.extend({
        baseEditTplSelector: '#quizbuilder-subtab-edit-template',
        questionViews      : [],

        initializeEvents: function() {
            this.events = _.extend({}, this.genericEvents, this.events);
        },

        initialize: function() {
            // Call parent's initialize() function
            wxApp.SubTabEditView.prototype.initialize.apply( this, arguments );
        },

        events: {
            'click .wx-add-question' : 'addNewQuestion',
            'click .wx-finish'       : 'finish',
            'keyup .wx-edit-title'   : 'updateQuizName'
        },

        render: function() {
            wxApp.SubTabEditView.prototype.render.apply( this, arguments );

            this.questionViews = [];

            for (var i = 0; i < this.model.get('quiz').get('questions').length; i++) {
                var question = this.model.get('quiz').get('questions').at(i);
                question.ordinal = i;
                this.addQuestion( question );
            };

            this.$el.foundation('reflow');
        },

        validate: function() {
            var quiz   = this.model.get('quiz'),
                errors = [];

            // Clear the old error warnings.
            this.$('input').removeClass('wx-error');

            if ( quiz.get( 'name' ).trim().length === 0 ) {
                errors.push( 'Please provide a name for this quiz.' );
                this.$('.wx-edit-title').addClass('wx-error');
            }

            if ( quiz.get('questions').length === 0 ) {
                errors.push( 'Please add at last one question.' );
            }
            else {
                for (var i = 0; i < quiz.get('questions').length; i++) {
                    errors = this.validateQuestion( i, errors );
                };
            }

            if ( errors.length ) {
                var errorMessage = '',
                    $alert = this.$('.alert-box.alert .message');
                errors.forEach( function( error ) { errorMessage += '<br><br>' + error; });
                $alert.html( errorMessage );
                $alert.parent().slideDown();
                return false;
            }

            return true;
        },

        validateQuestion: function( i, errors ) {

            var questionCtl = this.questionViews[i].$('.wx-question-challenge');
            if ( questionCtl.val().trim().length === 0 ) {
                errors.push( 'Enter a question for Question ' + (i+1) );
                questionCtl.addClass( 'wx-error' );
            }

            for (var j = 0; j < this.model.get('quiz').get('questions').at(i).get('responses').length; j++) {
                var response = this.model.get('quiz').get('questions').at(i).get('responses')[j],
                    responseCtl = this.questionViews[i].$('input[data-index="' + j + '"]');
                if ( responseCtl.val().trim().length === 0 ) {
                    errors.push( 'Enter an answer for Question ' + (i+1) + ', Answer ' + (j+1) );
                    responseCtl.addClass( 'wx-error' );
                }
            };

            if ( typeof this.$('[name="answer-' + i + '"]:checked').val() === 'undefined' ) {
                errors.push( 'Please select the correct answer for Question ' + (i+1) );
                this.$('[name="answer-' + i + '"]').addClass( 'wx-error' );
            }

            return errors;
        },

        addNewQuestion: function() {
            var newQuestion = this.model.get('quiz').addQuestion(),
                view = this.addQuestion( newQuestion );

            // Open this preview.
            view.getPreview().$('a').click();
        },

        addQuestion: function( question ) {
            var view = new wxApp.QuizBuilderQuestionView( { model: question } );

            this.$('#panel-question-fields').append( view.render().el );
            this.$('.accordion').append( view.getPreview().render().el );

            question.on('destroy', this.questionDeleted, this);

            this.questionViews.push( view );
            return view;
        },

        questionDeleted: function( q ) {
            var me = this;
            this.model.get('quiz').get('questions').once('remove', function( question, array, options ) {
                // me.questionViews[ options.index ].getPreview().remove();
                // me.questionViews[ options.index ].remove();
                // me.questionViews.splice( options.index, 1 );
                me.render();
            })
            this.model.get('quiz').get('questions').remove( q );
        },

        updateQuizName: function( ev ) {
            this.model.get('quiz').set('name', $( ev.currentTarget ).val());
        }
    });
})(jQuery);