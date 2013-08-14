
wxApp = wxApp || {};

(function($){
    wxApp.GoogleCalendarSubTab = wxApp.SubTab.extend({
        default_icon_id: 7,
        allowedLayouts: ['list'],
        typeDescription: 'Google Calendar',

        defaults: _.extend( {}, wxApp.SubTab.prototype.defaults,
            {
                title: 'Calendar',
                icon_id: 7,
                type: 'googleCalendar',
                content: 'googleCalendar',
                layout: 'list',
                config: { calendar_id: 'abc123@group.calendar.google.com' }
            }
        )
    });

})(jQuery);