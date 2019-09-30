import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Post = ({ id }) => {
  const { singlePost } = useSelector(state => state.post);
  return (
    <>
      <Helmet      //React Helmet을 이용하여 헤드태그 조작 카카오톡에서 공유해보면 요부분이 이미지,이름을 담당
        title={`${singlePost.User.nickname}님의 글`}
        description={singlePost.content}
        meta={[{
          name: 'description', content: singlePost.content,
        }, {
          property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`,
        }, {
          property: 'og:description', content: singlePost.content,
        }, {
          property: 'og:image', content: singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.jpg',
        }, {
          property: 'og:url', content: `http://bon-voyage-trip.com/post/${id}`,
        }]}
      />
      <div itemScope="content">{singlePost.content}</div>
      <div itemScope="author">{singlePost.User.nickname}</div>
      <div>
        {singlePost.Images[0] && <img src={singlePost.Images[0].src} />}
      </div>
    </>
  );
};

Post.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id,
  });
  return { id: parseInt(context.query.id, 10) };
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Post;
