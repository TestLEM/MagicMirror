/* Magic Mirror
 * Node Helper: mirror_forest
 *
 * By L.EGO
 * MIT Licensed.
 */

const NodeHelper = require('../../js/node_helper.js');
const { RTMClient } = require('@slack/client');

module.exports = NodeHelper.create({

  start() {
    console.info(`Starting node_helper for module [${this.name}]`);

    this.talkAsMirrorToken = process.env.LEGO_TALK_AS_MIRROR_SLACK_TOKEN;
    this.speakInMirrorToken = process.env.LEGO_SPEAK_IN_MIRROR_SLACK_TOKEN;
    this.talkAsMirrorDMChannel = 'DALCW8ZC4';
    this.mirrorForestChannel = 'GALLCGW9G';

    // mirror-forest에 대한 답을 talkAsMirror DM으로 남기면 그 데이터를 mirror로 전송한다.
    this.talkAsMirror = new RTMClient(this.talkAsMirrorToken);
    // Mirror 앞에서 어떤 사람이 말하면 그 text를 mirror-forest으로 뿌려준다.
    this.speakInMirror = new RTMClient(this.speakInMirrorToken);

    this.talkAsMirror.start();
    this.speakInMirror.start();

    this.talkAsMirror.on('message', ({ channel, text }) => {
      if (channel !== this.talkAsMirrorDMChannel) {
        return;
      }

      this.sendTextToMirror(text);
      this.speakToSlack(this.talkAsMirror, text);
    });
  },

  sendTextToMirror(text) {
    this.sendSocketNotification('SEND_TEXT_TO_MIRROR', text);
  },

  speakToSlack(client, text) {
    client
      .sendMessage(text, this.mirrorForestChannel)
      .then((res) => {
        console.info(`Message sent: ${res.ts}`);
      })
      .catch((error) => {
        // TODO (wonjerry): Applying the appropriate error handler
        console.error(error.message);
      });
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'CONNECTED':
        console.info(`${this.name} module connected`);
        break;
      case 'SPEAK_TO_SLACK':
        this.speakToSlack(this.speakInMirror, payload);
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },

});
