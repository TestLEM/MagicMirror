/* Magic Mirror Config
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

let config = {
  /**
   * Address to listen on, can be:
   * "localhost", "127.0.0.1", "::1" to listen on loopback interface
   * another specific IPv4/6 to listen on a specific interface
   * "", "0.0.0.0", "::" to listen on any interface
   * Default, when address config is left out, is "localhost"
   */
  address: 'localhost',
  port: 8080,
  /**
   * Set [] to allow all IP addresses
   * or add a specific IPv4 of 192.168.1.5 :
   * ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
   * or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
   * ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],
   */
  ipWhitelist: ['127.0.0.1', '::ffff:127.0.0.1', '::1'],
  language: 'en',
  timeFormat: 24,
  units: 'metric',

  modules: [
    {
      module: 'alert',
    },
    {
      module: 'clock',
      position: 'top_left',
    },
    {
      module: 'currentweather',
      position: 'top_right',
      config: {
        location: 'Seoul',
        locationID: '1835848',
        appid: '270367c3265f92394c0d5e8d810ae9d2',
      },
    },
    {
      module: 'weatherforecast',
      config: {
        location: 'Seoul',
        locationID: '1835848',
        appid: '270367c3265f92394c0d5e8d810ae9d2',
      },
    },
    {
      module: 'lego_client',
    },
    {
      module: 'push_receiver',
    },
    {
      module: 'MMM-DHT-Sensor',
      header: 'DHT',
      config: {
        sensorPin: 21,
        sensorType: 11,
        updateInterval: 60 * 1000,
        initialLoadDelay: 0,
        animationSpeed: 1000,
        units: 'metric',
        relativeScale: 35,
        debug: false,
      },
    },
    {
      module: 'greeting',
      position: 'bottom_left',
    },
    {
      module: 'speech_recognition',
      position: 'bottom_left',
    },
    {
      module: 'light_controller',
    },
    {
      module: 'word_cloud',
      position: 'bottom_left',
    },
    {
      module: 'keyword',
    },
    {
      module: 'face_detection',
    },
    {
      module: 'dust',
    },
    {
      module: 'mirror_forest',
    },
  ],
};

/** ************* DO NOT EDIT THE LINE BELOW ************** */
if (typeof module !== 'undefined') {
  module.exports = config;
}
