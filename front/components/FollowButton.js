import React, { memo } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const FollowButton = memo(({ post, onUnfollow, onFollow }) => {
  const { me } = useSelector(state => state.user);
  return !me || post.User.id === me.id
    ? null
    : me.Followings && me.Followings.find(v => v.id === post.User.id)
      ? <Button style={{color:'black',fontWeight:'bold'}} onClick={onUnfollow(post.User.id)}>언팔로우</Button>
      : <Button style={{color:'black',fontWeight:'bold'}} onClick={onFollow(post.User.id)}>팔로우</Button>;
});

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  onFollow: PropTypes.func.isRequired,
};

export default FollowButton;
