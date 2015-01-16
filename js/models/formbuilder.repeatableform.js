
wxApp = wxApp || {};

(function($) {

    wxApp.FormBuilderRepeatableForm = Backbone.Model.extend({
        defaults: function() {
            return {
                advanced: true,
                control : 'repeatableform',
                label   : 'Repeatable Form',
                ordinal : 0
            };
        },

        initialize: function( properties ) {

            // Call parent's initialize() function
            Backbone.Model.prototype.initialize.apply( this, arguments );
            this.set('formElements', new wxApp.FormBuilderCollection());

            return this;
        }
    });

})(jQuery);
