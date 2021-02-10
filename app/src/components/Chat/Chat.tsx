import React from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';

const Chat: React.FC = () => {
    const user = localStorage.getItem('user');
    const dispatch = useDispatch();
  
    if (!user) dispatch(pushState('/auth'));
    
  return (
    <>
    Chat
    </>
  )
}

export default Chat;