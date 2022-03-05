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

