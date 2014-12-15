
wxApp = wxApp || {};

(function($){

    wxApp.FormBuilderControlPagebreak = Backbone.Model.extend({
        defaults: function() {
            return {
                control: 'pagebreak',
                controlTitle: 'Page Break'
            };
        }
    });

})(jQuery);