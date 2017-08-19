var express = require('express');
var route = express.Router();

route.get('/', function(req, res){
  res.render('index', {
    title: "Chat voi nguoi la",
  });
});

module.exports = route;
