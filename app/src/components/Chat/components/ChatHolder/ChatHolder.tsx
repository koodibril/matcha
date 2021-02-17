import { Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getChatRoom } from '../../../../ducks/chat/actions/chat';

const ChatHolder: React.FC<{info: any}> = (props) => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  const chatRoom = useSelector((state: any) => state.chatRoom)
    
  if (props.info.Username && !init) {
    dispatch(getChatRoom(user, props.info.Username));
    setInit(true);
}

  return (
    <Row>
        HelloThere {props.info.Username}
    </Row>
  )
}

export default ChatHolder;