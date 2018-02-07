{
	module: "compliments",
	position: "lower_third",
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