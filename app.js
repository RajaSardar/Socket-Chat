const express = require('express');
const socket = require('socket.io');
const app = express();
//var $ipsConnected = [];
//const PORT = 3000;
var clients = 0;
app.use(express.static('public'));
//server instance
var server = app.listen(3000, function() {
    console.log('server is running');
});

var io = socket(server);
//new socket connection
io.on('connection', function (socket) {
    //online connection count
    clients++;
    io.sockets.emit('broadcast', { description: clients + ' clients connected!' });
    socket.on('disconnect', function () {
        clients--;
        io.sockets.emit('broadcast', { description: clients + ' clients connected!' });
    });


    //console.log(socket);

    /*var $ipAddress = socket.handshake.address;

  if (!$ipsConnected.hasOwnProperty($ipAddress)) {
  	$ipsConnected[$ipAddress] = 1;
  	count++;
      socket.emit('counter', {count:count});
  };*/

    //message 
    socket.on("chat", function(data) {
        io.sockets.emit("chatting", data);
    });
    //typing
    socket.on("typing", function(data) {
        socket.broadcast.emit("typing", data);
    });

  

    /*socket.on('disconnect', function() {

        if ($ipsConnected.hasOwnProperty($ipAddress)) {
  
            delete $ipsConnected[$ipAddress];
  
          count--;
  
          socket.emit('counter', {count:count});
  
        };
  
    });*/
});

