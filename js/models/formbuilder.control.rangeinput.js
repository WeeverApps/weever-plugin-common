
wxApp = wxApp || {};

(function($){

	wxApp.FormBuilderControlRangeInput = wxApp.FormBuilderControl.extend({
		defaults: function() {
			// This is annoying
			// https://github.com/documentcloud/backbone/issues/476
			var newDefaults = _.extend( this.constructor.__super__.defaults(), {
				input: 'range',
				label: 'Label'
			} );
			return newDefaults;
		},

		initialize: function() {
			// So is this
			// http://documentcloud.github.com/backbone/#Model-extend
			wxApp.FormBuilderControl.prototype.initialize.apply( this );
		}
	});

})(jQuery);