var pusher = new Pusher('514e04bbf50ba9b0b0b6', {
    authTransport: 'jsonp',
    authEndpoint: 'http://mysterious-forest-1989.herokuapp.com/pusher/auth'
});

var channel = pusher.subscribe('private-bnr_2048_channel');

channel.bind('client-send_direction', function(data) {
  alert(data.up);
});
