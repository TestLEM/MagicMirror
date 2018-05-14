const NodeHelper = require('../../js/node_helper.js');
const PythonShell = require('python-shell');

module.exports = NodeHelper.create({
  start() {
    this.pythonStarted = false;
  },

  python_start() {
    const pyshell = new PythonShell(`modules/${this.name}/lib/mm/face_detection.py`, {
      mode: 'json',
      args: [JSON.stringify(this.config)],
    });

    pyshell.on('message', (message) => {
      const { payload } = message;

      switch (payload.type) {
        case 'status':
          console.log(`[${this.name}] ${payload.status}`);
          break;
        case 'detectedFaceOn':
          console.log(`[${this.name}] Face detected.`);
          this.sendSocketNotification('DETECTED_FACE_ON');
          break;
        case 'detectedFaceOff':
          console.log(`[${this.name}] Face disappeared.`);
          this.sendSocketNotification('DETECTED_FACE_OFF');
          break;
        case 'updateFaces':
          console.log(`[${this.name}] ${payload.faceNum} faces, ${JSON.stringify(payload.positions)}`);
          this.sendSocketNotification('UPDATE_FACES', payload.faceNum);
          break;
        default:
          break;
      }
    });

    pyshell.end((err) => {
      if (err) throw err;
      console.log(`[${this.name}] finished running...`);
    });
  },

  socketNotificationReceived(notification, payload) {
    if (notification === 'CONFIG') {
      this.config = payload;
      if (!this.pythonStarted) {
        this.pythonStarted = true;
        this.python_start();
      }
    }
  },
});
