import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ImageHolderComponent from './components/ImageHolder/ImageHolder'
import UserInformationComponent from './components/UserInformation/UserInformation';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';

const Profile: React.FC = () => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  if (!user) dispatch(pushState('/auth'));

  return (
    <>
      <ImageHolderComponent></ImageHolderComponent>
      <UserInformationComponent></UserInformationComponent>
    </>
  )
}

export default Profile;