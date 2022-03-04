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
