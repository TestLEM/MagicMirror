/* global Module */

/* Magic Mirror
 * Module: googlespeech
 *
 * By L.ego
 * MIT Licensed.
 */


Module.register('googlespeech', {
	defaults: {
		encoding: 'LINEAR16',
		sampleRateHertz: 16000,
		languageCode: 'ko-KR',
	},

	requiresVersion: '2.1.0', // Required version of MagicMirror

	recognizeText: '인식된 음성이 없습니다.',

	start: function() {
		this.sendSocketNotification('CONNECTED');
	},
	
	getDom: function() {
		const wrapper = document.createElement('div');
		const label = document.createElement('label');
		label.innerText = this.recognizeText;
		wrapper.appendChild(label);
		return wrapper;
	},

	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
			case 'REQUEST_CHANGING_SPEECH_TO_TEXT':
				this.sendSocketNotification('REQUEST_CHANGING_SPEECH_TO_TEXT', {
					// ex: 'modules/GoogleSpeech/samples/audio.raw'
					filename: payload.filename, 
					encoding: payload.encoding || this.config.encoding, 
					sampleRateHertz: payload.sampleRateHertz || this.config.sampleRateHertz, 
					languageCode: payload.languageCode || this.config.languageCode
				});
				return;
			case 'REQUEST_LISTENING_SPEECH':
				this.sendSocketNotification('REQUEST_LISTENING_SPEECH', {
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
		switch(notification) {
			case 'FINISH_CHANGING_SPEECH_TO_TEXT':
			case 'FINISH_LISTENING_SPEECH':
				this.recognizeText = payload;			
				this.updateDom();
				return;
			default:
				return;
		}
	}
});
