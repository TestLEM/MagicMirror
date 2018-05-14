/* global Module, Log */

/* Magic Mirror
 * Module: lighting
 *
 * By L.EGO
 * MIT Licensed.
 */

Module.register('light_controller', {
  start() {
    Log.info(`Staring module: ${this.name}`);
  },

  notificationReceived(notification, payload) {
    switch (notification) {
      case 'REQUEST_LIGHTING':
        this.sendSocketNotification(notification, payload);
        break;
      default:
      // do nothing.
    }
  },
});
