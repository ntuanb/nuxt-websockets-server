const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(express.json())

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
  res.json(req.body)
});

io.on('connect', (payload) => {
  console.log('server connect')
})

io.on('connection', (socket) => {
  socket.on('test', (msg) => {
    console.log('message: ' + msg);
  });
});

const port = config.port

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

module.exports = {
  io
}
