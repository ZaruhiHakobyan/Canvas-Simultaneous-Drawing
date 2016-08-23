var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname, 'public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.emit('update drawing', { for: 'everyone' });
io.emit('clear all', { for: 'everyone' });


io.on('connection', function(socket){
  socket.on('update drawing', function(stack){
    io.emit('update drawing', stack);
  });
});


io.on('connection', function(socket){
  socket.on('clear all', function(stack){
    io.emit('clear all', stack);
  });
});


http.listen(8081, function(){
  console.log('listening on :8081');
});
