import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Divider, Modal, Row, Typography } from 'antd';
import { HeartOutlined, HeartFilled, StopOutlined, EllipsisOutlined } from '@ant-design/icons';
import ChatHolderComponent from './components/ChatHolder/ChatHolder';
import { useChat, useChatActions, useChatRoom } from '../../ducks/chat/actions/chat';
import { useNavigation } from 'src/ducks/navigation/navigation';
import Avatar from 'antd/lib/avatar/avatar';
import UserInfoHolderComponent from '../Profile/components/UserInfoHolder/UserInfoHolder';
import ImageHolder from '../Profile/components/ImageHolder/ImageHolder';
import { useRelationshipActions } from 'src/ducks/relationship/actions/relationship';
import { useProfileActions } from 'src/ducks/profile/actions/profile';

const Chat: React.FC = () => {
    const [pictures, setPictures] = useState(['']);
    const [profile, setProfile] = useState();
    const [modal, setModal] = useState(false);
    const [blockConfirmation, setBlockConfirmation] = useState(false);
    const user = localStorage.getItem('user');

    const userList = useChat();
    const chatRoom = useChatRoom();
    const { pushState } = useNavigation();
    const { getMatchedProfiles, getChatRoom } = useChatActions();
    const { blockUser, likeUser } = useRelationshipActions();
    const { getProfileInfo } = useProfileActions();
  
    if (!user) pushState('/auth');

    useEffect(() => {
      if (user) {
        getMatchedProfiles(user);
        getProfileInfo(user, null);
      }
    }, [user, getMatchedProfiles, getProfileInfo]);

    const loadChat = (element: any) => {
      setProfile(element);
      getChatRoom(user, element.Username);
    }

    const handleLike = (element: any) => {
      likeUser(user, element.Username);
      setTimeout(() => { getMatchedProfiles(user) }, 100);
    };
  
    const handleBlock = (element: any) => {
      setBlockConfirmation(false);
      blockUser(user, element.Username);
      setTimeout(() => { getMatchedProfiles(user) }, 100);
    };
  
    const showBlock = (element: any) => {
      setProfile(element);
      setBlockConfirmation(true);
    }
    
    const handleProfile = (profile: any) => {
      setPictures(profile.Pictures);
      setProfile(profile);
      setModal(true);
    }

    const handleUserList = () => {
      const List = userList.userResult;
      return (List.map((element: any, index: number) => (
        <Row key={index} style={{ margin: 20}}>
          <Card hoverable
            onClick={() => loadChat(element)}
            actions={[
              element.relationship.properties.Like ? 
              <HeartFilled onClick={() => handleLike(element)} key="like"/> :
              <HeartOutlined onClick={() => handleLike(element)} key="like"/>,
              <StopOutlined onClick={() => showBlock(element)}key="block"/>, 
              <EllipsisOutlined key="ellipsis" onClick={() => {handleProfile(element)}}/>
              ]}>
              <Card.Meta
                avatar={element.Online === 0 ? <Badge dot color='green'><Avatar src={'http://localhost:3001/' + element.Pictures[0]}/></Badge> : <Badge dot color='red'><Avatar src={'http://localhost:3001/' + element.Pictures[0]}/></Badge>}
                title={element.Username}
                description={element.Bio}/>
          </Card>
        </Row>
      )));
    }
    
  return (
    <Row justify="center" style={{height: "600px"}}>
      <Col span={6}>
        { userList.userResult ? handleUserList() : null}
      </Col>
      <Divider type="vertical" style={{width: '3px', height: '500px', marginTop: '50px'}}/>
      <Col span={16} style={{height: "600px", width: '100%'}}>
        { profile ? <ChatHolderComponent chatRoom={chatRoom.chatRoom} user={profile}></ChatHolderComponent> : null }
      </Col>
      <Modal
        closable={true}
        visible={modal}
        footer={null}
        title={null}
        onCancel={() => setModal(false)}>
        <ImageHolder reading={true} pictures={pictures}></ImageHolder>
        <UserInfoHolderComponent info={profile}></UserInfoHolderComponent>
      </Modal>
      <Modal
          visible={blockConfirmation}
          onOk={() => handleBlock(profile)}
          onCancel={() => setBlockConfirmation(false)}
          title={'Are you sure you want to block this user ?'}>
            <Typography>
              <Typography.Paragraph>Are you sure ? If you block this user, 
                his profile will never appear in search result, 
                and won't create any notifications. This action is irreversible.
              </Typography.Paragraph>
            </Typography>
      </Modal>
    </Row>
  )
}

export default Chat;