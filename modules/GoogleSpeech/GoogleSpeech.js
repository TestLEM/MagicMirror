/* global Module */

/* Magic Mirror
 * Module: GoogleSpeech
 *
 * By L.ego
 * MIT Licensed.
 */


Module.register('GoogleSpeech', {
	defaults: {
		encoding: 'LINEAR16',
		sampleRateHertz: 16000,
		languageCode: 'ko-KR',
	},

	requiresVersion: '2.1.0', // Required version of MagicMirror

	recognizeText: '인식된 음성이 없습니다.',

	start: function() {
		this.sendSocketNotification('CONNECT');
	},
	
	getDom: function() {
		const wrapper = document.createElement('div');
		const label = document.createElement('label');
		label.innerText = this.recognizeText;
		wrapper.appendChild(label);
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			'GoogleSpeech.css',
		];
	},

	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
			case 'RECEIVE_SPEECH':
				this.sendSocketNotification('CHANGE_SPEECH', {
					// ex: 'modules/GoogleSpeech/samples/audio.raw'
					filename: payload.filename, 
					encoding: payload.encoding || this.config.encoding, 
					sampleRateHertz: payload.sampleRateHertz || this.config.sampleRateHertz, 
					languageCode: payload.languageCode || this.config.languageCode
				});
				return;
			case 'RECEIVE_HOT_WORLD':
				this.sendSocketNotification('LISTEN_SPEECH', {
					encoding: payload.encoding || this.config.encoding, 
					sampleRateHertz: payload.sampleRateHertz || this.config.sampleRateHertz, 
					languageCode: payload.languageCode || this.config.languageCode
				});
				return;
			default:
				return;
		}
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'SHOW_TEXT') {
			this.recognizeText = payload;			
			this.updateDom();
		}
	}
});
