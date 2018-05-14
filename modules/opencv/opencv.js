/* global Module Log io */

Module.register('opencv', {
  getScripts() {
    return ['https://cdn.socket.io/socket.io-1.4.5.js'];
  },

  start() {
    this.socket = null;
    Log.info(`Starting module: ${this.name}`);
  },

  stop() {
    this.socket.emit('end');
  },

  initSocket() {
    this.socket = io.connect('http://localhost:8080');

    this.socket.on('frame', ({ frame, rgbData }) => {
      const imgData = new ImageData(new Uint8ClampedArray(rgbData), frame.cols, frame.rows);
      const canvas = document.querySelector('.canvas-video');
      const ctx = canvas.getContext('2d');
      ctx.putImageData(imgData, 0, 0);
    });
  },

  getDom() {
    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-video';
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    return canvas;
  },

  notificationReceived(notification) {
    switch (notification) {
      case 'DOM_OBJECTS_CREATED':
        this.initSocket();
        break;
      default:
      // Do nothing.
    }
  },
});
