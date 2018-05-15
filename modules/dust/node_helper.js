/* Magic Mirror
 * Node Helper: dust
 *
 * By L.EGO
 * MIT Licensed.
 */

const NodeHelper = require('../../js/node_helper.js');
const axios = require('axios');

module.exports = NodeHelper.create({
  start() {
    console.info(`Starting node_helper for module [${this.name}]`);
  },

  requestDustData() {
    const { dustServerUrl, latitude, longitude } = this.config;
    const requestUrl = `${dustServerUrl}?latitude=${latitude}&longitude=${longitude}`;

    return axios
      .get(requestUrl)
      .then(response => response.data.data)
      .catch((error) => {
        console.log('Dust module - ', error);
      });
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'CONFIG':
        this.config = payload;
        console.info(`${this.name} module connected`);
        break;
      case 'GET_DUST_DATA':
        this.requestDustData()
          .then((data) => {
            if (!data) {
              console.log('No data in response body');
              return;
            }
            const pm25 = data.iaqi.pm25.v;
            this.sendSocketNotification('DUST_DATA_RECEIVED', pm25);
          });
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },
});
