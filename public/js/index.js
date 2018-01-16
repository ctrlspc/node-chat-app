var socket = io();

socket.on('connect', function () {
  console.log('Connected to Server');

  socket.emit('createMessage', {
    from:'jason',
    text:'this is a new message'
  });


})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

socket.on('newMessage', (message) => {
  console.log(message);
})