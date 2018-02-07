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
				location: "Seoul",
				locationID: "1835848",
				appid: "270367c3265f92394c0d5e8d810ae9d2",
				// What units to use. Specified by config.js 
				// Possible values: config.units = Specified by config.js, default = Kelvin, metric = Celsius, imperial =Fahrenheit 
				units: "metric",
				// Round temperature value to nearest integer. 
				// Possible values: true (round to integer) or false (display exact value with decimal point) 
				roundTemp: false,
				// Show the degree label for your chosen units (Metric = C, Imperial = F, Kelvins = K). 
				// Possible values: true or false 
				degreeLabel: false,
				// How often does the content needs to be fetched? (Milliseconds) 
				// Possible values: 1000 - 86400000 
				updateInterval: 600000, // 10 minuts
				// Speed of the update animation. (Milliseconds) 
				// Possible values:0 - 5000 
				animationSpeed: 1000, // 1 second
				// Use 12 or 24 hour format. 
				// Possible values: 12 or 24 
				timeFormat: 24,
				// Show the period (am/pm) with 12 hour format 
				// Possible values: true or false 
				showPeriod: true,
				// Show the period (AM/PM) with 12 hour format as uppercase 
				// Possible values: true or false
				showPeriodUpper: false,
				// Show the wind direction next to the wind speed. 
				// Possible values: true or false 
				showWindDirection: true,
				// Show the wind direction as an arrow instead of abbreviation 
				// Possible values: true or false 
				showWindDirectionAsArrow: false,
				// Show the current humidity 
				// Possible values: true or false 
				showHumidity: false,
				// If you have another module that emits the INDOOR_TEMPERATURE notification, the indoor temperature will be displayed 
				showIndoorTemperature: false,
				// Show only current Temperature and weather icon. 
				// Possible values: true or false 
				onlyTemp: false,
				// Pick between using the Beaufort scale for wind speed or using the default units. 
				// Possible values: true or false 
				useBeaufort: true,
				// The language of the days. 
				// Possible values: en, nl, ru, etc ... 
				lang: "en",
				// The decimal symbol to use.
				// Possible values: '.', ',' or any other symbol.
				decimalSymbol: '.',
				// The initial delay before loading. If you have multiple modules that use the same API key, you might want to delay one of the requests. (Milliseconds) 
				// Possible values: 1000 - 5000 
				initialLoadDelay: 0,
				// The delay before retrying after a request failure. (Milliseconds) 
				// Possible values: 1000 - 60000 
				retryDelay: 2500,
				// The OpenWeatherMap API version to use. 
				apiVersion: 2.5,
				// The OpenWeatherMap base URL. 
				apiBase: 'http://api.openweathermap.org/data/',
				// The OpenWeatherMap API endPoint. 
				weatherEndpoint: 'weather',
				// If set to true, the returned location name will be appended to the header of the module, if the header is enabled. This is mainly intresting when using calender based weather. 
				appendLocationNameToHeader: true,
				// The class for the calender module to base the event based weather information on. 
				calendarClass: 'calendar',
				// The conversion table to convert the weather conditions to weather-icons. 
				// https://openweathermap.org/weather-conditions
				iconTable: {
					'01d': 'wi-day-sunny',
					'02d': 'wi-day-cloudy',
					'03d': 'wi-cloudy',
					'04d': 'wi-cloudy-windy',
					'09d': 'wi-showers',
					'10d': 'wi-rain',
					'11d': 'wi-thunderstorm',
					'13d': 'wi-snow',
					'50d': 'wi-fog',
					'01n': 'wi-night-clear',
					'02n': 'wi-night-cloudy',
					'03n': 'wi-night-cloudy',
					'04n': 'wi-night-cloudy',
					'09n': 'wi-night-showers',
					'10n': 'wi-night-rain',
					'11n': 'wi-night-thunderstorm',
					'13n': 'wi-night-snow',
					'50n': 'wi-night-alt-cloudy-windy'
				}
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Seoul",
				locationID: "1835848",
				appid: "270367c3265f92394c0d5e8d810ae9d2",
				// What units to use. Specified by config.js 
				// Possible values: config.units = Specified by config.js, default = Kelvin, metric = Celsius, imperial =Fahrenheit 
				units: "metric",
				// Round temperature values to nearest integer. 
				// Possible values: true (round to integer) or false (display exact value with decimal point) 
				roundTemp: false,
				// How many days of forecast to return. Specified by config.js 
				// Possible values: 1 - 16 
				maxNumberOfDays: 7,
				// Should the predicted rain amount be displayed? 
				// Possible values: true or false 
				showRainAmount: false,
				// How often does the content needs to be fetched? (Milliseconds) 
				// Possible values: 1000 - 86400000 
				updateInterval: 600000, // 10 minutes
				// Speed of the update animation. (Milliseconds) 
				// Possible values:0 - 5000 
				animationSpeed: 1000, // 1 second
				// The language of the days. 
				// Possible values: en, nl, ru, etc ... 
				lang: "en",
				// The decimal symbol to use.
				// Possible values: ".", "," or any other symbol.
				decimalSymbol: ".",
				// Fade the future events to black. (Gradient) 
				// Possible values: true or false 
				fade: true,
				// Where to start fade? 
				// Possible values: 0 (top of the list) - 1 (bottom of list) 
				fadePoint: 0.25,
				// The initial delay before loading. If you have multiple modules that use the same API key, you might want to delay one of the requests. (Milliseconds) 
				// Possible values: 1000 - 5000 
				initialLoadDelay: 2500, // 2.5 seconds delay. This delay is used to keep the OpenWeather API happy.
				// The delay before retrying after a request failure. (Milliseconds) 
				// Possible values: 1000 - 60000 
				retryDelay: 2500,
				// The OpenWeatherMap API version to use. 
				apiVersion: 2.5,
				// The OpenWeatherMap base URL. 
				apiBase: "http://api.openweathermap.org/data/",
				// The OpenWeatherMap API endPoint. 
				forecastEndpoint: "forecast/daily",
				// If set to true, the returned location name will be appended to the header of the module, if the header is enabled. This is mainly intresting when using calender based weather. 
				appendLocationNameToHeader: true,
				// The class for the calender module to base the event based weather information on. 
				calendarClass: "calendar",
				// The conversion table to convert the weather conditions to weather-icons. 
				// https://openweathermap.org/weather-conditions
				iconTable: {
				    '01d': 'wi-day-sunny',
				    '02d': 'wi-day-cloudy',
				    '03d': 'wi-cloudy',
				    '04d': 'wi-cloudy-windy',
				    '09d': 'wi-showers',
				    '10d': 'wi-rain',
				    '11d': 'wi-thunderstorm',
				    '13d': 'wi-snow',
				    '50d': 'wi-fog',
				    '01n': 'wi-night-clear',
				    '02n': 'wi-night-cloudy',
				    '03n': 'wi-night-cloudy',
				    '04n': 'wi-night-cloudy',
				    '09n': 'wi-night-showers',
				    '10n': 'wi-night-rain',
				    '11n': 'wi-night-thunderstorm',
				    '13n': 'wi-night-snow',
				    '50n': 'wi-night-alt-cloudy-windy'
				},
				// If set "colored" to true the min-temp get a blue tone and the max-temp get a red tone. 
				colored: "false",
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "JTBC News",
						url: "http://fs.jtbc.joins.com//RSS/newsflash.xml"
					}
				],
				// Display the title of the source. 
				showSourceTitle: true,
				// Display the publish date of an headline. 
				showPublishDate: true,
				// Display the description of an item. 
				showDescription: true,
				// Wrap the title of the item to multiple lines.
				wrapTitle: true,
				// Wrap the description of the item to multiple lines. 
				wrapDescription: true,
				// Truncate description? 
				truncDescription: true,
				// How many characters to be displayed for a truncated description? 
				// Possible values: 1 - 500 
				lengthDescription: 500,
				// Hide module instead of showing LOADING status. 
				hideLoading: false,
				// How often does the content needs to be fetched? (Milliseconds) 
				// Possible values: 1000 - 86400000 
				reloadInterval: 300000, // 5 minutes
				// How often do you want to display a new headline? (Milliseconds) 
				// Possible values:1000 - 60000 
				updateInterval: 10000, // 10 seconds
				// Speed of the update animation. (Milliseconds) 
				// Possible values:0 - 5000 
				animationSpeed: 2500, // 2.5 seconds
				// Total amount of news items to cycle through. (0 for unlimited) 
				// Possible values:0 - ... 
				maxNewsItems: 0,
				// Ignore news items that are outdated. 
				ignoreOldItems: false,
				// How old should news items be before they are considered outdated? (Milliseconds) 
				// Possible values:1 - ... 
				ignoreOlderThan: 86400000, // 1 day
				//
				// Some newsfeeds feature tags at the beginning of their titles or descriptions, such as [VIDEO]. This setting allows for the removal of specified tags from the beginning of an item's description and/or title. 
				// Possible values:'title', 'description', 'both'
				// removeStartTags: value,
				//
				// List the tags you would like to have removed at the beginning of the feed item 
				// Possible values: ['TAG'] or ['TAG1','TAG2',...]
				// startTags: value,
				//
				// Remove specified tags from the end of an item's description and/or title. 
				// Possible values:'title', 'description', 'both'
				// removeEndTags: value,
				//
				// List the tags you would like to have removed at the end of the feed item 
				// Possible values: ['TAG'] or ['TAG1','TAG2',...]
				// endTags: value,
				//
				// Remove news feed item if one of these words is found anywhere in the title (case insensitive and greedy matching) 
				// Possible values: ['word'] or ['word1','word2',...]
				// prohibitedWords: value,
			}
		},
		// 3rd Party Module
		{
			module: "MMM-Snow",
			disabled: true,
			position: "fullscreen_above",
			config: {
				// The number of snow flakes. More flakes are havier for the cpu, so don't go wild.
				flakeCount: 100
			}
		},
		{
			module: 'MMM-YouTube-API',
			disabled: true,
			position: 'top_center',
			config: {
				width: 640,
				height: 360,
				// The YouTube video ID.
				videoID: "Sagg08DrO5U",
				// The rate at which the video plays.
				// Valid values: 0.25, 0.5, 1, 1.5, 2
				playbackRate: 1,
				// Valid values: 0 - 100
				volume:	100,
				// Valid values: true or false
				loop: true,
			}
		},
		{
	    module: 'MMM-CARDS',
			disabled: true,
	    position: 'top_left',
	    config: {
				// true if you want a header
				useHeader: false,
				// Any text you want
				header: "5 Card Stud Poker",
				// Stretch or constrain according to region
				maxWidth: "100%",
				// New clue fades in and out
				animationSpeed: 3000,
		   }
		 },
		 {
       module: 'MMM-kudos',
			 disabled: true,
       position: "middle_center",
       config: {
				 // A map which defines the start hours of kudos sets.
				 hourmap: {
						5: "morning",
					 11: "lunch",
					 15: "afternoon",
					 19: "evening",
					 23: "night",
				 },
				 // Length of kudo at which a smaller font is used to display it.
				 shrinkLimit: 35,
				 // Optional CSS classes used to display the kudo.
				 // classes:
				 // Optional CSS classes used to shrink the kudo.
				 // shrinkClasses:
				 // The list of kudos.
				 kudos: {
					 anytime: [
						 "Und jetzt einen Kaffee!",
						 "Dem Kühnen lächeln die Götter zu!",
						 "Herkules war auch mal schwach.",
					 ],
					 morning: [
						 "Guten Morgen, Sonnenschein!",
						 "Genieße den Tag",
						 "Gut geschlafen?",
						 "Der frühe Vogel ...",
					 ],
					 lunch: [
						 "Mahlzeit!",
						 "Gibt's was zu Essen?",
						 "Wer kocht heute?",
						 "Mittagsschlaf?",
					 ],
					 afternoon: [
						 "Wow, sexy!",
						 "Du siehst gut aus!",
						 "Heute ist Dein Tag!",
						 "Schon Feierabend?",
					 ],
					 evening: [
						 "Eine Augenweide!",
						 "Bettzeit?",
						 "Was für ein Tag ...",
						 "Es ist ein Genuß dich zu sehen!",
						 "Wie war dein Tag?",
						 "Meine Augen befinden sich bereits im Zustand seeliger Vorfreude!",
					 ],
					 night: [
						 "Noch nicht müde?",
						 "Nu aber ab ins Bett!",
						 "Wird wohl wieder spät heute?",
						 "Schlaf schön!",
						 "Kannst du nicht schlafen?",
					 ]
				 },
				 // How often does the kudo have to change? (Milliseconds)
				 // Possible values: 1000 - 86400000
				 updateInterval: 30000,
				 // External file from which to load the kudos
				 // Possible values: Path to a JSON file containing kudos, configured as per the value of the kudos configuration (see below).
				 remoteFile: null,
				 // Speed of the update animation. (Milliseconds)
				 // Possible values:0 - 5000
				 fadeSpeed: 4000
      }
    },
		{
			module: "random_quotes",
			disabled: true,
			position: "lower_third",
			config: {
				// How often a new quote gets displayed. Value is in SECONDS.
				updateInterval: 300,
				// How fast (in SECONDS) to fade out and back in when changing quotes.
				fadeSpeed: 4,
				// Possible values: random, inspirational, life, love, motivational, positive, or success.
				category: "random"
			}
		},
		{
	    module: "MMM-ATM",
			disabled: true,
	    position: "top_left",
	    config: {
				// No = just the ? then the answer
				multipleChoice: "Yes",
				useHeader: true,
				header: "Not another trivia module!",
				maxWidth: "250px",
		   }
		},
		{
			module: "MMM-jokes",
			disabled: true,
			position: "lower_third",
			config: {
				// What API are we going to use?
				// Possible values: ticndb, tambal
			  api: "ticndb",
				// Possible values: 1000 - 86400000
				updateInterval: 600000,
				// Possible values: 0 - 5000
				fadeSpeed: 4000
			}
		},
		{
	    module: "MMM-Lottery",
			disabled: true,
	    position: "top_right",
	    config: {
				// Possible values: 6of38, 6of39, 6of40, 6of43, 6of45, 6of47, 6of48, 6of49, 6of52, 6of59, 6of69, 6of90 7of35, 7of36, 7of37, 7of40, 7of49, 7of70, 10of90
				mode: "6of39",
        maxWidth: "400px",
        header: "",
				animationSpeed:	3000,
				updateInterval: 30000,
				initialLoadDelay:	3250,
				retryDelay:	2500
	    }
		},
		{
      module: "MMM-GoogleMapsTraffic",
			disabled: true,
      position: "top_left",
      config: {
				// Required Google api key
        key: "AIzaSyAaiRBcAt8q1J5zTT2LXvAkb3drfJQlI9s",
        lat: 37.541,
        lng: 126.986,
        height: "300px",
        width: "300px",
				// 	Zoom value to display from lat/lng.
				zoom: 10,
				// Possible Value: roadmap, satellite, hybrid, terrain
				mapTypeId: "roadmap"
      }
    },
		{
			// npm install 필요
			module: 'MMM-MyCommute',
			position: 'top_left',
			header: 'Traffic',
			classes: 'default everyone',
			config: {
				// API Key from Google
				apikey: 'AIzaSyAaiRBcAt8q1J5zTT2LXvAkb3drfJQlI9s',
				// The starting point for your commute. Usually this is your home address.
		    origin: '65 Front St W, Toronto, ON M5J 1E6',
				// The start time of the window during which this module wil be visible.
				// Must be in 24-hour time format. Defaults to 00:00 (i.e.: midnight)
		    startTime: '00:00',
				// The end time of the window during which this module wil be visible.
				// Must be in 24-hour time format. Defaults to 23:59 (i.e.: one minute before midnight).
		    endTime: '23:59',
				// A list of numbers representing days of the week to hide the module.
				// Valid numbers are 0 through 6, 0 = Sunday, 6 = Saturday.
		    hideDays: [0,6],
				// Whether to show a brief summary of the route
				showSummary: true,
				// Whether to colour-code the travel time red, yellow, or green based on traffic.
				colorCodeTravelTime: true,
				// How the module should format your total travel time.
				// Defaults to m [min] (e.g. 86 min). Some other examples are h[h] m[m] (e.g.: 1h 26min), h:mm (e.g. 1:26). This uses the moment-duration-format plugin's templating feature. https://github.com/jsmreese/moment-duration-format#template
				travelTimeFormat: "m",
				// How to handle time tokens that have no value. For example, if you configure travelTimeFormat as "hh:mm" but the actual travel time is less than an hour, by default only the minute portion of the duration will be rendered. Set travelTimeFormatTrim to false to preserve the hh: portion of the format (e.g.: 00:21). Valid options are "left", "right" (e.g.: 2:00 renders as 2), or false (e.g.: do not trim).
				// Type: String or false
				travelTimeFormatTrim: "left",
				// The amount of variance between time in traffic vs absolute fastest time after which the time is coloured yellow
				// Defaults to 1.1 (i.e.: 10% longer than fastest time)
				moderateTimeThreshold: 1.1,
				// The amount of variance between time in traffic vs absolute fastest time after which the time is coloured red
				poorTimeThreshold: 1.3,
				// For any transit destinations where showNextVehicleDeparture is true, this dictates how to format the next arrival time.
				nextTransitVehicleDepartureFormat: "h:mm a",
 				// How frequently, in milliseconds, to poll for traffic predictions.
				// BE CAREFUL WITH THIS! We're using Google's free API which has a maximum of 2400 requests per day. Each entry in the destinations list requires its own request so if you set this to be too frequent, it's pretty easy to blow your request quota.
				pollFrequency: 600000,
				// An array of destinations to which you would like to see commute times.
		    destinations: [
		      {
		        destination: '14 Duncan St Toronto, ON M5H 3G8',
		        label: 'Air Canada Centre',
						// Transportation mode, one of the following: driving, walking, bicycling, transit.
		        mode: 'walking',
						// If specified, the colour for the icon in hexadecimal format
		        color: '#82E5AA'
		      },
		      {
		        destination: '317 Dundas St W, Toronto, ON M5T 1G4',
		        label: 'Art Gallery of Ontario',
		        mode: 'transit',
						// If mode = transit you can additionally specify one or more of the following
						// Possible Value: bus, subway, train, tram, or rail.
						transitMode: "train|tram|subway",
						// If mode = transit the time of the next departure of the first vehicle on your route will be displayed in the route summary. Only visible when showSummary = true.
						showNextVehicleDeparture: true,
		      },
		      {
		        destination: '55 Mill St, Toronto, ON M5A 3C4',
		        label: 'Distillery District',
		        mode: 'bicycling',
						// If specified, will instruct the Google API to provide times for alternate routes. Must be used with showSummary: true
						alternatives: true,
						// If specified, it instructs Google to find the route that passes through the waypoints you specify.
						// Separate multiple entries with the | character. See https://developers.google.com/maps/documentation/directions/intro#Waypoints for details on how waypoints can be specified.
						// NOTE: your waypoints will automatically be prefixed with via: so that they are not treated as stopovers. This can cause Google to plan an erratic route. if you find your time predictions are wildly overestimated, then try adjusting your waypoints. Intersections where you would normally make a turn on this roite usually work well (e.g.: Main St & Southwood Drive Toronto ON).
						// waypoints:
		      },
		      {
		        destination: '6301 Silver Dart Dr, Mississauga, ON L5P 1B2',
		        label: 'Pearson Airport',
						// If specified, will instruct the Google API to find a route that avoids one or more of the following:
						// Possible Value: tolls,highways,ferries,indoor.
		        avoid: 'tolls',
						// The start time of the window during which this destination wil be visible.
						// Must be in 24-hour time format. Defaults to 00:00 (i.e.: midnight)
						startTime: '00:00',
						// The end time of the window during which this destination wil be visible.
						// Must be in 24-hour time format. Defaults to 23:59 (i.e.: one minute before midnight).
						endTime: '23:59',
						// A list of numbers representing days of the week to hide the destination.
						// Valid numbers are 0 through 6, 0 = Sunday, 6 = Saturday.
						hideDays: [0,6],
		      }
		    ]
		 	}
 		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
