var socket = io('https://nguyenmanh.herokuapp.com');


socket.on('users-online-system', function(data) {
  $('#usersOnline').html('<p>' + data + ' Đang trực tuyến!</p>');
});

// user lang nghe tin nhan tra ve
socket.on('server-send-message', function(data) {
  $('#list-message').append("<p class='message'>"+ data + "</p>");
});

// lăng nghe ket qua dang ky tư server
socket.on('server-send-dky-fail', function(data) {
  $('#alertWarning').show();
  $('#alertWarning').html('<strong>Warning!</strong>' + data);

  setTimeout(function() {
    $('#alertWarning').hide();
  }, 2000);

});
// dang ky thanh cong
socket.on('server-send-dky-success', function() {
  // $('.form-login').hide(2000);
  $(".form-login").slideUp("slow");

  $('.main-content').show();
  $('footer').show();
});

$(document).ready(function() {
  //hien khung dang nhap
  //  $(".form-login").fadeIn(3000);
  $(".form-login").slideDown("slow");
  // cho menu fixed tip
  $('.navbar').addClass('navbar-fixed-top');

  // dang ky useer
  $('#btn-signin').click(function() {
    if($('#inputUserName').val() != '') {
      socket.emit('user-dang-ky', $('#inputUserName').val());
    }else {
      $('#alertWarning').show();
      $('#alertWarning').html('<strong>Warning!</strong> Hãy nhập Username!');

      setTimeout(function() {
        $('#alertWarning').hide();
      }, 2000);
    }
  });

  // gui tin nhan
  $('#btnSendMessage').click(function() {
    if($('#txtMessage').val().length != "") {

      socket.emit('user-send-message', $('#txtMessage').val());
      $('#txtMessage').val("");

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
