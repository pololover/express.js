# express.js
express 정리
-----

app = express()  => express모듈 실행. 

routing 처리 => app.get('/', callback) or app.post('/', callback)

app.send() => 다양한 유형의 응답을 전송한다. Content-Type이 자동으로 설정됨.

bodyParser => nodeds의 Third party 모듈. 이를 통해 클라이언트 post request의 body로 부터 파라미터를 편리하게 추출할 수 있게 된다. (사용 : app.use(bodyParser.urlencoded({ extended: false }))  )

request.body => 본래 request는 body속성을 가지지 않지만 bodyParser를 통해 post 데이터에 대해서 body속성을 가지게 된다.

express환경에서 정적파일을 다룰 때 express.static을 이용. 여기서 정적파일이란 HTML을 제외하고 웹 페이지를 렌더링 할 때 필요한 추가적인 파일을 의미한다.
사용방법 : express.static('public'). //public 디렉토리 밑의 정적자원들을 사용자가 요청했을 때 전송해준다. 
이러한 방법의 장점은 보안이 좋다는 것이다. 그 이유는 사용자가 요청한 주소와 실제 자원들이 저장되어있는 위치가 다르기 때문이다.
즉 위와 같이 코드를 작성했을 때 요청은 localhost:3030/mash.jpg를 했지만 이 자원은 public/mash.jpg에 있게 된다. 

동적파일은 데이터를 가공해서 제공하기에 이와 상반된다. js파일은 동적으로도 쓰일 수 있고 정적으로도 쓰일 수 있다.

404 및 에러 핸들링
-----
404 핸들링은 가장 마지막에 작성해준다. 이유는 미들웨어는 순차적으로 작동하기에 맨 마지막까지 찾은 게 없다면 실행시켜야하기 때문이다.
에러 핸들링은 로직을 진행하다가 에러를 만나게됐을 때 다른 미들웨어는 스킵하고 에러 핸들링 미들웨어로 가는 것이다. 첫번째인자로 err이 들어오는 게 특징이다.


route 분리
----
express.Router()메소드를 통해서 router객체를 가져온 뒤 여러 라우트들을 분리시킨다.(컴포넌트 분리와 비슷) 

cookie 
----
cookie는 서버가 사용자의 웹 브라우저에 전송하는 작은 정보조각이다.
쿠키는 세션 쿠키와 영속 쿠키로 나눌 수 있다.
이를 나누는 기준은 Max-age나 expired키워드를 이용해서 나눌 수 있는데 해당 키워드들을 사용했을 때는 영속쿠키 아니면 세션쿠키이다.

세션 쿠키는 일시적이고 영속 쿠키는 지정해놓은 기간까지 브라우저를 꺼도 살아있다는 특징이 있다.


cookie 보안
----
cookie의 보안은 대표적으로 Secure와 HttpOnly가 있다.
Secure는 https의 한에서만 쿠키를 전송함으로써 사용자의 정보를 암호화한다.
HttpOnly는 http탕비에 대해서만 쿠키를 전송하기 때문에 javascript와 같은 환경에서는 참조할 수 없게 된다.


cookie 접근범위
----
path를 이용하면 원하는 경로까지 쿠키를 유지시킬 수 있게된다.
domain을 이용하면 서브도메인까지 유지시킬 수 있게 된다. 예를들어 domain기능을 사용하지 않은 상태로 www.tistory.com 서버에서 생성했을 때 ww.tistory.com이나 seunghyun.tistory.com 서버에는 접근할 수 없게된다. 이를 domain속성을 통해 'tistory_cookie=cheon; Domain=.tistory.com' 을 하게 되면 .이 붙으면서 서브도메인에 대한 쿠키들을 저장할 수 있게 된다.


cookie express
-----
express 환경에서는 cookie에 대한 부분을 자유롭게 작성할 수 있다. 방법은 cookie-parser미들웨어를 use시키면 된다.
이는 쿠키에 대한 설정 및 가져오기를 할 수 있고. 프론트단에서 request로 보낸 것에 cookies가 파싱 된 상태로 전달되기 때문에 유용하다.


logout하는 과정에서 post요청으로 받아서 살짝 헤맸음. -> get요청으로.
전역변수의 사용은 줄이고 require를 적극 활용 -> 변수의 충돌 방지.


session
-----
cookie는 값들이 브라우저에 저장되면서 평문으로 보내지기 때문에 보안에서 위험이 있다. 그래서 나온게 session
express환경에서 session은 암호화해서 session_id값을 서버에 저장시킬 수 있고(session-file-store 이용) 생성된 session_id값만을 이용하여 서버에 저장된 데이터를 사용할 수 있다.

session.destroy를 이용하면 session정보들을 다 없애준다.

passport
-----
모던 웹앱은 SNS네트워킹이 활성화되면서 트위터나 페이스북과 같은 연동로그인의 필요성이 높아졌다. 이러한 배경 속에서 OAuth를 제공하는 API들은 토큰 기반의 증명서를 요구한다.
passport는 구글로 로그인할 것인가, 페이스북으로 로그인할 것인가, 로컬로 로그인할 것인가와 같은 전략들을 각각 모듈화시켜 패키지로 제공한다. 때문에 passport문법에 맞춰 독립적으로 통일된 백엔드로직을 설계할 수가 있게 된다.

passport 사용방법
```
// main.js
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;  //passport모듈에서 불러오고, local전략을 이용

app.use(passport.initialize()); //passport 초기화
app.use(passport.session()); //passport가 session을 사용한다.

passport.serializeUser(function (user, done) {
  done(null, user.email);
});
//파일이 리로드 될때마다 세션스토어에 있는 id값을 통해 db에 접근해 정보들을 가져오는 공간.
passport.deserializeUser(function (id, done) {
  done(null, authData); //request.user를 추가해주게 됨. 
});
//로컬 전략
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
```
```
// authRoute.js -> 인증 관련로직들은 전부 authRoute에 존재.
router.post('/login_process', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      console.log(info);
      if (info) { // info로 들어온 플래시 메세지 처리
        req.session.flash.error = [info.message];
      } else {
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
      req.logIn(user, function (err) { // (아마) 첫번재 인자를 serializeUser로 넘기고 콜백으로 그 이후 처리를 작성
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

```
passport 작동순서(local 환경 로그인 프로세스)
-----
login_process 라우트 이동 -> passport.authenticate 로컬전략 이용 -> localStrategy 내부에서 db데이터 식별확인 후 찾았다면 serialize로 객체전달. 
-> serialize 내부에서 done(null, user.id)를 통해 세션 스토어에 데이터 저장. -> 다시 authenticate로 돌아와서 콜백함수 실행 -> 콜백함수 내부에서 request.login이 존재하고 이 안에서 request.session.save을 통해 정보가 저장될때 redirect하게 설계.






