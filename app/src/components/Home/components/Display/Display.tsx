import React, { useState } from 'react';
import { Avatar, Badge, Card, Col, Row, Typography } from 'antd';
import { HeartOutlined, HeartFilled, StopOutlined, EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import UserInfoHolderComponent from '../../../Profile/components/UserInfoHolder/UserInfoHolder';
import ImageHolder from '../../../Profile/components/ImageHolder/ImageHolder';
import Modal from 'antd/lib/modal/Modal';
import { useRelationshipActions } from 'src/ducks/relationship/actions/relationship';
import { useSearchActions } from 'src/ducks/search/actions/search';
import { useNotificationsActions } from 'src/ducks/notification/actions/notifications';
import { useMessageActions } from 'src/ducks/message/actions/message';

const Display: React.FC<{userList: any, sortedList: any}> = (props) => {
    const [pictures, setPictures] = useState(['']);
    const [profile, setProfile] = useState();
    const [modal, setModal] = useState(false);
    const [blockConfirmation, setBlockConfirmation] = useState(false);
    const user = localStorage.getItem('user');
    const API_URL = process.env.REACT_APP_API_URI;
    
    const { blockUser, likeUser } = useRelationshipActions();
    const { getSearchResult } = useSearchActions();
    const { addNotification } = useNotificationsActions();
    const { setMessage } = useMessageActions();
    
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
      addNotification(user, profile.Username, 'A User checked your profile !');
    }

    const handleCancel = () => {
      setModal(false);
    }

    const handleReport = (element: any) => {
      setMessage('Report is sent for user ' + element.Username + ', we will look into it.');
      blockUser(user, element.Username);
      element.relationship[0].properties.Block = true;
      setTimeout(() => { getSearchResult(user) }, 100);
    }

    const isUrlValid = (testUrl: string) => {
      let url;
      
      try {
        url = new URL(testUrl);
      } catch (_) {
        return false;  
      }
    
      return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleUserList = () => {
      const List = props.sortedList.length > 0 ? props.sortedList : props.userList.userResult;
      if (List.length === 0)
        return ('no user correspond to your criteria');
      return (List.map((element: any, index: number) => (
         element.relationship[0].properties && element.relationship[0].properties.Block  ? null : (
          <Row key={index} style={{ margin: 20}}>
              <Card hoverable
                style={{ width: 300, border: element.relationship[1].properties.Like ? 'solid red 2px' : '',}}
                cover={<img alt={element.Username} src={isUrlValid(element.Pictures[0]) ? element.Pictures[0] : API_URL + '/' + element.Pictures[0]}/>}
                actions={[
                  element.relationship[0].properties.Like ? 
                  <HeartFilled onClick={() => handleLike(element)} key="like"/> :
                  <HeartOutlined onClick={() => handleLike(element)} key="like"/>,
                  <StopOutlined onClick={() => showBlock(element)}key="block"/>, 
                  <ExclamationCircleOutlined onClick={() => handleReport(element)}/>,
                  <EllipsisOutlined key="ellipsis" onClick={() => {handleProfile(element)}}/>
                  ]}>
                  <Card.Meta
                    avatar={element.Online === 0 ? 
                    <Badge dot color='green'>
                      <Avatar src={isUrlValid(element.Pictures[0]) ? element.Pictures[0] : API_URL + '/' + element.Pictures[0]}/>
                    </Badge> : 
                    <Badge dot color='red'>
                      <Avatar src={isUrlValid(element.Pictures[0]) ? element.Pictures[0] : API_URL + '/' + element.Pictures[0]}/>
                    </Badge>}
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