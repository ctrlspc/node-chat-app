var socket = io();

socket.on('connect', function () {
  console.log('Connected to Server');
})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

socket.on('newMessage', (message) => {
  console.log('newMessage', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>')

  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();


  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message-input]').val()
  }, function() {

  })
})


var locationButton = jQuery('#send-location');

console.log("locationButton:", locationButton);

locationButton.on('click', function () {

  console.log('send location button pressed');

  if(!navigator.geolocation) {
    return alert('Your browser is crap - get a better one');
  };

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);

    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  } , function () {
    alert('Unable to fetch loaction');
  })

})
