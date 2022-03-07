var express = require('express');
const { request } = require('http');
var router = express.Router()
var template = require('../lib/template');



//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
router.get('/login', function (request, response) {
  var title = 'Login';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
  <h2>${title}</h2>
  <form action="/auth/login_process" method="post">
    <p><input type="email" name="email" placeholder="email"></p>
    <p><input type="password" name="pwd" placeholder="password"></p>
    <input type="submit" value="login">
    </form>
  `,''
  );
  response.send(html);
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

module.exports = router