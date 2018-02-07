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