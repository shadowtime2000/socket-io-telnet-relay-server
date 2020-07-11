# socket-io-telnet-relay-server
An npm package for a relay server to connect telnet clients to socket.io servers

## Usage
You can install it from npm with:
```
npm install socket-io-telnet-relay-server
```
You can import it with
```javascript
const RelayServer = require("socket-io-telnet-relay-server");
```
You must specify the address of the socket.io server, the event to emit to socket.io by, and the port for the telnet server to run on.
To send data to all telnet clients, you can use the ```allUsers``` event, followed by the data.
To send data to a certain telnet client, you must use the ```user``` event, with the id of the telnet client and the data.
**Warning! The telnet client ids can change extremely quick as soon as a client drops**
When a telnet client sends data, it will use the event you specified when created the RelayServer, with an object containing a ```user``` attribute specifying the id of the user, and a ```data``` attribute which has the data.
