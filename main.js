var express = require('express')
var app = express()
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression')
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/authRoute');
var session = require('express-session');
var FileStore = require('session-file-store')(session)
app.use(express.static('exam'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(session({
  secret: 'fdasjkllkaf@!@!dsad',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))
var authData = {
  email: 'csh7215@naver.com',
  password: '11111',
  nickname: 'cheon'
}

var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  console.log('serail', user);
  done(null, user.email);
});
passport.deserializeUser(function (id, done) {
  console.log('desrial', id);
  done(null, id);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email', //form name값을 커스텀해주는 곳.
    passwordField: 'pwd',
  },
  function (username, password, done) {
    if (username == authData.email) {
      if (password == authData.password) {
        return done(null, authData)
      } else {
        return done(null, false, {
          message : 'Incorrect password'
        })
      }
    } else {
      return done(null, false, {
        message: 'Incorrect username'
      })
    }
  }
));
//3번째 인자로 콜백을 줘서 login처리하게.
app.post('/auth/login_process',
  passport.authenticate('local', { //id와 password로 로그인하는 전략을 취함.
    failureRedirect: '/auth/login'
  }),
    function(req, res) {
      req.session.save(function () {
        console.log('redirect');
        res.redirect('/');
      })
    })



// authenIs = function (req, res) {
//   var isOwner = false;
//   if (req.cookies.email == "csh7215@naver.com" && req.cookies.password == "11111") {
//     isOwner = true;
//     return isOwner
//   } else {
//     return isOwner
//   }
// }

// authStatusUIs = function (req, res) {
//   var authStatusUI = '<a href="/login">로그인</a>';
//   if (authenIs(req, res)) {
//     authStatusUI = '<a href="/login/logout_process">logout</a>';
//   }
//   return authStatusUI
// }

app.get('*', function (request, response, next) {
  // request.isOwner = authenIs(request, response);
  // request.authen = authStatusUIs(request, response);
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;  
    next();
  });
});

// app.post('*', function (req, res, next) {
//   req.isOwner = authenIs(req, res);
//   next()
// })

app.use('/', indexRouter);

app.use('/topic', topicRouter);

app.use('/auth', authRouter);


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