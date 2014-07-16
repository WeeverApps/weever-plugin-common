
(function($){
    wxApp.QuizBuilderQuestionView = Backbone.View.extend({
        tagName  : 'div',
        className: 'wx-question',
        selector : '#quiz-question',
        preview  : null,
        events   : {
            'keyup .wx-question-challenge': 'updateChallenge',
            'keyup .wx-question-response' : 'updateResponse',
            'click .wx-correct-answer'    : 'updateCorrectAnswer',
            'change .wx-challenge-photo'  : 'uploadFile',
            'click .wx-delete-question'   : 'deleteThis'
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

        deleteThis: function( e ) {
            this.model.destroy();
        },

        updateChallenge: function( e ) {
            this.model.set('challenge', $( e.currentTarget ).val());
            $( e.currentTarget ).removeClass('wx-error');
        },

        /**
         * This method's a little weird for two reasons:
         * 1. We need to save the *text* of the correct answer, not the 
         *    index / id / whatever, so we've gotta parse the DOM from the 
         *    radio to the nearest text box.
         * 2. Although we currently only support one correct answer, the 
         *    expected datatype is an array.
         */
        updateCorrectAnswer: function( e ) {
            var $radio = $( e.currentTarget ),
                $textbox = $radio.parent().parent().find('input.wx-question-response');
            this.model.set('answers', [ $textbox.val() ]);
        },

        updateResponse: function( e ) {
            var $ctl = $( e.currentTarget ),
                i    = parseInt( $ctl.data('index') );

            this.model.get('responses')[i] = $ctl.val();
            $( e.currentTarget ).removeClass('wx-error');
            this.model.trigger( 'change' );
        },

        uploadFile: function( e ) {
            
            console.log('uploadFile');
            var me = this,
                uploadUrl = wx.apiUrl + '/_google_drive/upload',
                url = wx.pluginUrl + 'file-upload.php?upload_path=' + wx.uploadPath + '&upload_url=' + wx.uploadUrl,
                $input = $( e.currentTarget ),
                $span  = $input.siblings('span');

            $span.html('Saving...');

            $.ajax( url, {
                processData: false,
                iframe: true,
                files: $input,
                success: function( data ) {

                    // The stupid data comes in HTML for some reason (WP only?)
                    // Strip out the HTML, and convert to json object.
                    data = data.replace(/(<([^>]+)>)/ig,"");
                    data = JSON.parse( data );

                    me.model.set( 'imageUrl',  data.file_name );
                    $span.html( 'Saved!' );
                    setTimeout( function() {
                        $span.html('Upload image');
                    }, 5000 );
                }
            } );

        }
    });

    wxApp.QuizBuilderQuestionPreview = Backbone.View.extend({
        tagName  : 'dd',
        className: 'accordion-navigation',
        selector : '#quiz-question-preview',
        events   : {
            'click'        : 'selectField',
            'sortable-drop': 'sortableDrop'
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
        },

        sortableDrop: function( event, index ) {
            this.$el.trigger( 'sortable-update', [this.model, index] );
        }
    });
})(jQuery);