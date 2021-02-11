import React, { useEffect, useState } from 'react';

import ImageHolderComponent from './components/ImageHolder/ImageHolder'
import UpdateUserInformationComponent from './components/UpdateUserInformation/UpdateUserInformation';
import UserInfoHolderComponent from './components/UserInfoHolder/UserInfoHolder';
import { useDispatch, useSelector } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { getProfileInfo } from '../../ducks/profile/actions/profile';
import { Row } from 'antd';
import { getRelationship } from '../../ducks/relationship/actions/relationship';

const Profile: React.FC = () => {
  const [reading, setReading] = useState(false);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const info = useSelector((state: any) => state.profile);

  if (!user) dispatch(pushState('/auth'));
  
  useEffect(() => {
    const path = window.location.pathname.split('/');
    if (path.length === 3 && path[1] === 'profile') {
      setReading(true);
      dispatch(getProfileInfo(user, path[2]));
      dispatch(getRelationship(user, path[2]));
    } else if (user) dispatch(getProfileInfo(user, null));
  }, [user, dispatch]);

  const updateInfo = (
    <Row justify="center" align="middle">
        <UpdateUserInformationComponent></UpdateUserInformationComponent>
    </Row>);

  const readInfo = (
    <Row justify="center" align="middle">
        { info && info.payload ? <UserInfoHolderComponent info={info}></UserInfoHolderComponent> : null}
    </Row>);

  return (
    <>
      <Row justify="center" align="middle">
          <ImageHolderComponent reading={reading}></ImageHolderComponent>
      </Row>
      { reading ? readInfo : updateInfo }
    </>
  )
}

export default Profile;