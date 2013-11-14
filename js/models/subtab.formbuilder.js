
wxApp = wxApp || {};

(function($){
    wxApp.FormBuilderSubTab = wxApp.SubTab.extend({
        default_icon_id: 30,
        validateFeed: false,
        buildPreview: true,
        typeDescription: 'Form Builder',

        defaults: function() {
            return _.extend( {}, wxApp.SubTab.prototype.defaults(), {
				title: 'My Form Title',
                icon: 'e074',
				tabTitle: 'Form',
				icon_id: 30,
				type: 'formbuilder',
				content: 'formBuilder',
				layout: 'panel',
        		buildPreview: true,
        		buttonText: 'Submit',
				config: {
					uploadUrl: window.location.origin + '/wp-admin/admin-ajax.php',
					onUpload: {
						message: 'Your upload has completed.'
					}
				}
			}
		);
        }
		
    });

    wxApp.DocuSignSubTab = wxApp.FormBuilderSubTab.extend({});

})(jQuery);