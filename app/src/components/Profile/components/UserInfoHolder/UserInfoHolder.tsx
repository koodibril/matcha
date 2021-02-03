import React, { useState } from 'react';

import { Row, Alert, Typography} from 'antd';

import { useDispatch, useSelector } from 'react-redux';

const { Title, Paragraph} = Typography;

const UserInfoHolder: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const message= useSelector((state: any) => state.message);

  const info = useSelector((state: any) => state.profile);
  
  if (message && message.message !== '' && visible === false) setVisible(true);

  const handleClose = () => {
    setVisible(false);
    dispatch({ type: 'CLEAR_MESSAGE' });
  };

  const errorMessage = (
    <Alert 
      style={{ margin: '16px 0' }} 
      message={ message.message } 
      type="error" 
      closable 
      afterClose={handleClose}/>
  );

  return (
    <Row>
      { info.payload ? (
      <Typography>
          <Title>
              { info.payload.Username + ' 24'}
          </Title>
          <Paragraph>
              location
          </Paragraph>
          <Paragraph>
              Description
          </Paragraph>
      </Typography>) : visible ? errorMessage : null }
    </Row>
  )
}

export default UserInfoHolder;