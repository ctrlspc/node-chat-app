const path = require('path');
const publicPath = path.join(__dirname + "/../public")
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require("./utils/validation");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connected');


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name)||!isRealString(params.room)) {
      callback('Name and Room Name are required');
    }

    socket.join(params.room);
    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has Joined`));

    callback();
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  })

  socket.on('createMessage', (message,callback) => {
    console.log('create message:', message);
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback();
  })

  socket.on('createLocationMessage', (coords) => {
    console.log('createLocationMessage', coords);
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })
});



server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
