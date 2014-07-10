(function($) {
	wxApp.QuizQuestion = Backbone.Model.extend({
		defaults: function() {
			challenge: '',
			responses: [],	// Just an array of strings for now.
			answers  : [],	// Only one for now.
			settings : {}
		}
	});

	wxApp.QuizQuestions = Backbone.Collection.extend({
		model: wxApp.QuizQuestion
	});
})(jQuery);