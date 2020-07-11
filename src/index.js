
const net = require("net");
const io = require("socket.io-client");

class RelayServer {
  constructor(socketServer, event, port) {
    this.socketServer = socketServer;
    this.event = event;
    this.socketClient = io.connect(socketServer);
    this.socketClient.on("connect", () => {console.log("Connected!")});
    this.connectedTelnets = [];
    this.socketClient.on("allUsers", (data) => {
      for (var socket in connectedTelnets) {
        connectedTelnets[socket].write(data);
      }
    });
    this.socketClient.on("user", (user, data) => {
      connectedTelnets[user].write(data);
    });
    this.netServer = net.Server((socket) => {
      this.connectedTelnets.push(socket);
      socket.on("data", (d) => {
        this.socketClient.emit(this.event, {user: this.connectedTelnets.indexOf(socket), data: d});
      });
      socket.on("end", () => {
        this.connectedTelnets.splice(this.connectedTelnets.indexOf(socket), 1);
      });
    }).port(this.port);
  }
}

module.exports = RelayServer;
