const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const config = require('platformsh-config').config();

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

var i = 0;
// Broadcast "tick" event every second
// Or do whatever you want with io ;)
setInterval(() => {
  i++;
  console.log(i)
  io.emit("tick", i);
}, 1000);

app.post('/', (req, res) => {
  io.emit('test', req.body)
});

server.listen(config.port, () => {
  console.log(`listening on *:${config.port}`);
});

module.exports = {
  io
}
