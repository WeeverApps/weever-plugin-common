
wxApp = wxApp || {};

(function($){
    wxApp.FormBuilderSubTab = wxApp.SubTab.extend({
        default_icon_id: 30,
        validateFeed: false,
        typeDescription: 'Form Builder',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
			{
				title: 'Formbuilder Title',
				tabTitle: 'Form',
				icon_id: 30,
				type: 'formbuilder',
				content: 'formbuilder',
				layout: 'panel',
				config: {
					uploadUrl: window.location.origin + '/wp-admin/admin-ajax.php'
				}
			}
		)
	    
    });

})(jQuery);