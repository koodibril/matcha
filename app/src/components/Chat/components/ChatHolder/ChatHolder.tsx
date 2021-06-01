import { Row, Input, Card, Badge } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useProfile } from 'src/ducks/profile/actions/profile';
import './ChatHolder.css';

import { useChatActions } from '../../../../ducks/chat/actions/chat';
import { socket } from '../../../../hooks/useSocket';

const ChatHolder: React.FC<{chatRoom: any, user: any}> = (props) => {
  const [message, setMessage] = useState('');
  const bottom = useRef() as MutableRefObject<HTMLDivElement>;
  const user = localStorage.getItem('user');

  const { updateChatRoom, getChatRoom } = useChatActions();
  const info = useProfile();

  const handleUpdate = (message: string) => {
    if (message !== '')
      updateChatRoom(user, props.user.Username, message);
    setTimeout(() => {bottom.current.scrollIntoView()}, 100);
  }

  const handleInput = () => {
    handleUpdate(message);
    setMessage('');
  }

  useEffect(() => {
    if (user) {
      socket.on("newmessage", () => {
        getChatRoom(user, props.user.Username);
      setTimeout(() => {bottom.current.scrollIntoView()}, 100);
      });
    }
  }, [user, getChatRoom, props.user.Username, bottom]);

  const handleChatRoom = () => {
      const chat = props.chatRoom;
      return (chat.map((element: any, index: number) => (
        <Row key={index} justify={info.payload.Username === element.username ? "end" : "start"} style={{width: '100%'}}>
          <Card style={{padding: 10, marginTop: 10, marginBottom: 10, maxWidth: "80%"}} actions={[<Row>{element.date}</Row>]}>
            <Card.Meta style={{marginBottom: 20}}
              avatar={element.username === info.payload.Username ?
                  <Badge dot color='green'><Avatar src={'http://localhost:3001/' + info.payload.Pictures[0]}/></Badge>
              :
                (props.user.Online === 0 ? 
                  <Badge dot color='green'><Avatar src={'http://localhost:3001/' + props.user.Pictures[0]}/></Badge> : 
                  <Badge dot color='red'><Avatar src={'http://localhost:3001/' + props.user.Pictures[0]}/></Badge>)}
              title={element.username}>
            </Card.Meta>
              <p>{element.text}</p>
          </Card>
        </Row>
      )));
  }

  return (
    props.chatRoom && props.user ? (
    <>
      <Row style={{height: "550px", width: '100%', overflowY: 'scroll'}}>
        { handleChatRoom() }
        { handleUpdate('') }
        <Row ref={bottom}/>
      </Row>
      <Row>
        <Input 
          allowClear 
          size="large" 
          value={message || ''} 
          onChange={(e) => {setMessage(e.target.value)}}
          onPressEnter={handleInput}
          ></Input>
      </Row>
    </>) : <Row justify="center" align="middle">Select your match to chat with him !</Row>
  )
}

export default ChatHolder;