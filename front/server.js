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
