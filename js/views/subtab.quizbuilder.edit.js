(function($){
    wxApp.QuizBuilderSubTabEditView = wxApp.SubTabEditView.extend({
        baseEditTplSelector: '#quizbuilder-subtab-edit-template',
        questionViews      : [],

        initializeEvents: function() {
            this.events = _.extend({}, this.genericEvents, this.events);
        },

        events: {
            'click .wx-add-question'   : 'addNewQuestion',
            'click .wx-next'           : 'next',
            'click .wx-back-button'    : 'previous',
            'click .wx-finish'         : 'finish',
            'keyup .wx-edit-passphrase': 'updatePassphrase',
            'keyup .wx-edit-title'     : 'updateQuizName',
            'sortable-update'          : 'sortableUpdate',
        },

        render: function() {
            wxApp.SubTabEditView.prototype.render.apply( this, arguments );

            this.questionViews = [];

            for (var i = 0; i < this.model.get('quiz').get('questions').length; i++) {
                var question = this.model.get('quiz').get('questions').at(i);
                question.set('ordinal', i);
                this.addQuestion( question, false );
            };

            this.$el.foundation('reflow');

            // If this is an edit window, open up the first question.
            if ( this.model.id ) {
                $( $('#panel-question-list .accordion-navigation a')[0] ).click();
            }
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

            if ( true /* is live quiz */ ) {
                if ( quiz.get('settings').passphrase.trim().length === 0 ) {
                    errors.push( 'Please provide a passphrase for this quiz.' );
                this.$('.wx-edit-passphrase').addClass('wx-error');
                }
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
                view = this.addQuestion( newQuestion, true );

            // Open this preview.
            view.getPreview().$('a').click();
            // this.updateSortable();
        },

        addQuestion: function( question, showImmediately ) {
            var view = new wxApp.QuizBuilderQuestionView( { model: question } );

            this.$('.wx-please-add-msg').hide();

            if ( !showImmediately )
                view.$el.css('display', 'none');

            this.$('#panel-question-fields').append( view.render().el );
            this.$('.accordion').append( view.getPreview().render().el );

            question.on('destroy', this.questionDeleted, this);

            this.questionViews.push( view );

            this.updateSortable();

            return view;
        },

        updateSortable: function() {
            if ( this.questionViews.length >= 1 ) {
                $( '.accordion' ).sortable({
                    axis:  'y',
                    start: function( event, ui ) {
                        $( '.accordion-navigation' ).removeClass('active');
                        $( '.accordion-navigation div.content' ).removeClass('active');
                    },
                    stop:  function( event, ui ) {
                        ui.item.trigger( 'sortable-drop', ui.item.index() );
                    }
                });
            }
        },

        sortableUpdate: function( event, model, position ) {
            var questions = this.model.get( 'quiz' ).get('questions');
            questions.remove( model );
            questions.add( model, {at: position} );
        },

        next: function() {
            var me = this;
            me.$('.wx-quiz-builder-step-one').slideUp();
            me.$('.wx-quiz-builder-step-two').slideDown(); 
        },

        previous: function() {
            var me = this;
            me.$('.wx-quiz-builder-step-two').slideUp();
            me.$('.wx-quiz-builder-step-one').slideDown();
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

        updatePassphrase: function( ev ) {
            this.model.get('quiz').get('settings').passphrase = $( ev.currentTarget ).val();
        },

        updateQuizName: function( ev ) {
            this.model.get('quiz').set('name', $( ev.currentTarget ).val());
        }
    });
})(jQuery);