
(function($) {

	wxApp.Quiz = Backbone.Model.extend({
		defaults: function() {
			return {
				name:      '',
				questions: new wxApp.QuizQuestions(),
				settings:  {},
				_id:       null
			}
		},

		// Add a question with the default four answers.
		addQuestion: function() {
			var question = new wxApp.QuizQuestion();
			for (var i = 0; i < 4; i++) {
				question.get('responses').push( '' );
			};
			this.get('questions').add( question );
			return question;
		},

		fetch: function( onFetchedCallback ) {
			var me = this;

			wx.makeApiCall( '_quiz/get_all' /* or get by ID? */, { id: me._id }, function( data ) {
				console.log( 'GO QUIZBUILDER DATA!', data );
				if ( onFetchedCallback ) onFetchedCallback();
			} )
		},

		save: function( onSaveCallback ) {
			var me = this;

			wx.makeApiCall( '_quiz/create', me.toJSON(), function( data ) {
				me.set('_id', data.id);
				if ( onSaveCallback ) onSaveCallback();
			});
		}
	});
})(jQuery)