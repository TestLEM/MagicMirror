/* Magic Mirror
 * Node Helper: lego_client
 *
 * By L.EGO
 * MIT Licensed.
 */

const NodeHelper = require('../../js/node_helper.js');
const axios = require('axios');

module.exports = NodeHelper.create({
  start() {
    this.token = '';
    this.gatewayUrl =
      process.env.IRIS_ENV === 'dev'
        ? 'http://awseb-e-q-AWSEBLoa-L01IEZ6XNK9W-1599221961.ap-northeast-1.elb.amazonaws.com'
        : 'http://localhost:3000';
    console.info(`Starting node_helper for module [${this.name}]`);
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'CONNECTED':
        console.info(`${this.name} module connected`);
        break;
      case 'REQUEST_REGISTER_TOKEN':
        this.token = payload;
        break;
      case 'REQUEST_SEND_TOPIC_DATA_TO_GATEWAY': {
        if (!this.token) {
          console.log('Token is not registered.');
          return;
        }
        this.sendSignal(payload);
        break;
      }
      case 'REQUEST_GET_ACTION': {
        this.getAction(payload);
        break;
      }
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },

  sendRequest(url, payload) {
    console.log('sendRequest');
    return axios.post(url, payload)
      .then((response) => {
        console.info(response);
        return response;
      })
      .catch((error) => {
        console.error(error.message);
      });
  },

  /**
   *  @param { object } signal
   * {
   *    topic: String,
   *    data: Any
   * }
   */
  sendSignal(signal) {
    // TODO(danhee): add fb_token to Kafka topic data (#LF-122).
    // TODO(wonjerry): changing uid to device id
    Object.assign(signal.data, { uid: this.token, timestamp: Date.now() });
    this.sendRequest(`${this.gatewayUrl}/kafkatopics`, signal);
  },

  async getAction(actionId) {
    const response = await this.sendRequest(`${this.gatewayUrl}/actions`, { id: actionId });
    if (response == null) {
      console.error(`Not found: ${actionId}`);
      return;
    }
    this.sendSocketNotification('REQUEST_PROCESS_ACTION', response.data);
  },
});
