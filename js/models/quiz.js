
(function($) {

	wxApp.Quiz = Backbone.Model.extend({
		defaults: function() {
			return {
				name:      '',
				questions: new wxApp.QuizQuestions(),
				settings:  {
					passphrase: ''
				},
				_id:       null
			}
		},

		// Add a question with the default four answers.
		addQuestion: function() {
			var question = new wxApp.QuizQuestion();
			for (var i = 0; i < 4; i++) {
				question.get('responses').push( '' );
			};
			question.set('ordinal', this.get('questions').length);
			this.get('questions').add( question );
			return question;
		},

		fetch: function( onFetchedCallback ) {
			var me = this;

			wx.makeApiCall( '_quiz/get', { id: me.get('_id') }, function( data ) {
				var questionsJson = data.quiz.questions;
				delete data.quiz.questions;

				me.set( data.quiz );
				for (var i = 0; i < questionsJson.length; i++) {
					var question = new wxApp.QuizQuestion( questionsJson[i] );
					me.get('questions').add( question );
				};

				if ( onFetchedCallback ) onFetchedCallback();
			} )
		},

		save: function( onSaveCallback ) {
			var me = this;

			var json = me.toJSON();
			json.questions = [];
			for (var i = 0; i < me.get('questions').length; i++) {
				json.questions.push( me.get('questions').at(i).toJSON() );
			};
			json = { quiz: JSON.stringify( json ) };

			wx.makeApiCall( '_quiz/create', json, function( data ) {
				if ( data.error ) {
					alert('An error occurred while saving your quiz.');
					// TODO - Display better message (data.message?)
				}
				else {
					me.set('_id', data.quiz._id);
					if ( onSaveCallback ) onSaveCallback();
				}
			});
		}
	});
})(jQuery)