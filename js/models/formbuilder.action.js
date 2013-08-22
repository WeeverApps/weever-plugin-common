
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderAction = Backbone.Model.extend({

		// http://documentcloud.github.com/backbone/#Model-defaults
		defaults: function() {
			return {
				control: 'action',
				method: 'post',
				value: ''
			};
		},

		initialize: function() {
			console.log( 'FormBuilderAction init' );
			console.log( this );
		}

	});

})(jQuery);