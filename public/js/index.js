var socket = io();

socket.on('connect', function () {
  console.log('Connected to Server');
})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

socket.on('newMessage', (message) => {
  // console.log('newMessage', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text:message.text,
    from: message.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);

})

socket.on('newLocationMessage', function (message) {
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>')
  var formattedTime = moment(message.createdAt).format('h:mm a');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  //
  // li.append(a);
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url:message.url,
    from: message.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message-input]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  })
})


var locationButton = jQuery('#send-location');

console.log("locationButton:", locationButton);

locationButton.on('click', function () {


  if(!navigator.geolocation) {
    return alert('Your browser is crap - get a better one');
  };

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {

    locationButton.removeAttr('disabled').text('Send location');

    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  } , function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch loaction');
  })

})
