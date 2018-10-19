
//socket-singletion.js

var socket = require('socket.io');

var SocketSingleton = (() => {
  this.io = null;
  this.configure = (server) => {
    this.io = socket(server);
  }

  return this;
})();

module.exports