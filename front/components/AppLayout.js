import React, {useCallback} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Input, Menu, Row, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import LoginForm from '../containers/LoginForm';
import UserProfile from '../containers/UserProfile';
import MenuItem from 'antd/lib/menu/MenuItem';
import { LOG_OUT_REQUEST } from '../reducers/user';


const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSearch = (value) => {
    Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
  };

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);
  

  return (
    <div style={{backgroundColor:'#CEE3F6' }}>
      <Menu style={{backgroundColor:'#CEE3F6', paddingBottom:'20px'}} > 
        <Menu.Item key="Intro" style={{textAlign: 'center', fontsize:'60px',marginBottom:'20px', marginTop:'30px' }}>
        <Link href="/about"><a style={{  color:'#0B173B' ,backgroundColor:'#CEE3F6', fontWeight: 'bold'}}>
          <div className="icons-list" style={{  lineHeight:'0.7',fontSize:'40px', fontWeight:'bold', paddingBottom:'60px', marginBottom:'60px'}}>
          <Icon type="crown" style={{fontSize:'30px', fontWeight:'bold', color:'yellow'}}/>
          Bon Voyage! 
          <Icon type="crown" style={{fontSize:'30px', fontWeight:'bold', color:'yellow'}}/>

  </div></a></Link></Menu.Item>
        <br/></Menu>

      <Menu mode="horizontal"style={{backgroundColor:'#CEE3F6', marginLeft:'20px', paddingLeft:'20px'}}>
        <Menu.Item key="home" style={{marginRight:'30px', fontWeight:'bold', fontSize:'15px',color:"#045FB4", border:'2px solid #045FB4'}}><Link href="/"><a>타임라인</a></Link></Menu.Item>
        <Menu.Item key="profile" style={{marginRight:'30px', fontWeight:'bold', fontSize:'15px', border:'2px solid #045FB4',color:"#045FB4"}}><Link href="/profile" prefetch>
        {me?
        <a>내 정보</a>
        :  <div>로그인</div>}
        </Link></Menu.Item>
  
        <Menu.Item key="mail" style={{marginRight:'30px', fontWeight:'bold', fontSize:'15px',color:"#045FB4"}}>
          <Input.Search style={{color:'#045FB4'}}
            enterButton
            placeholder="HashTag Search"
            style={{ verticalAlign: 'middle', color:'#045FB4' }}
            onSearch={onSearch}

          />
        </Menu.Item>
        <Menu.Item key="nickname" style={{marginLeft:'500px', fontWeight:'bold', fontSize:'15px', borderColor:'#045FB4',color:"#045FB4"}}><div>{me&&me.nickname}</div></Menu.Item>
        <Menu.Item key="posts" style={{marginLeft:'15px',marginRight:'15px', fontWeight:'bold', fontSize:'15px', borderColor:'#045FB4',color:"#045FB4"}}><div>게시글 {me&&me.Posts.length}</div></Menu.Item>   
        <Menu.Item key="follow" style={{marginRight:'15px', fontWeight:'bold', fontSize:'15px', borderColor:'#045FB4',color:"#045FB4"}}><div>팔로잉 {me&&me.Followings.length}</div></Menu.Item>   
        <Menu.Item key="follower" style={{marginRight:'15px', fontWeight:'bold', fontSize:'15px', borderColor:'#045FB4',color:"#045FB4"}}><div>팔로워 {me&&me.Followers.length}</div></Menu.Item>   
   
        <Menu.Item key="Logout" style={{marginLeft:'0px', fontWeight:'bold', fontSize:'15px', borderColor:'#045FB4',color:"#045FB4"}}>{me
        ?
        <div onClick={onLogout}>로그아웃</div>
        :
        <div>로그인</div>
        }
        </Menu.Item> 
      
      </Menu>
      <Row gutter={8} style={{backgroundColor:'#CEE3F6', verticalAlign: 'middle'}} >
        <Col xs={24} md={4}>
          {me
          ?
             <UserProfile/>
            : <LoginForm />}
        </Col>
        <Col xs={24} md={16}>
          {children}
        </Col>
        <Col xs={24} md={4}>
          <Link href="https://github.com/jun-5"><a target="_blank">
          <Icon type="github" style={{fontSize:'30px', fontWeight:'bold', color:'green'}}/>
            Made by 쭌호</a></Link>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
