import React, { useState } from 'react';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import { HeartOutlined, HeartFilled, StopOutlined, EllipsisOutlined } from '@ant-design/icons';
import UserInfoHolderComponent from '../../../Profile/components/UserInfoHolder/UserInfoHolder';
import ImageHolder from '../../../Profile/components/ImageHolder/ImageHolder';
import Modal from 'antd/lib/modal/Modal';
import { useRelationshipActions } from 'src/ducks/relationship/actions/relationship';
import { useSearchActions } from 'src/ducks/search/actions/search';

const Display: React.FC<{userList: any}> = (props) => {
    const [pictures, setPictures] = useState(['']);
    const [profile, setProfile] = useState();
    const [modal, setModal] = useState(false);
    const [blockConfirmation, setBlockConfirmation] = useState(false);
    const user = localStorage.getItem('user');
    
    const { blockUser, likeUser } = useRelationshipActions();
    const { getSearchResult } = useSearchActions();
    
    const handleLike = (element: any) => {
      likeUser(user, element.Username);
      setTimeout(() => { getSearchResult(user) }, 100);
    };

    const handleBlock = (element: any) => {
      setBlockConfirmation(false);
      blockUser(user, element.Username);
      setTimeout(() => { getSearchResult(user) }, 100);
    };

    const showBlock = (element: any) => {
      setProfile(element);
      setBlockConfirmation(true);
    }

    const hideBlock = () => {
      setBlockConfirmation(false);
    }

    const handleProfile = (profile: any) => {
      setPictures(profile.Pictures);
      setProfile(profile);
      setModal(true);
    }

    const handleCancel = () => {
      setModal(false);
    }

    const handleUserList = () => {
      const List = props.userList.userResult;
      if (List.length === 0)
        return ('no user correspond to your criteria');
      return (List.map((element: any, index: number) => (
         element.relationship.properties && element.relationship.properties.Block  ? null : (
          <Row key={index} style={{ margin: 20}}>
              <Card hoverable
                style={{ width: 300 }}
                cover={<img alt={element.Username} src={'http://localhost:3001/' + element.Pictures[0]}/>}
                actions={[
                  element.relationship.properties.Like ? 
                  <HeartFilled onClick={() => handleLike(element)} key="like"/> :
                  <HeartOutlined onClick={() => handleLike(element)} key="like"/>,
                  <StopOutlined onClick={() => showBlock(element)}key="block"/>, 
                  <EllipsisOutlined key="ellipsis" onClick={() => {handleProfile(element)}}/>
                  ]}>
                  <Card.Meta
                    avatar={<Avatar src={'http://localhost:3001/' + element.Pictures[0]}/>}
                    title={element.Username}
                    description={element.Bio}/>
              </Card>
          </Row>)
      )));
    }

  return (
    <Row>
      <Col>
        { props.userList.userResult ? handleUserList() : null }
      </Col>
      <Modal
        closable={true}
        visible={modal}
        footer={null}
        title={null}
        onCancel={handleCancel}>
        <ImageHolder reading={true} pictures={pictures}></ImageHolder>
        <UserInfoHolderComponent info={profile}></UserInfoHolderComponent>
      </Modal>
      <Modal
          visible={blockConfirmation}
          onOk={() => handleBlock(profile)}
          onCancel={hideBlock}
          title={'Are you sure you want to block this user ?'}>
            <Typography>
              <Typography.Paragraph>Are you sure ? If you block this user, 
                his profile will never appear in search result, 
                and won't create any notifications. This action is irreversible.
              </Typography.Paragraph>
            </Typography>
      </Modal>
    </Row>
  );
};

export default Display;