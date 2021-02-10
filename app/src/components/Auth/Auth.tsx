import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import LoginComponent from './components/Login/Login'
import SignupComponent from './components/Signup/Signup';
import ActivateComponent from './components/Activate/Activate';
import ChangePasswordComponent from './components/ChangePassword/ChangePassword';
import PasswordRecoveryComponent from './components/PasswordRecovery/PasswordRecovery';

const Auth: React.FC = () => {
  useAuth();

  return (
    <>
      <Route exact path="/auth" render={() => <Redirect to="/auth/login" />} />
      <Switch>
        <Route path="/auth/signup" component={SignupComponent} />
        <Route path="/auth/login" component={LoginComponent} />
        <Route path="/auth/activate" component={ActivateComponent} />
        <Route path="/auth/password" component={ChangePasswordComponent} />
        <Route path="/auth/recovery" component={PasswordRecoveryComponent} />
      </Switch>
    </>
  )
}

export default Auth;