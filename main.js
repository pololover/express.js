var express = require('express')
var app = express()
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression')
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
app.use(express.static('exam'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());

function authenIs(req, res) {
  var isOwner = false;
  if (req.cookies.email == "csh7215@naver.com" && req.cookies.password == "11111") {
    isOwner = true;
    return isOwner
  } else {
    return isOwner
  }
}
app.get('*', function (request, response, next) {
  var isOwner = authenIs(request, response);
  console.log(isOwner);
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;  
    next();
  });
});

app.use('/', indexRouter);

app.use('/topic', topicRouter);

app.use('/login', loginRouter);


app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});