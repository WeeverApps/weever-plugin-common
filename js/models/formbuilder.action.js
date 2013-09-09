
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderAction = Backbone.Model.extend({

		// http://documentcloud.github.com/backbone/#Model-defaults
		defaults: function() {
			return {
				control: 'action',
				method: 'post',
				value: '',
				pdfHeader: {
					title: '',
					line1: '',
					line2: '',
					line3: ''
				}
			};
		},

		initialize: function() {
			console.log( 'FormBuilderAction init' );
			console.log( this );
		}

	});

})(jQuery);