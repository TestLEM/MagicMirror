const Class = require('./class.js');
const express = require('express');

const NodeHelper = Class.extend({
  init() {
    console.log('Initializing new module helper ...');
  },

  loaded(callback) {
    console.log(`Module helper loaded: ${this.name}`);
    callback();
  },

  start() {
    console.log(`Starting module helper: ${this.name}`);
  },

  /* stop()
   * Called when the MagicMirror server receives a `SIGINT`
   * Close any open connections, stop any sub-processes and
   * gracefully exit the module.
   *
   */
  stop() {
    console.log(`Stopping module helper: ${this.name}`);
  },

  /* socketNotificationReceived(notification, payload)
   * This method is called when a socket notification arrives.
   *
   * argument notification string - The identifier of the notification.
   * argument payload mixed - The payload of the notification.
   */
  socketNotificationReceived(notification, payload) {
    console.log(`${this.name} received a socket notification: ${notification} - Payload: ${payload}`);
  },

  /* setName(name)
   * Set the module name.
   *
   * argument name string - Module name.
   */
  setName(name) {
    this.name = name;
  },

  /* setPath(path)
   * Set the module path.
   *
   * argument path string - Module path.
   */
  setPath(path) {
    this.path = path;
  },

  /* sendSocketNotification(notification, payload)
   * Send a socket notification to the node helper.
   *
   * argument notification string - The identifier of the notification.
   * argument payload mixed - The payload of the notification.
   */
  sendSocketNotification(notification, payload) {
    this.io.of(this.name).emit(notification, payload);
  },

  /* setExpressApp(app)
   * Sets the express app object for this module.
   * This allows you to host files from the created webserver.
   *
   * argument app Express app - The Express app object.
   */
  setExpressApp(app) {
    this.expressApp = app;

    const publicPath = `${this.path}/public`;
    app.use(`/${this.name}`, express.static(publicPath));
  },

  /* setSocketIO(io)
   * Sets the socket io object for this module.
   * Binds message receiver.
   *
   * argument io Socket.io - The Socket io object.
   */
  setSocketIO(io) {
    const self = this;
    self.io = io;

    console.log(`Connecting socket for: ${this.name}`);
    const namespace = this.name;
    io.of(namespace).on('connection', (socket) => {
      // add a catch all event.
      const { onevent } = socket;
      /* eslint-disable no-param-reassign */
      socket.onevent = function _onevent(packet) {
        const args = packet.data || [];
        onevent.call(this, packet); // original call
        packet.data = ['*'].concat(args);
        onevent.call(this, packet); // additional call to catch-all
      };

      // register catch all.
      socket.on('*', (notification, payload) => {
        if (notification !== '*') {
          // console.log('received message in namespace: ' + namespace);
          self.socketNotificationReceived(notification, payload);
        }
      });
    });
  },
});

NodeHelper.create = function create(moduleDefinition) {
  return NodeHelper.extend(moduleDefinition);
};

module.exports = NodeHelper;
