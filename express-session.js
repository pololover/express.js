var express = require('express')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store : new FileStore()  //데이터를 서버에 저장할 수 있게 만듬.
}))

app.get('/', function (req, res, next) {
  if (req.session.num === undefined) {
    req.session.num = 1
  } else {
    req.session.num = req.session.num + 1;
  }
  res.send(`Views : ${req.session.num}`);
})


app.listen(3000, function () {
  console.log('listening.');
})