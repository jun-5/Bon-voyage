import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;


//리듀서와 사가는 module화 처럼 작은 단위로 나누는게 가능하다
//index.js 에서 콤바인리듀서로 묶어줘야한다.
/**
 * redux, mobx, graphql 
상태관리를 하는 도구
흩어져있는 스테이트를 하나로 관리

Redux를 쓰면 React state 안써도됨
쓰는이유? 안정성, 통제에 용이
하지만 Redux와 React state를 같이 사용함.
왜? 회원가입 폼을 생각해보자.
한글자씩 입력할때마다 Redux의 state가 바뀌고 리렌더링이 일어난다면?
불필요한 렌더링이 발생하게된다.
ReactState로 값을 다 받은후 하나로 묶어 Redux에 업데이트하면 성능이 더 좋아질 것이다.


Action = state를 바꾸는 행동 ex)로그인 액션
Dispatch-> 액션을 실행 ex)로그인 액션 dispatch
Reducer -> Action의 결과로 state를 어떻게 바꿀지 정의
ex) 로그인 액션 dispatch시 state값을 어떻게 바꿀지 정의



Redux의 단점 -> 코드가 길어짐 + 타입스크립트 -> 2배더 길어짐

리액트에 리덕스 적용은 _app.js에서 <Provider> 사용 최상위 컴포넌트이기떄문에
store을 props로 넣어주면 전부다 받음
store = state, action, reducer

redux의 미들웨어를 왜 쓰는가?
redux는 백엔드와 통신하여 요청-> 성공or 실패-> 해당 액션 수행
비동기적인 작업이 필요하지만 리덕스는 동기요청밖에 처리하지 못한다.
따라서, 미들웨어를 사용해야한다
redux의 미들웨어는 3가지종류가 있따
thunk, saga, observerble 3가지가 있따
thunk는 간단하지만 기능이 약함 ->사가를 많이 사용


*
 */