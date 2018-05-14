/* Magic Mirror
 * Node Helper: push_receiver
 *
 * By L.EGO
 * MIT Licensed.
 */
const { BrowserWindow } = require('electron');
const { setup: setupPushReceiver } = require('electron-push-receiver');

const NodeHelper = require('../../js/node_helper.js');

module.exports = NodeHelper.create({
  start() {
    console.info(`Starting node_helper for module [${this.name}]`);
  },

  socketNotificationReceived(notification) {
    switch (notification) {
      case 'REQUEST_SETUP_PUSH_RECEIVER': {
        const mainWindow = BrowserWindow.getFocusedWindow();
        setupPushReceiver(mainWindow.webContents);
        this.sendSocketNotification('RESPONSE_SETUP_PUSH_RECEIVER');
        break;
      }
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },
});
