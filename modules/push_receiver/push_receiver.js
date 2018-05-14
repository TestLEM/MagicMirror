const { ipcRenderer } = require('electron');
// TODO(danhee): Change absolute path to relative path.
const {
  START_NOTIFICATION_SERVICE,
  NOTIFICATION_SERVICE_STARTED,
  NOTIFICATION_SERVICE_ERROR,
  NOTIFICATION_RECEIVED,
  TOKEN_UPDATED,
} = require(`${
  process.env.PWD
}/modules/push_receiver/node_modules/electron-push-receiver/src/constants`);

Module.register('push_receiver', {
  requiresVersion: '2.1.0',
  senderId: '1085199347410',

  start() {
    this.sendSocketNotification('REQUEST_SETUP_PUSH_RECEIVER');
  },

  socketNotificationReceived(notification) {
    switch (notification) {
      case 'RESPONSE_SETUP_PUSH_RECEIVER':
        this.registerPushReceiver();
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },

  registerPushReceiver() {
    ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, token) => {
      this.sendNotification('REQUEST_REGISTER_TOKEN', token);
      console.info(`fcm token: ${token}`);
    });

    ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => {
      console.error('notification error', error);
    });

    ipcRenderer.on(TOKEN_UPDATED, (_, token) => {
      this.sendNotification('REQUEST_REGISTER_TOKEN', token);
      console.info(`fcm token updated: ${token}`);
    });

    ipcRenderer.on(NOTIFICATION_RECEIVED, (_, payload) => {
      console.info(`fcm notification received: ${JSON.stringify(payload)}`);
      switch (payload.data.notification) {
        case 'data': {
          const {
            indoorTemperature,
            indoorHumidity,
            dust,
            face,
            keyword,
            weatherType,
            outdoorTemperature,
          } = JSON.parse(payload.data.value);
          if (indoorTemperature !== undefined) {
            this.sendNotification('NOTIFY_FAKE_INDOOR_TEMPERATURE', indoorTemperature);
          }
          if (indoorHumidity !== undefined) {
            this.sendNotification('NOTIFY_FAKE_INDOOR_HUMIDITY', indoorHumidity);
          }
          // TODO(danhee): Set fake dust.
          if (dust !== undefined) {
            this.sendNotification('NOTIFY_FAKE_DUST', dust);
          }
          // TODO(danhee): Set fake face.
          if (face !== undefined) {
            this.sendNotification('NOTIFY_FAKE_FACE', face);
          }
          // TODO(danhee): Set fake keyword.
          if (keyword !== undefined) {
            this.sendNotification('NOTIFY_FAKE_KEYWORD', keyword);
          }
          if (weatherType !== undefined) {
            this.sendNotification('NOTIFY_FAKE_WEATHER_TYPE', weatherType);
          }
          if (outdoorTemperature !== undefined) {
            this.sendNotification('NOTIFY_FAKE_OUTDOOR_TEMPERATURE', outdoorTemperature);
          }
          break;
        }
        case 'action': {
          this.sendNotification('REQUEST_GET_ACTION', payload.data.mongoDbId);
          break;
        }
        default:
          throw new Error(`Unknown notification: ${payload.data.notification}`);
      }
    });

    ipcRenderer.send(START_NOTIFICATION_SERVICE, this.senderId);
  },
});
