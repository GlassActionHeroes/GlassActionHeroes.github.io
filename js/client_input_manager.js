function ClientInputManager() {
  this.events = {};
  this.listen();
}

ClientInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

ClientInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

ClientInputManager.prototype.highLight = function(platform) {
  var platformField = document.getElementById(platform);
  var allPlatforms = document.getElementsByClassName("member");
  this.setColor(platformField, allPlatforms);
}

ClientInputManager.prototype.setColor = function(selected, others) {
  selected.style.backgroundColor = '#e1a011';
  selected.style.color = 'white';
  selected.style['box-shadow'] = '2px 2px 2px #AF9D73';

  for (var i = 0; i < others.length; i++ ){
    if (others[i] != selected){
      others[i].style.backgroundColor = '#FAEBCA';
    };
  };
}

ClientInputManager.prototype.listen = function () {
  var self = this;

  var pusher = new Pusher('514e04bbf50ba9b0b0b6', {
    authTransport: 'jsonp',
    authEndpoint: 'http://mysterious-forest-1989.herokuapp.com/pusher/auth'
  });

  var channel = pusher.subscribe('private-bnr_2048_channel');

  channel.bind('client-send_direction', function(data) {
    var map = {
      "up": 0, // Up
      "right": 1, // Right
      "down": 2, // Down
      "left": 3, // Left
    };

    var mapped = map[data.direction];
    self.emit("move", mapped);
    self.highLight(data.name);
  });


  var retry = document.querySelector(".retry-button");
  retry.addEventListener("click", this.restart.bind(this));
  retry.addEventListener("touchend", this.restart.bind(this));

  var keepPlaying = document.querySelector(".keep-playing-button");
  keepPlaying.addEventListener("click", this.keepPlaying.bind(this));
  keepPlaying.addEventListener("touchend", this.keepPlaying.bind(this));


  // Listen to swipe events
  var touchStartClientX, touchStartClientY;
  var gameContainer = document.getElementsByClassName("game-container")[0];

  gameContainer.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) return;

    touchStartClientX = event.touches[0].clientX;
    touchStartClientY = event.touches[0].clientY;
    event.preventDefault();
  });

  gameContainer.addEventListener("touchmove", function (event) {
    event.preventDefault();
  });

  gameContainer.addEventListener("touchend", function (event) {
    if (event.touches.length > 0) return;

    var dx = event.changedTouches[0].clientX - touchStartClientX;
    var absDx = Math.abs(dx);

    var dy = event.changedTouches[0].clientY - touchStartClientY;
    var absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
      // (right : left) : (down : up)
      self.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
    }
  });
};

ClientInputManager.prototype.restart = function (event) {
  event.preventDefault();
  this.emit("restart");
};

ClientInputManager.prototype.keepPlaying = function (event) {
  event.preventDefault();
  this.emit("keepPlaying");
};

