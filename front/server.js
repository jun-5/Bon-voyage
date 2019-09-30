const express = require('express'); //프론트 서버에 node express 구동
const next = require('next'); //프론트 서버 next 구동
const morgan = require('morgan'); //morgan은 서버에 로그를 남겨주는 기능을 함
const cookieParser = require('cookie-parser');// 쿠키관련 문제
const expressSession = require('express-session');//세션관련 문제 
const dotenv = require('dotenv');// dotenv 파일은 github에 올라가지 않음, DB PASSWORD,ID COOKIE_SECRET등의 정보를 담고있음. 노출될 위험이 적다
const path = require('path');

const dev = process.env.NODE_ENV !== 'production'; //개발모드일때와 프로덕션모드일때를 구분
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use('/', express.static(path.join(__dirname, 'public')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, //COOKIE_SECRET은 DOTENV파일에 존재
    cookie: {
      httpOnly: true,
      secure: false,//HTTPS를 사용하려면 TRUE로 수정
    },
  }));

  server.get('/post/:id', (req, res) => { //동적 라우팅 
    return app.render(req, res, '/post', { id: req.params.id });
  });

  server.get('/hashtag/:tag', (req, res) => { //동적 라우팅 
    return app.render(req, res, '/hashtag', { tag: req.params.tag });
  });

  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(prod ? process.env.PORT : 3060, () => {
    console.log(`next+express running on port ${prod ? process.env.PORT : 3060}`);
  });
});




/*
1.프론트와 백엔드를 분리하는 이유!
-스케일링 이슈 
 -> Front화면은 프론트는 화면 그리는 역할에 충실
 -> BackEnd는 데이터 처리 역할
 Front에서 처리해야할 이슈가 많아진다? Front서버 증가시키기
 BackEnd는 처리해야할 이슈가 많아진다? BackEnd서버 증가시키기

 만약 서버가 통합되어있다면? 프론트서버를 증가시키면 백엔드서버도 증가시켜야함
 불필요한 서버 증가로 메모리낭비!

 분리시 코드의 복잡도가 증가한다는 단점이 존재한다. EX)CORS
 CORS (Cross-Origin Resource Sharing) 관련 이슈 존재
-> 다른 도메인에서 접근하는것을 거부함


2. Next를 사용한 이유
-검색엔진 최적화 (SSR)
SPA(Single Page Application)의 단점은 클라이언트단에서 렌더링이 되기떄문에 서버로부터 받을 데이터를
검색봇이 읽지 못하는 이슈가 있음 ex)Postman을 통하여 확인해볼 수 있다.


-코드 스플리팅
클라이언트가 페이지에 대한 정보를 가지고 있기 때문에 렌더링될때 불필요한 데이터까지 불러오게 된다면 메모리 낭비가 발생하며
렌더링 시간이 오래걸리게 된다. 
ex) getinitialProps 이용하여 코드 스플리팅이슈 해결 

-라우팅 기능
리액트에서 리액트라우터를 많이 사용한다. 넥스트에도 비슷한 기능이 제공된다. 

3. Next를 사용하는데 왜 express를 사용하나요?
  server.get('/hashtag/:tag', (req, res)  코드에서 :tag와 같이 동적으로 변하는 데이터를 처리하기 위해서는
  Next는 기능이 없지만 express는 가능하다.! :tag ->와일드카드라고한다

*/