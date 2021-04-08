import React from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Row } from 'antd';
import FormComponent from './components/FormSettings';

const Settings: React.FC = () => {
    const user = localStorage.getItem('user');
    const dispatch = useDispatch();
  
    if (!user) dispatch(pushState('/auth'));
    
  return (
        <Row justify="center" align="middle">
            <FormComponent></FormComponent>
        </Row>
  )
}

export default Settings;