var express = require('express')
var router = express.Router()
var template = require('../lib/template');
//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
router.get('/', function (request, response) {
  var title = 'Login';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
  <h2>${title}</h2>
  <form action="/login/login_process" method="post">
    <p><input type="email" name="email" placeholder="email"></p>
    <p><input type="password" name="password" placeholder="password"></p>
    <input type="submit">
  </form>
  `,
    `<a href="/topic/create">create</a>`
  );
  response.send(html);
});

router.post('/login_process', (req, res) => {
  var post = req.body;
  var email = post.email;
  var password = post.password;
  if (email == 'csh7215@naver.com' && password == '11111') {
    res.cookie('email', email);
    res.cookie('password', password);
    res.redirect('/');
  } else {
    res.send('you cannot login');
  }
})
  
router.get('/logout_process', (req, res) => {
  res.cookie('email', '', { maxAge: 0 });
  res.cookie('password', '', { maxAge: 0 });
  res.redirect('/');
})

module.exports = router