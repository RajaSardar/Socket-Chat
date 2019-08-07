const express = require('express');
const socket = require('socket.io');
const app = express();
var count = 0;
var $ipsConnected = [];
//const PORT = 3000;
app.use(express.static('public'));

var server = app.listen(3000, function() {
    console.log('server is running');
});

var io = socket(server);

io.on('connection', function(socket) {
    console.log(socket);
    var $ipAddress = socket.handshake.address;

  if (!$ipsConnected.hasOwnProperty($ipAddress)) {
  	$ipsConnected[$ipAddress] = 1;
  	count++;
      socket.emit('counter', {count:count});
  };


    socket.on("chat", function(data) {
        io.sockets.emit("chatting", data);
    });

    socket.on("typing", function(data) {
        socket.broadcast.emit("typing", data);
    });

  

    socket.on('disconnect', function() {

        if ($ipsConnected.hasOwnProperty($ipAddress)) {
  
            delete $ipsConnected[$ipAddress];
  
          count--;
  
          socket.emit('counter', {count:count});
  
        };
  
    });
});






/*app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(3000,function() {
    console.log('Listening on *:3000');
});*/
