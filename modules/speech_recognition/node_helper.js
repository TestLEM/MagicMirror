/* Magic Mirror
 * Node Helper: speech_recognition
 *
 * By L.EGO
 */

const NodeHelper = require('../../js/node_helper.js');
const speech = require('@google-cloud/speech');
const record = require('node-record-lpcm16');
const os = require('os');
const fs = require('fs');

module.exports = NodeHelper.create({
  projectId: 'w4-luffy',
  // TODO(danhee): use api key instead of credential json file.
  keyFilePath: 'modules/speech_recognition/Luffy-f615cc7744b0.json',
  AMPLITUDE_THRESHOLD: 1000,
  // This variable is for testing on a Mac.
  thresholdRecordProgram: os.type() === 'Linux' ? 'arecord' : 'rec',
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'ko-KR',
  },

  start() {
    console.info(`Starting node_helper for module [${this.name}]`);
    if (!fs.existsSync(this.keyFilePath)) {
      throw new Error('Key file is missing. Please bring the key file.');
    }
  },

  socketNotificationReceived(notification) {
    switch (notification) {
      case 'CONNECTED':
        console.info(`${this.name} module connected`);
        this.checkThreshold();
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },

  checkThreshold() {
    console.log('Check threshold...');
    this.sendSocketNotification('WAITING');

    record
      .start({
        sampleRateHertz: this.config.sampleRateHertz,
        verbose: false,
        recordProgram: this.thresholdRecordProgram,
      })
      .on('data', (data) => {
        if (this.isHearingVoice(data)) {
          record.stop();
        }
      })
      .on('end', () => {
        this.recognizeMicStream();
      })
      .on('error', console.error);
  },

  recognizeMicStream() {
    console.log('Recognize speech...');
    this.sendSocketNotification('RECOGNIZING');

    const client = new speech.SpeechClient({
      projectId: this.projectId,
      keyFilename: this.keyFilePath,
    });

    const request = {
      config: this.config,
      interimResults: false,
    };

    const recognizeStream = client
      .streamingRecognize(request)
      .on('data', (data) => {
        if (data.results[0] && data.results[0].alternatives[0]) {
          const { transcript } = data.results[0].alternatives[0];
          console.info(transcript);
          this.sendSocketNotification('RECONGNITION_COMPLETE', transcript);
          record.stop();
        }
      })
      .on('error', (error) => {
        console.error(error);
        record.stop();
      });

    record
      .start({
        sampleRateHertz: this.config.sampleRateHertz,
        verbose: false,
        recordProgram: 'rec',
        silence: '3.0',
        threshold: '0.5',
      })
      .on('end', () => {
        this.checkThreshold();
      })
      .on('error', (error) => {
        console.error(error);
        record.stop();
      })
      .pipe(recognizeStream);
  },

  isHearingVoice(data) {
    for (let i = 0; i < data.length - 1; i += 2) {
      // false, if value < 0
      if (data[i + 1] > 0x7f) {
        return false;
      }
      const sample = (data[i + 1] << 8) | (data[i] & 0xff); // eslint-disable-line no-bitwise
      // TODO (wonjerry): 소리의 최대값, 최소값 기준 수정하기
      if (sample > this.AMPLITUDE_THRESHOLD && sample < 8000) {
        console.log(`Sample : ${sample}`);
        return true;
      }
    }
    return false;
  },
});
