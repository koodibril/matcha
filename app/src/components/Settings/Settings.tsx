import React from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Row } from 'antd';

const Settings: React.FC = () => {
    const user = localStorage.getItem('user');
    const dispatch = useDispatch();
  
    if (!user) dispatch(pushState('/auth'));
    
  return (
    <>
        <Row>
            Change password/username/email
        </Row>
    </>
  )
}

export default Settings;