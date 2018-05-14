/* Magic Mirror
 * Node Helper: morphologic_analysis
 *
 * By L.ego
 * MIT Licensed.
 */

const NodeHelper = require('../../js/node_helper.js');
const mecab = require('mecab-ya');

module.exports = NodeHelper.create({

  start() {
    console.info(`Starting node_helper for module [${this.name}]`);
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'CONNECTED':
        console.info(`${this.name}module connected`);
        break;
      case 'REQUEST_GET_PART_OF_SPEECH':
        this.getPartOfSpeech(payload.text);
        break;
      case 'REQUEST_GET_MORPHEME':
        this.getMorpheme(payload.text);
        break;
      case 'REQUEST_GET_NOUNS':
        this.getNouns(payload.text);
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },

  /**
  * Get a morphologic analysis and part-of-speech tagging result.
  * mecab-ko-dic part-of-speech tag explanation
  * https://docs.google.com/spreadsheets/d/1-9blXKjtjeKZqsf4NzHeYJCrr49-nXeRF6D80udfcwY/edit#gid=589544265
  * @param {string} text text to morph and tag part-of-speech
  * @returns {string[][]} two-dimensional arrays of morpheme and part-of-speech
  * args:
  * [ [ '아버지', 'NNG' ],
      [ '가', 'JKS' ],
      [ '방', 'NNG' ],
      [ '에', 'JKB' ],
      [ '들어가', 'VV' ],
      [ '신다', 'EP+EC' ] ]
  */
  getPartOfSpeech(text) {
    const self = this;
    mecab.pos(text, (err, result) => {
      console.log(`getPartOfSpeech: ${result}`);
      self.sendSocketNotification('RESPONSE_GET_PART_OF_SPEECH', result);
    });
  },

  /**
   * Get morphologic analysis result.
   * [ '아버지', '가', '방', '에', '들어가', '신다' ]
   * @param {string} text text to morph
   * @returns {string[]}  arrays of morpheme
   */
  getMorpheme(text) {
    const self = this;
    mecab.morphs(text, (err, result) => {
      console.log(`getMorphologic: ${result}`);
      self.sendSocketNotification('RESPONSE_GET_MORPHEME', result);
    });
  },

  /**
   * Get nouns in part-of-speech analysis result.
   * [ '아버지', '방' ]
   * @param {string} text text to get nouns
   * @returns {string[]}  arrays of nouns
   */
  getNouns(text) {
    const self = this;
    mecab.nouns(text, (err, result) => {
      console.log(`getNouns: ${result}`);
      self.sendSocketNotification('RESPONSE_GET_NOUNS', result);
    });
  },
});
