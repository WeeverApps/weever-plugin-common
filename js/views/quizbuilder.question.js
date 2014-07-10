
(function($){
    wxApp.QuizBuilderQuestionView = Backbone.View.extend({
        tagName  : 'div',
        className: 'wx-question',
        selector : '#quiz-question',
        preview  : null,
        index    : 0,
        events   : {
            'keyup .wx-question-challenge': 'updateChallenge',
            'keyup .wx-question-response' : 'updateResponse',
        },

        initialize: function() {
            Backbone.View.prototype.initialize.apply( this, arguments );
            var $template = $( this.selector );
            this.inputTpl = _.template( $template.html() );
        },

        render: function() {
            var model = this.model.toJSON();
            this.$el.html( this.inputTpl( model ) );
            this.$el.attr('data-index', model.ordinal);
            return this;
        },

        getPreview: function() {
            if ( this.preview === null ) {
                this.preview = new wxApp.QuizBuilderQuestionPreview({ model: this.model });
            }
            return this.preview;
        },

        updateChallenge: function( e ) {
            this.model.set('challenge', $( e.currentTarget ).val());
        },

        updateResponse: function( e ) {
            var $ctl = $( e.currentTarget ),
                i    = parseInt( $ctl.data('index') );

            this.model.get('responses')[i] = $ctl.val();
            this.model.trigger( 'change' );
        }
    });

    wxApp.QuizBuilderQuestionPreview = Backbone.View.extend({
        tagName  : 'dd',
        className: 'accordion-navigation',
        selector : '#quiz-question-preview',
        index    : 0,
        events   : {
            'click'     : 'selectField' //,
            // 'sortable-drop': 'sortableDrop'
        },

        initialize: function() {
            Backbone.View.prototype.initialize.apply( this, arguments );
            var $template = $( this.selector );
            this.inputTpl = _.template( $template.html() );
            this.model.bind('change', this.render, this);
        },

        render: function() {
            var model    = this.model.toJSON(),
                isActive = this.$el.hasClass('active');

            this.$el.html( this.inputTpl( model ) );
            this.$el.data('index', model.ordinal);
            if ( isActive ) {
                this.$el.addClass('active');
                this.$('div.content').addClass('active');
            }
            return this;
        },

        selectField: function() {
            var me = this,
                index = me.$el.data('index');

            $('div.wx-question.active').slideUp(400, function() {
                $(this).removeClass('active');
            });
            $('div.wx-question[data-index="' + index +'"]').addClass('active').slideDown();
        }
    });
})(jQuery);