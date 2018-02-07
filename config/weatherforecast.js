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