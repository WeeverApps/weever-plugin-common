
(function($) {

	wxApp.Quiz = Backbone.Model.extend({
		defaults: function() {
			return {
				name:      '',
				questions: new wxApp.QuizQuestions(),
				tags:      [],
				settings:  {},
				_id:       null
			}
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