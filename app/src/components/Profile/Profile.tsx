import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ImageHolderComponent from './components/ImageHolder/ImageHolder'
import UserInformationComponent from './components/UserInformation/UserInformation';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { getProfileInfo } from '../../ducks/profile/actions/profile';

const Profile: React.FC = () => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  if (!user) dispatch(pushState('/auth'));
  
  useEffect(() => {
    const path = window.location.pathname.split('/');
    if (path.length === 3) {
      dispatch(getProfileInfo(path[2]));
    } else if (user) dispatch(getProfileInfo(user));
  }, []);

  return (
    <>
      <ImageHolderComponent></ImageHolderComponent>
      <UserInformationComponent></UserInformationComponent>
    </>
  )
}

export default Profile;