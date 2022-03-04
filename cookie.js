var http = require('http');
var cookie = require('cookie');
http.createServer(function (request, response) {
  var cookies = {};
  if (request.headers.cookies != undefined) {
    cookies = cookie.parse(request.headers.cookies)
   }
  response.writeHead(200, {
    'Set-cookie': [
      'yummy_cookie=choco',
      'tasty-cookie=strawberry',
      `heart=good; Max-age=${60 * 60 * 24 * 30}`,
      `Secure=Secure; Secure`, //https에 대해서만 쿠키전송
      'HttpOnly=HttpOnly; HttpOnly' //http타입에 대해서만 쿠키전송. 즉 js에서 안됨.

    
    ]
  });
  response.end('Cookie!!');
}).listen(3000);
