import React, { useState } from 'react';

import { Row, Alert, Typography, Button} from 'antd';
import { HeartOutlined, HeartFilled, StopOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { blockUser, likeUser } from '../../../../ducks/relationship/actions/relationship';

const { Title, Paragraph} = Typography;

const UserInfoHolder: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [blockConfirmation, setBlockConfirmation] = useState(false);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  const message= useSelector((state: any) => state.message);
  const relationship = useSelector((state: any) => state.relationship);
  const info = useSelector((state: any) => state.profile);
  
  if (message && message.message !== '' && visible === false) setVisible(true);

  const handleClose = () => {
    setVisible(false);
    dispatch({ type: 'CLEAR_MESSAGE' });
  };

  const handleLike = () => {
    dispatch(likeUser(user, info.payload.Username));
    console.log('user liked !');
  };

  const handleBlock = () => {
    setBlockConfirmation(false);
    console.log('blocking ' + info.payload.Username);
    dispatch(blockUser(user, info.payload.Username));
    console.log('user blocked !')
  };

  const showModal = () => {
    setBlockConfirmation(true);
  }

  const hideModal = () => {
    setBlockConfirmation(false);
  }

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
      { info.payload && relationship.relationship && relationship.relationship.Block === false ? (
      <Typography>
          <Title>
              { info.payload.Username + ' 24'}
          </Title>
          <Paragraph>
              location
          </Paragraph>
          <Paragraph>
              { info.payload.Bio }
          </Paragraph>
          <Button onClick={handleLike} icon={ relationship.relationship.Like ? <HeartFilled/> : <HeartOutlined/> }>
            like
          </Button>
          <Button onClick={showModal} icon={ <StopOutlined/> }>
            block
          </Button>
          <Modal
          visible={blockConfirmation}
          onOk={handleBlock}
          onCancel={hideModal}
          title={'Are you sure you want to block ' + info.payload.Username}>
            <Paragraph>Are you sure ? If you block this user, 
              his profile will never appear in search result, 
              and won't create any notifications. This action is irreversible.
            </Paragraph>
          </Modal>
      </Typography>) : visible ? errorMessage : null }
    </Row>
  )
}

export default UserInfoHolder;