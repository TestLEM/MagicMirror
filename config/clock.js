{
	module: "clock",
	position: "top_left",
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