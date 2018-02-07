{
  module: 'calendar_monthly',
  position: 'top_left',
  config: {
    // 	How fast (in seconds) to fade out and back in at the midnight refresh
    fadeSpeed: 2,
    // This allows you to turn on or off the header on the calendar. The header consists of the month and year.
    showHeader: true,
    // Calendar_monthly allows you to use a custom CSS to style your calendar, or you can use one of the built-in ones. Please read the 'CSS Styling' section for more information.
    // Possible values: block, clean, slate, and custom.
    cssStyle: "block",
    // How long (in seconds) to wait before refreshing the calendar at midnight This is primarily done in case there are other modules also triggering at exactly midnight. This allows the user to set a delay so the calendar won't refresh at the same time.	5 seconds
    updateDelay: 5,
  }
}
