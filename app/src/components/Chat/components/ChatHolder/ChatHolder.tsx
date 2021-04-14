import { Row, Input, Form } from 'antd';
import React from 'react';

import { useChatActions } from '../../../../ducks/chat/actions/chat';

const ChatHolder: React.FC<{chatRoom: any, username: string}> = (props) => {
  const user = localStorage.getItem('user');

  const { updateChatRoom } = useChatActions();

  const handleUpdate = (form: any) => {
    updateChatRoom(user, props.username, form.message);
  }

  const handleChatRoom = () => {
    const messages = props.chatRoom;
    return (messages.map((element: any, index: number) => (
      <Row key={index}>
        USER : {element.username} DATE: {element.date} TEXT: {element.text}
      </Row>
    )));
  }

  return (
    props.chatRoom ? (
    <Row>
      { handleChatRoom() }
        <Form
        onFinish={handleUpdate}>
          <Form.Item
          name="message"
          label="message">
            <Input></Input>
          </Form.Item>
        </Form>
    </Row>) : <>Select your match to chat with him !</>
  )
}

export default ChatHolder;