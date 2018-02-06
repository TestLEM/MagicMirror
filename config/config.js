/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
			disabled: false,
			header: "",
			config: {
				// Possible values: scale, slide, genie, jelly, flip, exploader, bouncyflip
				effect: "slide",
				// Possible values: scale, slide, genie, jelly, flip, exploader, bouncyflip
				alert_effect: "jelly",
				// Possible values: int
				display_time: 3500,
				// Possible values: left, center, right
				position: "center",
				// Possible values: string false
				welcome_message: false
			}
		},
		{
			module: "updatenotification",
			// Possible values: top_ bar, top_left, top_center, top_right, upper_third, middle_center, lower_third, bottom_left, bottom_center, bottom_right, bottom_bar, fullscreen_above, and fullscreen_below
			position: "top_bar",
			disabled: false,
			header: "",
		},
		{
			module: "clock",
			position: "top_left",
			disabled: false,
			header: "",
			config: {
				// Possible values: 12 or 24
				timeFormat: 24,
				// Possible values: true or false
				displaySeconds: true,
				// Possible values: true or false
				showPeriod: true,
				// Possible values: true or false
				showPeriodUpper: false,
				// Possible values: true or false
				clockBold: false,
				// Possible values: true or false
				showDate: true,
				// Possible values: true or false
				showWeek: false,
				// Possible values: http://momentjs.com/docs/#/displaying/format/
				dateFormat: "dddd, LL",
				// Possible values: digital, analog, or both
				displayType: "digital",
				// Possible values: A positive number of pixels
				analogSize: 200,
				// Possible values: simple, none or face-### (where ### is currently a value between 001 and 012, inclusive)
				analogFace: "simple",
				// Possible values: any HTML RGB Color
				secondsColor: "#888888",
				// Possible values: top, right, bottom, or left
				analogPlacement: "bottom",
				// Possible values: false, top, or bottom
				analogShowDate: "top",
				// Possible examples values: America/New_York, America/Santiago, Etc/GMT+10
				timezone: "Asia/Seoul",
			}
		},
		{
			module: "calendar",
			position: "top_left",
			disabled: false,
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
		{
			module: "compliments",
			position: "lower_third",
			disabled: false,
			header: "",
			config: {
				// How often does the compliment have to change?
				// Possible values: 1000 - 86400000 (Milliseconds)
				updateInterval: 30000,
				// Speed of the update animation.
				// Possible values: 0 - 5000 (Milliseconds)
				fadeSpeed: 4000,
				// The list of compliments.
				// Possible values: An object with four arrays: morning, afternoon, evening and anytime. See compliment configuration below.
				compliments: {
					anytime: [
						"Hey there sexy!"
					],
					morning: [
						"Good morning, handsome!",
						"Enjoy your day!",
						"How was your sleep?"
					],
					afternoon: [
						"Hello, beauty!",
						"You look sexy!",
						"Looking good today!"
					],
					evening: [
						"Wow, you look hot!",
						"You look nice!",
						"Hi, sexy!"
					],
					// If use the currentweather is possible use a actual weather for set compliments. The availables properties are:
					// day_sunny, day_cloudy, cloudy, cloudy_windy, showers, rain, thunderstorm, snow, fog, night_clear, night_cloudy, night_showers, night_rain, night_thunderstorm, night_snow, night_alt_cloudy_windy
					day_sunny: [
						"Today is a sunny day",
						"It's a beautiful day"
					],
					snow: [
						"Snowball battle!"
					],
					rain: [
						"Don't forget your umbrella"
					],
				},
				// External file from which to load the compliments
				// Possible values: Path to a JSON file containing compliments, configured as per the value of the compliments configuration (see below). An object with four arrays: morning, afternoon, evening and anytime. - compliments.json
				remoteFile: null,
				// Override the CSS classes of the div showing the compliments
				classes: "thin xlarge bright",
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "New York",
				locationID: "",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "YOUR_OPENWEATHER_API_KEY"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "New York",
				locationID: "5128581",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "YOUR_OPENWEATHER_API_KEY"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
