var db = require('../lib/db');

module.exports = function (app) {
  var authData = {
    email: 'csh7215@naver.com',
    password: '11111',
    nickname: 'cheon'
  }

  var passport = require('passport'), LocalStrategy = require('passport-local').Strategy,
      GoogleStrategy = require('passport-google-oauth2').Strategy;

  app.use(passport.initialize()); //passport 초기화
  app.use(passport.session()); //passport가 session을 사용한다.
  //로그인 성공 시 session store에 정보를 저장하는 공간.
  passport.serializeUser(function (user, done) {
    console.log('serial', user.id);
    done(null, user.id);
  });
  //파일이 리로드 될때마다 세션스토어에 있는 id값을 통해 db에 접근해 정보들을 가져오는 공간.
  passport.deserializeUser(function (id, done) {
    var user = db.get('users').find({ id: id }).value();
    console.log('deserial', id, user);
    done(null, user); //request.user를 추가해주게 됨. 
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email', //form name값을 커스텀해주는 곳.
      passwordField: 'pwd',
    },
    function (email, password, done) {
      console.log('localStrategy');
      var user = db.get('users').find({ email: email, password: password }).value();
      console.log('user', user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'Incorrect password'
        })
      }
    }
  ));
  var googleCredential = require('../config/google.json');
  passport.use(new GoogleStrategy({
    clientID: googleCredential.web.client_id,
    clientSecret: googleCredential.web.client_secret,
    callbackURL: googleCredential.web.redirect_uris,
    passReqToCallback: true
  },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));
  return passport;
}

