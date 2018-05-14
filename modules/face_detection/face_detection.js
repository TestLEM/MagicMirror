/* global Module, Log */

/* Magic Mirror
 * Module: face_detection
 *
 * By L.EGO
 */

Module.register('face_detection', {
  defaults: {
    /**
     * force the use of a usb webcam on raspberry pi
     * (on other platforms this is always true automatically)
     */
    useUSBCam: true,
    // detection intervall in seconds (smaller number = faster but CPU intens!)
    interval: 2,
    /**
     * Detect off delay after last detection so that a user does not get instantly disappeared
     * if he turns away from the mirror for a few seconds
     */
    detectOffDelay: 15,
  },

  start() {
    this.detectedCount = 0;
    this.sendSocketNotification('CONFIG', this.config);
    Log.info(`Starting module: ${this.name}`);
  },

  notificationReceived(notification) {
    switch (notification) {
      case 'REQUEST_SEND_DATA_TO_SERVER':
        this.sendNotification('REQUEST_SEND_TOPIC_DATA_TO_GATEWAY', {
          topic: 'face',
          data: {
            detectedCount: this.detectedCount,
          },
        });
        break;
      default:
      // Do nothing.
    }
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'DETECTED_FACE_ON':
        this.detectedCount = 1;
        break;
      case 'DETECTED_FACE_OFF':
        this.detectedCount = 0;
        break;
      case 'UPDATE_FACES':
        this.detectedCount = payload;
        break;
      default:
        throw new Error('Unknown notification');
    }
  },
});
