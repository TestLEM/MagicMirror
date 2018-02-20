/* Magic Mirror
 * Node Helper: vad
 *
 * By L.ego
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const mic = require('mic');
const fs = require('fs');

module.exports = NodeHelper.create({

	AMPLITUDE_THRESHOLD: 2000,

	/**
	 * TODO(danhee): raw 파일을 구글 음성인식 api에 사용 가능하도록 변환 
	 * 현재 맥에서는 44100 / 채널 2 / 32bit로만 녹음이 가능하다. 그러나 구글 음성인식 api를
	 * 사용하려면 16000 / 채널 1 / 16 bit의 파일로 저장해야한다. 따라서 현재 맥에서는 올바른 음성
	 * 인식 결과를 얻을 수 없다. 나중에 아래 라이브러리를 사용하여 맥에서도 사용 가능하도록 해야 한다.
	 * https://www.npmjs.com/package/pcm-convert
	 * TODO(danhee): recording, vocieStarted의 변수 사용 시 동시 접근 문제를 해결해야 함.
	 */
	micInstance: mic({
		rate: '16000',
		bitwidth: 16,
		channels: '1',
		debug: true,
		exitOnSilence: 6
	}),
	recording: false,
	voiceStarted: false,
	micInputStream: null,
	outputFileStream: null,

	start: function() {
		console.log('Starting node_helper for module [' + this.name + ']');
	},

	socketNotificationReceived: function(notification, payload) {
		console.log('socketNotificationReceived: ' + notification);
		switch(notification) {
			case 'CONNECTED':
				console.log('vad module connected');
				this.initMic();
				this.startRecord();
				return;
			default:
				return;
		}
	},

	initMic: function() {
		const self = this;
		this.micInputStream = this.micInstance.getAudioStream();
		this.outputFileStream = fs.WriteStream('output.raw');

		this.micInputStream.on('data', function(data) {
			console.log("Recieved Input Stream: " + data.length);
			if (self.isHearingVoice(data) && self.recording) {
				console.log("onVoiceStart");
				self.voiceStarted = true;
				self.micInputStream.pipe(self.outputFileStream);
			}
		});

		this.micInputStream.on('silence', function() {
			console.log("Got SIGNAL silence");
			self.sendData();
		});

		this.micInputStream.on('error', function(err) {
			cosole.log("Error in Input Stream: " + err);
		});
	},

	sendData: function() {
		if (this.voiceStarted) {
			this.voiceStarted = false;
			this.stopRecord();
			console.log("Stop and Send Data and start Recoding");
			this.sendSocketNotification('GET_SPEECH', {
				filename: 'output.raw',
				encoding: 'LINEAR16',
				sampleRateHertz: '16000'
			});
			this.startRecord();
		}
	},

	startRecord: function() {
		const self = this;
		if (!self.recording) {
			self.recording = true;
			self.micInstance.start();
		}
	},

	stopRecord: function() {
		const self = this;
		if (self.recording) {
			self.recording = false;
			self.micInstance.stop();
		}
	},

	isHearingVoice: function(data) {
		for (i = 0; i < data.length - 1; i +=2) {
			if (data[i+1] > 0x7f) {
				return false;
			}
			sample = (data[i+1] << 8 | data[i] & 0xff);
			if (sample > this.AMPLITUDE_THRESHOLD) {
				return true;
			}
		}
		return false;
	}
});
