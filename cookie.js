var http = require('http');
var cookie = require('cookie');
http.createServer(function (request, response) {
  var cookies = {};
  if (request.headers.cookies != undefined) {
    cookies = cookie.parse(request.headers.cookies)
   }
  response.writeHead(200, {
    'Set-cookie': ['yummy_cookie=choco', 'tasty-cookie=strawberry', `heart=good; Max-age=${60*60*24*30}`]
  });
  response.end('Cookie!!');
}).listen(3000);
