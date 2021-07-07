import React, { useEffect, useState } from 'react';

import ImageHolderComponent from './components/ImageHolder/ImageHolder'
import UpdateUserInformationComponent from './components/UpdateUserInformation/UpdateUserInformation';
import UserInfoHolderComponent from './components/UserInfoHolder/UserInfoHolder';
import { useProfile, useProfileActions } from '../../ducks/profile/actions/profile';
import { Row } from 'antd';
import { useRelationshipActions } from '../../ducks/relationship/actions/relationship';
import { Redirect } from 'react-router';

const Profile: React.FC = () => {
  const [reading, setReading] = useState(false);
  const user = localStorage.getItem('user');
  
  const info = useProfile();
  const { getProfileInfo } = useProfileActions();
  const { getRelationship } = useRelationshipActions();

  
  useEffect(() => {
    const path = window.location.pathname.split('/');
    if (path.length === 3 && path[1] === 'profile') {
      setReading(true);
      getProfileInfo(user, path[2]);
      getRelationship(user, path[2]);
    } else if (user) getProfileInfo(user, null);
  }, [user, getProfileInfo, getRelationship]);

  const updateInfo = (
    <Row justify="center" align="middle">
        { info && info.payload ? <UpdateUserInformationComponent info={info.payload}></UpdateUserInformationComponent> : null}
    </Row>);

  const readInfo = (
    <Row justify="center" align="middle">
        { info && info.payload ? <UserInfoHolderComponent info={info.payload}></UserInfoHolderComponent> : null}
    </Row>);

  if (user == null) return (<Redirect to="/auth"></Redirect>);

  return ( info && info.payload ?
    <> 
      <Row justify="center" align="middle">
          <ImageHolderComponent pictures={info.payload.Pictures} reading={reading}></ImageHolderComponent>
      </Row>
      { reading ? readInfo : updateInfo }
    </>
  : null)
}

export default Profile;