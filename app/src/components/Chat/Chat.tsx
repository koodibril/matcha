import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import ImageHolder from '../Profile/components/ImageHolder/ImageHolder';
import UserInfoHolderComponent from '../Profile/components/UserInfoHolder/UserInfoHolder';
import ChatHolderComponent from './components/ChatHolder/ChatHolder';
import { useChat, useChatActions, useChatRoom } from '../../ducks/chat/actions/chat';
import { useNavigation } from 'src/ducks/navigation/navigation';

const Chat: React.FC = () => {
    const [username, setUsername] = useState('');
    const [selected, setSelected] = useState(-1);
    const user = localStorage.getItem('user');

    const userList = useChat();
    const chatRoom = useChatRoom();
    const { pushState } = useNavigation();
    const { getMatchedProfiles, getChatRoom } = useChatActions();
  
    if (!user) pushState('/auth');

    useEffect(() => {
      getMatchedProfiles(user);
    }, [user, getMatchedProfiles]);

    const loadChat = (element: any, index: any) => {
      setUsername(element.Username);
      getChatRoom(user, element.Username);
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
        <ChatHolderComponent chatRoom={chatRoom.chatRoom} username={username}></ChatHolderComponent>
      </Col>
    </Row>
  )
}

export default Chat;