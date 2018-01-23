const path = require('path');
const publicPath = path.join(__dirname + "/../public")
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  })

  socket.on('createMessage', (message) => {
    console.log('create message:', message);
    io.emit('newMessage', {
      from:message.from,
      text:message.text,
      createdAt: new Date().getTime()
    })
  })
});



server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
