
wxApp = wxApp || {};

(function($){
    wxApp.FormBuilderRepeatableFormView = wxApp.FormBuilderControlView.extend({
        inputTplSelector: '#form-builder-repeatable-form',
        preview: null,

        // Extend the events from the parent
        events: function() {
            return _.extend( {}, wxApp.FormBuilderControlView.prototype.events, {
                // 'change .wx-hdd-levels'       : 'changeLevels',
                // 'input .wx-form-builder-title': 'changeTitle'
            });
        },

        initialize: function( options ) {
            var $template = $( this.inputTplSelector );
            this.inputTpl = _.template( $template.html() );
        },

        getPreview: function() {
            if ( this.preview === null ) {
                this.preview = new wxApp.FormBuilderRepeatableFormPreview({ model: this.model });
            }
            return this.preview;
        },

        render: function() {
            this.$el.html( this.inputTpl( this.model.toJSON() ) );
            return this;
        },

        /* Start event callbacks */

        updateLabel: function( ev ) {
            var value = $( ev.currentTarget ).val();
            this.model.set( 'label', value );

            // Update the title on the 'Select Form' ddl
            $('.add-element-to-form option[value="' + this.model.get('ordinal') + '"]').html( '&mdash; ' + value );
        }

        /* Endof event callbacks */
    });


    wxApp.FormBuilderRepeatableFormPreview = wxApp.FormBuilderControlPreview.extend({
        selector: '#form-builder-repeatable-form-preview',

        events: function() {
            return _.extend( {}, wxApp.FormBuilderControlPreview.prototype.events, {
                // 'change .wx-hdd-dropdown-preview' : 'changeDropDown'
            });
        },

        initialize: function (attrs, options) {
            wxApp.FormBuilderControlPreview.prototype.initialize.apply(this, arguments); // call super constructor
            // this.model.get('options').bind('change', this.render, this);
        },

        render: function() {
            var me    = this,
                model = me.model.toJSON();

            if ( model.formElements.length === 0 ) {
                me.$el.html( me.inputTpl( model ) );
            }
            else {
                me.$('legend').html( model.label );
            }
            return me;
        }
    });

})(jQuery);
