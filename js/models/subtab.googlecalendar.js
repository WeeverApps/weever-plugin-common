
wxApp = wxApp || {};

(function($){
    wxApp.GoogleCalendarSubTab = wxApp.SubTabV3.extend({
        default_icon_id: 7,
        allowedLayouts: ['list'],
        typeDescription: 'Google Calendar',

        defaults: function() {
            return _.extend( {}, wxApp.SubTabV3.prototype.defaults(), {
                title: 'Calendar',
                icon: 'e061',
                icon_id: 7,
                type: 'googleCalendar',
                content: 'googleCalendar',
                layout: 'list',
                config: { calendar_id: 'abc123@group.calendar.google.com', subtab_name: 'GoogleCalendarSubTab' },
                // helpTitle: 'Finding a calendar ID',
                helpBody:  '<p><b>Primary Google calendars:</b></p>' +
                           '<p>A primary calendar is associated with your Google / Gmail account, for example:</p>' +
                           '<p>emailaddress@gmail.com</p>' +
                           '<p><b>Group Google Calendars:</b></p>' +
                           '<p>Group calendars (aka &lsquo;secondary calendars&rsquo; should be added to your app in a format like abc123@group.calendar.google.com.</p>' +
                           '<p><b>Finding a Group Calendar ID</b></p>' +
                           '<p>1. Login to <a target="_blank" href="http://google.com/calendar">Google.com/calendar</a></p>' +
                           '<p>2. Choose a calendar and select &ldquo;settings&rdquo;</p>' +
                           '<p>3. Copy and paste the calendar ID from this page.</p>' +
                           '<p>The web address for the group calendar will be in a format like &ldquo;abc123@group.calendar.google.com&rdquo;.</p>'
            }
        );
}
    });

})(jQuery);