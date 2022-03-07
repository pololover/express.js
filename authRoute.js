var express = require('express');
const { request } = require('http');
var router = express.Router()
var template = require('../lib/template');
var db = require('../lib/db');
const shortid = require('shortid');
module.exports = function (passport) { 
  //route, routing
  //app.get('/', (req, res) => res.send('Hello World!'))
  router.get('/login', function (request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var title = 'Login';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
  <h1>${feedback}sadsa</h1>
  <h2>${title}</h2>
  <form action="/auth/login_process" method="post">
    <p><input type="email" name="email" placeholder="email"></p>
    <p><input type="password" name="pwd" placeholder="password"></p>
    <input type="submit" value="login">
    </form>
  `, ''
    );
    response.send(html);
  });


  router.post('/login_process', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {  //마지막에 passport에서 여기로 오는 구조.
      if (info) { // info로 들어온 플래시 메세지 처리
        req.session.flash.error = [info.message];
      } else {0
        req.session.flash.success = ['Welcome.'];
      }
      if (err) {
        return next(err);
      }
      if (!user) { // user에 정보가 안들어 왔을 경우
        return req.session.save(function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect('/auth/login');
        })
      }
      req.logIn(user, function (err) { 
        console.log('authRoute_login', user, info);
        if (err) {
          return next(err);
        }
        return req.session.save(function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect('/');
        });
      });
    })(req, res, next);
  });

  /*
  router.post('/login_process', (req, res) => {
    var post = req.body;
    var email = post.email;
    var password = post.pwd;
    if (email == authData.email && password == authData.password) {
      req.session.is_logined = true;
      req.session.nickname = authData.nickname;
      req.session.save(function () {
        res.redirect('/');
      })
  
    } else {
      res.send('you cannot login');
    }
  })
  */
  router.get('/logout_process', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
      res.redirect('/');
    })
  })

  //register section
  router.get('/register', function (request, response) {
    console.log(request.session);
    var fmsg = request.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var title = 'Register';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
  <h1>${feedback}sadsa</h1>
  <h2>${title}</h2>
  <form action="/auth/register_process" method="post">
    <p><input type="email" name="email" placeholder="email"></p>
    <p><input type="password" name="pwd" placeholder="password"></p>
    <p><input type="password" name="pwd2" placeholder="password"></p>
    <p><input type="text" name="displayName" value="displayname"></p>
    <input type="submit" value="register">
    </form>
  `, ''
    );
    response.send(html);
  });

  router.post('/register_process', function (request, response) {
    var post = request.body;
    var email = post.email;
    var pwd = post.pwd;
    var pwd2 = post.pwd2;
    var displayName = post.displayName;
    if (pwd !== pwd2) {
      request.flash('error', 'password must not same!!');
      request.session.save(function () {
        response.redirect('/auth/register');   
      })
     
    } else {
      var user = {
        id: shortid.generate(),
        email: email,
        password: pwd,
        displayName: displayName
      }
      db.get('users').push(user).write();
      request.login(user, function (err) {
        request.session.save(function () {
          return response.redirect('/');
        })
        });
    }
  });



  return router;  
}
