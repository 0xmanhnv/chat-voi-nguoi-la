/*
*
* -app name: chat voi nguoi la
* -author: Nguyễn Mạnh
*
*/

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
  // console.log(arrUsersOnline);
  // thuc hien code socket
  // console.log("Co nguoi ket noi: " + socket.id);
  io.sockets.emit('users-online-system', arrUsersOnline.length);

  // lang nghe user dang ky nick
  socket.on('user-dang-ky', function(data) {
    // kiem tra su ton tai cua user
    if(arrUsersOnline.indexOf(data) >= 0) {
      socket.emit('server-send-dky-fail', "Đã có người sử dụng!");
      // console.log(arrUsersOnline.indexOf(data));
    }else if (data.indexOf(" ") >= 0) {
      socket.emit('server-send-dky-fail', "Không được chứa khoảng trắng!");
    }else {
      socket.username = data;
      arrUsersOnline.push(data);
      socket.emit('server-send-dky-success');
      io.sockets.emit('users-online-system', arrUsersOnline.length);
      console.log(arrUsersOnline.length);
    }

  });

  // lang nghe user gui tin nhan len
  socket.on('user-send-message', function(data) {
    var bcData = socket.username + " : " + data;
    var cmData = "Bạn : " + data;

    socket.broadcast.emit('server-send-message', bcData);
    socket.emit('server-send-message', cmData);
    // io.sockets.emit('server-send-message', data);
  });

  // lang nghe user disconnect
  socket.on('disconnect', function(socket) {

    arrUsersOnline.splice(arrUsersOnline.lastIndexOf(socket.username), 1);
    io.sockets.emit('users-online-system', arrUsersOnline.length);
    console.log(arrUsersOnline.length);
  });

});

//lắng nghe cổng
server.listen(port, function(){
  console.log("server is starting this " + port);
});
