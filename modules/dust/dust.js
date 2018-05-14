/* global Module, Log */

/* Magic Mirror
 * Module: dust
 *
 * By L.EGO
 */

Module.register('dust', {
  defaults: {
    dustServerUrl: 'https://iris.wisefour.com/iris/v1/airquality',
    // 서울의 위도 및 경도.
    // TODO(wonjerry): Get current location.
    latitude: 37.5424044,
    longitude: 127.0572379,
  },

  start() {
    Log.info(`Starting module: ${this.name}`);
    this.sendSocketNotification('CONFIG', this.config);
  },

  notificationReceived(notification) {
    switch (notification) {
      case 'REQUEST_SEND_DATA_TO_SERVER':
        this.sendSocketNotification('GET_DUST_DATA');
        break;
      default:
      // Do nothing.
    }
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'DUST_DATA_RECEIVED':
        this.sendNotification('REQUEST_SEND_TOPIC_DATA_TO_GATEWAY', {
          topic: 'dust',
          data: {
            pm25: payload,
          },
        });
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },
});
