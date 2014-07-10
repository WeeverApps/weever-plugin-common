
(function($){
    wxApp.QuizBuilderQuestionView = Backbone.View.extend({
        tagName  : 'div',
        className: 'wx-question',
        selector : '#quiz-question',
        preview  : null,
        index    : 0,
        events   : {
            'keyup .wx-question-challenge': 'updateChallenge'
        },

        initialize: function() {
            Backbone.View.prototype.initialize.apply( this, arguments );
            var $template = $( this.selector );
            this.inputTpl = _.template( $template.html() );
            // this.model.bind('change', this.render, this);
        },

        render: function() {
            var model = this.model.toJSON();
            this.$el.html( this.inputTpl( model ) );
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
console.log('isActive:', isActive);
            this.$el.html( this.inputTpl( model ) );
            if ( isActive ) {
                this.$el.addClass('active');
                this.$('div.content').addClass('active');
            }
            return this;
        },

        selectField: function() {
            console.log('selectField');
        }
    });
})(jQuery);