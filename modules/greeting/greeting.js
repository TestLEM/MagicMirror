/* global Module */

/* Magic Mirror
 * Module: greeting
 *
 * By L.EGO
 */

Module.register('greeting', {
  requiresVersion: '2.1.0',

  start() {
    this.templateData = {
      text: '안녕',
    };
  },

  getTemplate() {
    return 'greeting.njk';
  },

  getStyles() {
    return ['greeting.css'];
  },

  getTemplateData() {
    return this.templateData;
  },

  updateText(text) {
    this.templateData.text = text;
    this.updateDom();
  },

  selectGreetingAction(actions) {
    const action = actions.reduce((previous, current) =>
      (previous.confidence > current.confidence ? previous : current));
    this.updateText(action.name);
  },

  showActionText(actionName) {
    this.updateText(this.actionTextMap[actionName]);
  },

  notificationReceived(notification, payload) {
    switch (notification) {
      case 'REQUEST_PROCESS_ACTION':
        this.selectGreetingAction(payload.actions);
        break;
      case 'REQUEST_SHOW_SLACK_TEXT':
        this.updateText(payload);
        break;
      default:
      // Do nothing.
    }
  },
});
