import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import post from './post';
import { backUrl } from '../config/config';

axios.defaults.baseURL = `${backUrl}/api`;

export default function* rootSaga() {
  yield all([   //제너레이터 문법 yield명령어를 통하여 중단점을 조절할 수 있다.
    fork(user), // 또한, all을 통해 한번에 여러개의 비동기 처리를 할 수 있음.
    fork(post), // fork를 통해 비동기 처리 (궁금증:운영체제에서 멀티프로세스를 만들때 fork를 사용함. 같은 의미일까?)
  ]);
}


//saga를 post와 user로 분리할 수 있음. module화 같은 느낌?
//root saga로 하나로 모아주는 작업을 함