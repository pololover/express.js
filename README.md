# express.js
express 정리
-----

app = express()  => express모듈 실행. 

routing 처리 => app.get('/', callback) or app.post('/', callback)

app.send() => 다양한 유형의 응답을 전송한다. Content-Type이 자동으로 설정됨.

bodyParser => nodeds의 Third party 모듈. 이를 통해 클라이언트 post request의 body로 부터 파라미터를 편리하게 추출할 수 있게 된다. (사용 : app.use(bodyParser.urlencoded({ extended: false }))  )

request.body => 본래 request는 body속성을 가지지 않지만 bodyParser를 통해 post 데이터에 대해서 body속성을 가지게 된다.
