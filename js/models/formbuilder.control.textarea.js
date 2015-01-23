
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlTextarea = wxApp.FormBuilderControl.extend({
		defaults: function() {
			// This is annoying
			// https://github.com/documentcloud/backbone/issues/476
			var newDefaults = _.extend( this.constructor.__super__.defaults(), {
				control: 'textarea',
				label: 'Untitled',
				showPlaceholder: true
			} );
			return newDefaults;
		},

		initialize: function( properties ) {
			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this, arguments );
		}
	});

})(jQuery);