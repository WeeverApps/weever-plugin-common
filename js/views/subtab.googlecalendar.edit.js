
wxApp = wxApp || {};

(function($){
    wxApp.GoogleCalendarSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#googlecalendar-subtab-edit-template',

        setModelFromView: function(model) {
            if ( this.$('.wx-edit-input') )
                model.setConfig('calendar_id', this.$('.wx-edit-input').val());
            return model;
        }
    });
})(jQuery);