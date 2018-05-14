/* global Module Log */

/* Magic Mirror
 * Module: mirror_forest
 *
 * By L.EGO
 */

Module.register('mirror_forest', {

  start() {
    Log.info(`Starting module: [${this.name}]`);
    this.sendSocketNotification('CONNECTED');
  },

  notificationReceived(notification, payload) {
    switch (notification) {
      case 'REQUEST_SEND_TEXT_TO_SLACK':
        this.sendSocketNotification('SPEAK_TO_SLACK', payload);
        break;
      default:
      // Do nothing.
    }
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'SEND_TEXT_TO_MIRROR':
        this.sendNotification('REQUEST_SHOW_SLACK_TEXT', payload);
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },
});
