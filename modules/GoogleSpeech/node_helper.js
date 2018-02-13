/* Magic Mirror
 * Node Helper: GoogleSpeech
 *
 * By L.ego
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({

	keyFilename: '',

	start: function() {
		console.log('Starting node_helper for module [' + this.name + ']');
		if (!this.keyFilename) {
			throw 'Error: key file name is empty. Please enter the key file path.';
		}
	},

	socketNotificationReceived: function(notification, payload) {
		switch(notification) {
			case 'CONNECT':
				console.log('Google Speech Module connected');
				return;
			case 'CHANGE_SPEECH':
				this.syncRecognize(
					payload.filename, 
					payload.encoding, 
					payload.sampleRateHertz, 
					payload.languageCode);
					return;
			case 'LISTEN_SPEECH':
				this.streamingMicRecognize(
					payload.encoding, 
					payload.sampleRateHertz, 
					payload.languageCode);
				return;
			default:
				return;
		}
	},

	syncRecognize: function(filename, encoding, sampleRateHertz, languageCode) {
		const self = this;
		// [START speech_sync_recognize]
		// Imports the Google Cloud client library
		const fs = require('fs');
		const speech = require('@google-cloud/speech');
		// Creates a client
		const client = new speech.SpeechClient({
			projectId: 'w4-luffy',
			keyFilename: self.keyFilename,
		});
	  
		/**       
		 * TODO(developer): Uncomment the following lines before running the sample.
		 */
		// const filename = 'Local path to audio file, e.g. /path/to/audio.raw';
		// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
		// const sampleRateHertz = 16000;
		// const languageCode = 'BCP-47 language code, e.g. en-US';
	  
		const config = {
		  encoding: encoding,
		  sampleRateHertz: sampleRateHertz,
		  languageCode: languageCode,
		};
		const audio = {
		  content: fs.readFileSync(filename).toString('base64'),
		};
	  
		const request = {
		  config: config,
		  audio: audio,
		};
	  
		// Detects speech in the audio file
		client
		  .recognize(request)
		  .then(data => {
				const response = data[0];
				const transcription = response.results
					.map(result => result.alternatives[0].transcript)
					.join('\n');
				self.sendSocketNotification('SHOW_TEXT', transcription);
				console.log('Transcription: ', transcription);
		  })
		  .catch(err => {
				console.error('ERROR:', err);
		  });
		// [END speech_sync_recognize]
	},

	streamingMicRecognize: function(encoding, sampleRateHertz, languageCode) {
		const self = this;
		// [START speech_streaming_mic_recognize]
		const record = require('node-record-lpcm16');
	  
		// Imports the Google Cloud client library
		const speech = require('@google-cloud/speech');
	  
		// Creates a client
		const client = new speech.SpeechClient({
			projectId: 'w4-luffy',
			keyFilename: self.keyFilename,
		});
	  
		/**
		 * TODO(developer): Uncomment the following lines before running the sample.
		 */
		// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
		// const sampleRateHertz = 16000;
		// const languageCode = 'BCP-47 language code, e.g. en-US';
	  
		const request = {
		  config: {
			encoding: encoding,
			sampleRateHertz: sampleRateHertz,
			languageCode: languageCode,
		  },
		  interimResults: false, // If you want interim results, set this to true
		};
	  
		// Create a recognize stream
		const recognizeStream = client
		  .streamingRecognize(request)
		  .on('error', console.error)
		  .on('data', data => {
				const transcription = data.results[0] && data.results[0].alternatives[0]
				? data.results[0].alternatives[0].transcript
				: `Reached transcription time limit, press Ctrl+C\n`
				self.sendSocketNotification('SHOW_TEXT', transcription);
				console.log('Transcription: ', transcription); 
		  	}
		  );
	  
		// Start recording and send the microphone input to the Speech API
		record
		  .start({
			sampleRateHertz: sampleRateHertz,
			threshold: 0,
			// Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
			verbose: false,
			recordProgram: 'rec', // Try also 'arecord' or 'sox'
			silence: '10.0',
		  })
		  .on('error', console.error)
		  .pipe(recognizeStream);
	  
		console.log('Listening, press Ctrl+C to stop.');
		// [END speech_streaming_mic_recognize]
	  }

});
