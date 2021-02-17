import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Col, Row } from 'antd';
import ImageHolder from '../Profile/components/ImageHolder/ImageHolder';
import UserInfoHolderComponent from '../Profile/components/UserInfoHolder/UserInfoHolder';
import ChatHolderComponent from './components/ChatHolder/ChatHolder';
import { getMatchedProfiles } from '../../ducks/chat/actions/chat';

const Chat: React.FC = () => {
    const [chat, setChat] = useState('');
    const [selected, setSelected] = useState(-1);
    const user = localStorage.getItem('user');
    const dispatch = useDispatch();
    const userList = useSelector((state: any) => state.chat);
  
    if (!user) dispatch(pushState('/auth'));

    useEffect(() => {
      dispatch(getMatchedProfiles(user));
    }, [user, dispatch]);

    const loadChat = (element: any, index: any) => {
      setChat(element);
      setSelected(index);
    }

    const handleUserList = () => {
      const List = userList.userResult;
      return (List.map((element: any, index: number) => (
          <Row 
            key={index} 
            style={{backgroundColor: index === selected ? 'lightgray' : ''}} 
            onClick={() => {loadChat(element, index)}}>
            <ImageHolder pictures={element.Pictures} reading={true}></ImageHolder>
            <UserInfoHolderComponent info={element}/>
          </Row>
      )));
    }
    
  return (
    <Row justify="center" align="middle">
      <Col span={6}>
        { userList.userResult ? handleUserList() : null}
      </Col>
      <Col span={16}>
        <ChatHolderComponent info={chat}></ChatHolderComponent>
      </Col>
    </Row>
  )
}

export default Chat;