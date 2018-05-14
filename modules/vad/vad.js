/* global Module */

/* Magic Mirror
 * Module: vad
 *
 * By L.ego
 * MIT Licensed.
 */

Module.register('vad', {
	requiresVersion: '2.1.0',

	start: function() {
		this.sendSocketNotification('CONNECTED');
	},

	socketNotificationReceived: function (notification, payload) {
		if(notification === 'GET_SPEECH') {
			this.sendNotification('REQUEST_CHANGING_SPEECH_TO_TEXT', payload);
		}
	},
});
