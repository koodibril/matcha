import React, { useState } from 'react';

import { Row, Typography, Button} from 'antd';
import { HeartOutlined, HeartFilled, StopOutlined } from '@ant-design/icons';

import Modal from 'antd/lib/modal/Modal';
import { useRelationshipActions } from '../../../../ducks/relationship/actions/relationship';
import { useSearchActions } from 'src/ducks/search/actions/search';

const { Title, Paragraph} = Typography;

const UserInfoHolder: React.FC<{info: any}> = (props) => {
  const [blockConfirmation, setBlockConfirmation] = useState(false);
  const user = localStorage.getItem('user');

  const { blockUser, likeUser } = useRelationshipActions();
  const { getSearchResult } = useSearchActions();

  const handleLike = () => {
    likeUser(user, props.info.Username);
    setTimeout(() => { getSearchResult(user) }, 100);
  };

  const handleBlock = () => {
    setBlockConfirmation(false);
    blockUser(user, props.info.Username);
    setTimeout(() => { getSearchResult(user) }, 100);
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
              { props.info.Username + ' ' + props.info.Age}
          </Title>
          <Paragraph>
              Distance: { props.info.Distance } km
          </Paragraph>
          <Paragraph>
              { props.info.Bio }
          </Paragraph>
          <Button onClick={handleLike} icon={ props.info.relationship.properties.Like ? <HeartFilled/> : <HeartOutlined/> }>
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