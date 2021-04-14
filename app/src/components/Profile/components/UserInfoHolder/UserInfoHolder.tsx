import React, { useState } from 'react';

import { Row, Typography, Button} from 'antd';
import { HeartOutlined, HeartFilled, StopOutlined } from '@ant-design/icons';

import Modal from 'antd/lib/modal/Modal';
import { useRelationshipActions } from '../../../../ducks/relationship/actions/relationship';

const { Title, Paragraph} = Typography;

const UserInfoHolder: React.FC<{info: any}> = (props) => {
  const [liked, setLiked] = useState(false);
  const [blockConfirmation, setBlockConfirmation] = useState(false);
  const [init, setInit] = useState(false);
  const user = localStorage.getItem('user');

  const { blockUser, likeUser } = useRelationshipActions();

  if (props.info.relationship && props.info.relationship.properties && !init) {
    setLiked(props.info.relationship.properties.Like);
    setInit(true);
  }

  const handleLike = () => {
    likeUser(user, props.info.Username);
    liked ? setLiked(false) : setLiked(true);
  };

  const handleBlock = () => {
    setBlockConfirmation(false);
    blockUser(user, props.info.Username);
  };

  const showModal = () => {
    setBlockConfirmation(true);
  }

  const hideModal = () => {
    setBlockConfirmation(false);
  }

  return (
    <Row>
      { props.info ? (
      <Typography>
          <Title>
              { props.info.Username + ' 24'}
          </Title>
          <Paragraph>
              Distance: { props.info.Distance } km
          </Paragraph>
          <Paragraph>
              { props.info.Bio }
          </Paragraph>
          <Button onClick={handleLike} icon={ liked ? <HeartFilled/> : <HeartOutlined/> }>
            like
          </Button>
          <Button onClick={showModal} icon={ <StopOutlined/> }>
            block
          </Button>
          <Modal
          visible={blockConfirmation}
          onOk={handleBlock}
          onCancel={hideModal}
          title={'Are you sure you want to block ' + props.info.Username}>
            <Paragraph>Are you sure ? If you block this user, 
              his profile will never appear in search result, 
              and won't create any notifications. This action is irreversible.
            </Paragraph>
          </Modal>
      </Typography>) : null }
    </Row>
  )
}

export default UserInfoHolder;