var socket = io();

var select = jQuery('#existing-rooms')
var roomInput = jQuery('#room-name')

select.on('change', function(e) {
  roomInput.val(jQuery('#existing-rooms option:selected').val());
});


socket.on('updateRooms', function (rooms) {
  select.empty();
  select.append(jQuery('<option value="">Select an existing room</option>'))
  rooms.forEach(function (room) {
    select.append(jQuery('<option></option>').text(room).val(room));
  });


});
