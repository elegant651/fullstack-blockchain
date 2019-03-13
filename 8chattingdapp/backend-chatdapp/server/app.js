const express = require('express');
const app = express();

server = app.listen(3000, function(){
  console.log('server is running')
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('socket: ' + socket.id)    

  socket.on('SEND_MESSAGE', (data) => {
    io.emit('MESSAGE', data);
  });

});

