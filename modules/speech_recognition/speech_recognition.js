/* global Module */

/* Magic Mirror
 * Module: speech_recognition
 *
 * By L.EGO
 */

Module.register('speech_recognition', {
  requiresVersion: '2.1.0', // Required version of MagicMirror

  start() {
    this.recognizeState = 'Waiting...';
    this.sendSocketNotification('CONNECTED');
  },

  getDom() {
    const wrapper = document.createElement('div');
    wrapper.className = 'recognize-container';

    const label = document.createElement('label');
    label.className = 'recognize-state';
    label.innerText = this.recognizeState;

    wrapper.appendChild(label);
    return wrapper;
  },

  getStyles() {
    return ['speech_recognition.css'];
  },

  updateRecognizeText(str) {
    this.recognizeState = str;
    this.updateDom();
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'WAITING':
        this.updateRecognizeText('Waiting...');
        break;
      case 'RECOGNIZING':
        this.updateRecognizeText('Recognizing...');
        break;
      case 'RECONGNITION_COMPLETE':
        this.sendNotification('REQUEST_PARSE_TEXT', payload);
        this.sendNotification('REQUEST_SEND_TEXT_TO_SLACK', payload);
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },
});
