/* global Module */

/* Magic Mirror
 * Module: morphologic_analysis
 *
 * By L.ego
 * MIT Licensed.
 */

Module.register('morphologic_analysis', {
  requiresVersion: '2.1.0',

  start() {
    this.sendSocketNotification('CONNECTED');
  },

  notificationReceived(notification, payload) {
    switch (notification) {
      case 'RESPONSE_GET_PART_OF_SPEECH':
      case 'RESPONSE_GET_MORPHEME':
      case 'RESPONSE_GET_NOUNS':
        this.sendSocketNotification(notification, payload);
        break;
      default:
        break;
    }
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'RESPONSE_GET_PART_OF_SPEECH':
      case 'RESPONSE_GET_MORPHEME':
      case 'RESPONSE_GET_NOUNS':
        this.sendNotification(notification, payload);
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },
});
