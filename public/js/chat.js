var socket = io();

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight
    >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if(err) {
      alert(err);
      window.location.href= '/';
    } else {
      console.log('No error');
    }
  });

})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

socket.on('updateUsersList', function (usersList) {
  var ol = jQuery('<ol></ol>');

  usersList.forEach(function (user) {
    console.log(user);
    ol.append(jQuery('<li></li>').text(user));
  })

  jQuery('#users').html(ol);
})

socket.on('newMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text:message.text,
    from: message.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

})

socket.on('newLocationMessage', function (message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url:message.url,
    from: message.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message-input]')
  socket.emit('createMessage', {
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
