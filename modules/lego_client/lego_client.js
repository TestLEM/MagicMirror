/* global Module */

/* Magic Mirror
 * Module: lego_client
 *
 * By L.EGO
 */

Module.register('lego_client', {
  requiresVersion: '2.1.0',

  start() {
    this.sendSocketNotification('CONNECTED');
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'REQUEST_PROCESS_ACTION':
        this.sendNotification(notification, payload);
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },

  // TODO(wonjerry): check payload format valid
  notificationReceived(notification, payload) {
    switch (notification) {
      case 'REQUEST_SEND_TOPIC_DATA_TO_GATEWAY':
      case 'REQUEST_REGISTER_TOKEN':
      case 'REQUEST_GET_ACTION':
        this.sendSocketNotification(notification, payload);
        break;
      default:
      // Do nothing.
    }
  },
});
