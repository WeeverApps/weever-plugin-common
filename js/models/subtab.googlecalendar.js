
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
                config: { calendar_id: 'abc123@group.calendar.google.com' },
                helpTitle: 'Finding a calendar ID',
                helpBody:  '<p><b>Finding a Google Calendar ID</b></p>' +
                           '<p>1. Login to <a target="_blank" href="http://google.com/calendar">Google.com/calendar</a></p>' +
                           '<p>2. Choose a calendar and select &ldquo;settings&rdquo;</p>' +
                           '<p>3. Copy and paste the calendar ID from this page. It will be in a format like &ldquo;abc123@group.calendar.google.com&rdquo;.</p>' +
                           '<p><b>Primary calendars:</b></p>' +
                           '<p>A primary calendar is associated with your Google / Gmail account, for example: <b>emailaddress@gmail.com</b></p>' +
                           '<p><b>Group Calendars:</b></p>' +
                           '<p>Group calendars (aka &lsquo;secondary calendars&rsquo; should be added to your app in a format like <b>abc123@group.calendar.google.com</b>.</p>'
            }
        )
    });

})(jQuery);