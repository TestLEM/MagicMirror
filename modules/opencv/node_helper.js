const NodeHelper = require('../../js/node_helper');
const cv = require('opencv4nodejs');

const video = new cv.VideoCapture(0);

module.exports = NodeHelper.create({
  config: {
    captureInterval: 100,
  },
  start() {
    console.log(`${this.name} helper started ...`);

    this.io.on('connection', (socket) => {
      const intervalId = setInterval(() => {
        const frame = video.read();
        const matRGBA = frame.cvtColor(cv.COLOR_BGR2RGBA);

        socket.emit('frame', {
          frame,
          rgbData: matRGBA.getData(),
        });
      }, this.config.captureInterval);

      socket.on('end', () => {
        clearInterval(intervalId);
        video.release();
      });
    });
  },
});
