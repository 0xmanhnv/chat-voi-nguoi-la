var socket = io('https://nguyenmanh.herokuapp.com');

socket.on('users-online-system', function(data) {
  $('#usersOnline').html('<p>' + data + ' Đang trực tuyến!</p>');
});

// user lang nghe tin nhan tra ve
socket.on('server-send-message', function(data) {
  $('#list-message').append("<p class='message'>"+ data + "</p>");
});

$(document).ready(function() {
  // gui tin nhan
  $('#btnSendMessage').click(function() {
    if($('#txtMessage').val().length != "") {
      socket.emit('user-send-message', $('#txtMessage').val());
    }else {
      $('#alertWarning').show();
      $('#alertWarning').html('<strong>Warning!</strong> Hãy nhập văn bản rồi mới gửi!');

      setTimeout(function() {
        $('#alertWarning').hide();
      }, 2000);
    }
  });

  //su kien nut new and newNext
  $('#newNext').click(function() {
    alert("Chuc nang dang trong giai doan phat trien!");
  });

});
