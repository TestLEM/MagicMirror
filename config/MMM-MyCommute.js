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
},
