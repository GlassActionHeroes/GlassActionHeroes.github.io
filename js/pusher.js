var pusher = new Pusher('514e04bbf50ba9b0b0b6');
var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function(data) {
  alert(data);
});
