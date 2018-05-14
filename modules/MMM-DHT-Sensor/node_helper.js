/* Magic Mirror
 * Module: MMM-DHT-Sensor
 *
 * By L.EGO
 * Base on Ricardo Gonzalez http://www.github.com/ryck/MMM-DHT-Sensor
 * MIT Licensed.
 */

const NodeHelper = require('../../js/node_helper');
const os = require('os');

let sensor = null;
if (os.type() === 'Linux') {
  sensor = require('node-dht-sensor');
}

module.exports = NodeHelper.create({

  start() {
    console.log('MMM-DHT-Sensor helper started ...');
  },

  readSensor(sensorPin, sensorType) {
    sensor.read(sensorType, sensorPin, (err, temperature, humidity) => {
      if (err) {
        console.log(err);
        return;
      }

      this.sendSocketNotification('SENSOR_DATA', {
        temperature: temperature.toFixed(1),
        humidity: humidity.toFixed(1),
      });
    });
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'GET_SENSOR_DATA':
        if (sensor) {
          this.readSensor(payload.sensorPin, payload.sensorType);
        }
        break;
      default:
        throw new Error(`Invalid notification - ${notification}`);
    }
  },
});
