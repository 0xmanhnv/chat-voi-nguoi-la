var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 8080;
var routes = require('./routes');

var server= require('http').Server(app);
var io = require('socket.io')(server);

// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// set use static
app.use(express.static(path.join(__dirname, './public')));
app.use(routes);

// khai bao bien cuc bo
var arrUsersOnline = [];

//lắng nghe kết nối
io.on('connection', function(socket) {
  arrUsersOnline.push(socket.id);
  // thuc hien code socket
  console.log("Co nguoi ket noi: " + socket.id);
  io.sockets.emit('users-online-system', arrUsersOnline.length);

  // lang nghe user gui tin nhan len
  socket.on('user-send-message', function(data) {
    io.sockets.emit('server-send-message', data);
  });

  // lang nghe user disconnect
  socket.on('disconnect', function() {
    arrUsersOnline.splice(arrUsersOnline.lastIndexOf(socket.id));
    io.sockets.emit('users-online-system', arrUsersOnline.length);
  });

});

//lắng nghe cổng
server.listen(port, function(){
  console.log("server is starting this " + port);
});
