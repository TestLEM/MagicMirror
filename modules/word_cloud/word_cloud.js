/* global Module Log $ */

/* Magic Mirror
 * Module: word_cloud
 *
 * By L.EGO
 * MIT Licensed.
 */

Module.register('word_cloud', {
  defaults: {
    width: 400,
    height: 350,
    delay: 50,
    shape: 'elliptic',
    variableScaleFactor: 0.6,
    actionScaleFactor: 6,
  },

  start() {
    this.words = [];
    this.elementClassName = 'wordcloud';
    Log.info(`Starting ${this.name} module`);
  },

  getScripts() {
    return ['http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js', 'jqcloud.js'];
  },

  getStyles() {
    return ['word_cloud.css'];
  },

  getDom() {
    const warpper = document.createElement('div');
    warpper.className = this.elementClassName;
    return warpper;
  },

  initWordCloud() {
    $(`.${this.elementClassName}`).jQCloud(this.words, this.config);
  },

  updateWordColud(newWords) {
    $(`.${this.elementClassName}`).jQCloud('update', newWords);
  },

  updateWords(newWords, scaleFactor) {
    newWords.forEach((newWord) => {
      const weight = scaleFactor * (newWord.confidence || 0);
      const existWord = this.words.find(word => word.text === newWord.name);
      if (existWord) {
        existWord.weight = weight;
      } else {
        this.words.push({ text: newWord.name, weight });
      }
    });
  },

  notificationReceived(notification, payload) {
    switch (notification) {
      case 'DOM_OBJECTS_CREATED':
        this.initWordCloud();
        break;
      case 'REQUEST_PROCESS_ACTION': {
        this.updateWords(payload.source.source_variable.variables, this.config.variableScaleFactor);
        this.updateWords(payload.actions, this.config.actionScaleFactor);
        this.updateWordColud(this.words);
        break;
      }
      default:
    }
  },
});
