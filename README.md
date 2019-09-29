## Bon-voyage

19.05 - 19.08

### 개인 프로젝트

> React와 Node.js를 활용한 여행 SNS 플랫폼 개발 프로젝트입니다.

🔎  **Github   :** [github.com/jun-5/Bon-voyage](https://github.com/jun-5/Bon-voyage)

🔎  Link   **:**[http://www.bon-voyage-trip.com](http://www.bon-voyage-trip.com/)

### Info

---

1. **배경**
    - 여행을 좋아하는 개인적인 성향과 웹 개발이 만난 여행 SNS 프로젝트!
2. **사용 기술**
    - React, Redux(saga), Next.js, Ant Design , Styled Components
    - Node, Express, Mysql, Sequalize
    - AWS EC2, S3, ROUTE 53, Lambda

### Front-End

---

- Ant Design을 사용해서 Form들을 구현 ( 회원가입, 아이디 찾기, 비밀번호 찾기 등)
- React Hooks 사용, React Memo를 사용해 최적화.
- HashTag 기능 구현 (정규식 활용)
- Next를 통한 SSR
- 코드 스플리팅


### 개선 방향

---

- [ ]  회원가입 폼에서 회원가입 누를 시 회원가입 가능 여부에 관계없이 성공이라는 문구 출력 오류
- [ ]  회원가입 검증과정 필요 ex)중복 아이디 검사, 중복 닉네임 검사, 약관동의 검사
- [ ]  Bon voyage! 눌렀을때, About 페이지로 가도록 작성하였으나 불필요하다 판단됨. 타임라인으로 가는게 좋을 것으로 판단.
- [ ]  회원가입 추가기능 EX) SSO (NAVER, GOOGLE, FACEBOOK) 로그인 기능
- [ ]  게시판 게시글 수정기능
- [ ]  일부분 CSS 코드가 인라인 코드로 작성되어 있음
