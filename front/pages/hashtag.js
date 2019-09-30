import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();

  const { mainPosts, hasMorePost } = useSelector(state => state.post);

  const onScroll = useCallback(() => { //useCallback을 활용한 최적화
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
          data: tag,
        });
      }
    }
  }, [hasMorePost, mainPosts.length]); //deps에 꼭 사용한 함수, 프랍스를 넣어줘야한다 캐싱문제 해결

  useEffect(() => { //React의 ComponetDidMount기능 수행 Hooks에서는 useEffect
    window.addEventListener('scroll', onScroll); 
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]); //캐싱문제 해결을 위하여 deps 필수

//위 함수는 인피니티 스크롤링을 위하여 onScroll 이벤트 리스너를 추가한 것

  return (
    <div>
      {mainPosts.map(c => ( //ES6 적용문법 배열을 입력값으로 받음
        <PostCard key={c.id} post={c} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async (context) => {
  const tag = context.query.tag;
  console.log('hashtag getInitialProps', tag);
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  return { tag };
};

export default Hashtag;
