module.exports = function (app) {

  var authData = {
    email: 'csh7215@naver.com',
    password: '11111',
    nickname: 'cheon'
  }

  var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize()); //passport 초기화
  app.use(passport.session()); //passport가 session을 사용한다.
  //로그인 성공 시 session store에 정보를 저장하는 공간.
  passport.serializeUser(function (user, done) {
    console.log('serail', user);
    done(null, user.email);
  });
  //파일이 리로드 될때마다 세션스토어에 있는 id값을 통해 db에 접근해 정보들을 가져오는 공간.
  passport.deserializeUser(function (id, done) {
    console.log('desrial', id);
    done(null, authData); //request.user를 추가해주게 됨. 
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
            message: 'Incorrect password'
          })
        }
      } else {
        return done(null, false, {
          message: 'Incorrect username'
        })
      }
    }
  ));
  return passport;
}

