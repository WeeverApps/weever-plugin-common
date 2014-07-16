(function($) {
    wxApp.QuizQuestion = Backbone.Model.extend({
        defaults: function() {
            return {
                challenge: '',
                imageUrl:  '',
                responses: [],  // Just an array of strings for now.
                answers  : [],  // Only one for now.
                ordinal  : 0,
                settings : {}
            }
        }
    });

    wxApp.QuizQuestions = Backbone.Collection.extend({
        model: wxApp.QuizQuestion
    });
})(jQuery);