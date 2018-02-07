{
  module: 'MMM-horoscope',
  position: 'top_right',  // This can be any of the regions.
  config: {
    // Zodiac sign for daily horoscope.
    // Possible values: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn,aquarius,pisces
    sign: 'aries',
    // Overall width of the module to help you fit it in your layout (String CSS value)
    // px, %, em etc.
    maxWidth: "400px",
    // How often does the content needs to be fetched? (Milliseconds)
    // Possible values: 1000-86400000
    updateInterval: 3600000,
    // Shifting time to display next or previous day horoscope. (Milliseconds)
    // This is done for conveniece of displaying next day horoscope in the evening. For example you'd like to start displaying next day horoscope after 7pm, in that case you would need to set timeShift value to 18000000. Math works out to 24 - 19 = 5, converting 5 hours into milliseconds 5 * 60 * 60 * 1000 = 18000000
    // Possible values: 0-86400000
    timeShift: 18000000,
    // Display Zodiac sign using text or image for the module output (Boolean)
    // See screenshot: left side is useTextIcon=true, right side is useTextIcon=false. CSS styles are using DejaVu Sans font which should be present on RasPi, other platforms may need CSS stylesheet adjustments.
    useTextIcon: true,
    // Possible values:0 - 5000 (Milliseconds)
    animationSpeed: 2000
  }
},
