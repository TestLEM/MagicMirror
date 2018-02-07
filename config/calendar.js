{
	module: "calendar",
	position: "top_left",
	header: "KR Holidays",
	config: {
		// The maximum number of events shown.
		// Possible values: 0 - 100
		maximumEntries: 10,
		// he maximum number of days in the future.
		maximumNumberOfDays: 365,
		// Possible values: true or false
		displaySymbol: true,
		// Possible values: https://fontawesome.com/icons?d=gallery
		defaultSymbol: "calendar",
		// Possible values: 10 - 50
		maxTitleLength: 25,
		// Wrap event titles to multiple lines. Breaks lines at the length defined by maxTitleLength.
		// Possible values: true or false
		wrapEvents: false,
		// How often does the content needs to be fetched?
		// Possible values: 1000 - 86400000 (Milliseconds)
		fetchInterval: 300000,
		// Possible values:0 - 5000 (Milliseconds)
			animationSpeed: 2000,
		// Fade the future events to black. (Gradient)
		// Possible values: true or false
		fade: true,
		// Where to start fade?
		// Possible values: 0 (top of the list) - 1 (bottom of list)
		fadePoint: 0.25,
		// Possible values: An array, see calendar configuration below.
		calendars: [
			{
				// The symbol to show in front of an event. This property is optional.
				// Possible values: https://fontawesome.com/icons?d=gallery. To have multiple symbols you can define them in an array e.g. ["calendar", "plane"]
				symbol: "calendar-check-o",
				// The url of the calendar .ical. This property is required.
				// Possible values: Any public accessble .ical calendar.
				url: "webcal://www.officeholidays.com/ics/ics_country_code.php?iso=KR",
				// The font color of an event from this calendar. This property should be set if the config is set to colored: true.
				// Possible values: HEX, RGB or RGBA values (#efefef, rgb(242,242,242), rgba(242,242,242,0.5)).
				color: "#efefef",
				// The count title for yearly repating events in this calendar.
				// Example: 'Birthday'
				repeatingCountTitle: "Birthday",
				// The maximum number of events shown. Overrides global setting.
				// Possible values: 0 - 100
				maximumEntries: 10,
				// The maximum number of days in the future. Overrides global setting
				maximumNumberOfDays: 365,
				// The object containing options for authentication against the calendar.
				// auth:
			}
		],
		// An object of textual replacements applied to the tile of the event. This allow to remove or replace certains words in the title.
		// Example: {'Birthday of ' : '', 'foo':'bar'}
		titleReplace: { "De verjaardag van ": "", "'s birthday": "" },
		// Show count title for yearly repeating events (e.g. "X. Birthday", "X. Anniversary")
		// Possible values: true or false
		displayRepeatingCountTitle: false,
		// Format to use for the date of events (when using absolute dates)
		// Possible values: http://momentjs.com/docs/#/parsing/string-format/
		dateFormat: "MMM Do",
		// Format to use for the date of full day events (when using absolute dates)
		// Possible values: See Moment.js formats
		fullDayEventDateFormat: "MMM Do",
		// Display event times as absolute dates, or relative time
		// Possible values: absolute or relative
		timeFormat: "relative",
		// How much time (in hours) should be left until calendar events start getting relative?
		// Possible values: 0 (events stay absolute) - 48 (48 hours before the event starts)
		getRelative: 6,
		// When using a timeFormat of absolute, the urgency setting allows you to display events within a specific time frame as relative. This allows events within a certain time frame to be displayed as relative (in xx days) while others are displayed as absolute dates
		// Possible values: a positive integer representing the number of days for which you want a relative date, for example 7 (for 7 days)
		urgency: 7,
		// If this property is set to true, the calendar will broadcast all the events to all other modules with the notification message: CALENDAR_EVENTS. The event objects are stored in an array and contain the following fields: title, startDate, endDate, fullDayEvent, location and geo.
		// Possible values: true, false
		broadcastEvents: true,
		// Hides private calendar events.
		// Possible values: true or false
		hidePrivate: false,
		// An array of words / phrases from event titles that will be excluded from being shown.
		// Example: ['Birthday', 'Hide This Event']
		excludedEvents: [],
	}
},