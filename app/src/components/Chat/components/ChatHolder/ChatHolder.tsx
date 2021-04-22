import { Row, Input, Form, Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useProfile } from 'src/ducks/profile/actions/profile';

import { useChatActions } from '../../../../ducks/chat/actions/chat';

const ChatHolder: React.FC<{chatRoom: any, user: any}> = (props) => {
  const user = localStorage.getItem('user');

  const { updateChatRoom } = useChatActions();
  const info = useProfile();

  const handleUpdate = (form: any) => {
    updateChatRoom(user, props.user.Username, form.message);
  }

  const handleChatRoom = () => {
    const messages = props.chatRoom;
    return (messages.map((element: any, index: number) => (
      <Row key={index} justify={info.payload.Username === element.username ? "end" : "start"} style={{margin: 20, width: '100%'}}>
        <Card actions={[<Row>{element.date}</Row>]}>
          <Card.Meta
            avatar={element.username === info.payload.Username ? 
            <Avatar src={'http://localhost:3001/' + info.payload.Pictures[0]}/> :
            <Avatar src={'http://localhost:3001/' + props.user.Pictures[0]}/>}
            title={element.username}
            description={element.text}>
          </Card.Meta>
        </Card>
      </Row>
    )));
  }

  return (
    props.chatRoom && props.user ? (
    <>
      { handleChatRoom() }
      <Row>
        <Form
        style={{width: '100%'}}
        onFinish={handleUpdate}>
          <Form.Item
          name="message">
            <Input></Input>
          </Form.Item>
        </Form>
      </Row>
    </>) : <>Select your match to chat with him !</>
  )
}

export default ChatHolder;