{
  module: 'MMM-AlarmClock',
  position: 'top_right',
  config: {
    // An Array with all your alarms as objects.
    alarms: [
      {
        // 24h format
        time: "16:10",
        // Array of all days the alarm should be fired (0 = Sunday, 6 = Saturday)
        days: [1,2,3,4,5],
        title: "Company",
        message: "Get ready for going to company!"
      }
    ],
    // Possible values: alarm.mp3, blackforest.mp3 or web stream http or https.
    sound: 'alarm.mp3',
    // The volume of the alarm sound in a range from 0.0 to 1.0
    volume: 1.0,
    // In which format the alarm in the header should be displayed. All Options
    format:	'ddd, h:mmA',
    // 	How long the alarm should ring for non touch screen or without interaction on touch screen devices. (60000 = (1 min))
    timer:	60000,
    //	Set to enable a gradual fade-in of the alarm sound.
    fade:	false,
    // How long to fade into the alarm before volume is set. (60000 = (1 min))
    fadeTimer:	60000,
    // Increase the volume this percent amount each second until fadeTimer is reached. (.5%)
    fadeStep:	.005,
  }
},
