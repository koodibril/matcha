import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import LoginComponent from './components/Login/Login'
import SignupComponent from './components/Signup/Signup';

const Auth: React.FC = () => {
  useAuth();

  return (
    <>
      <Route exact path="/auth" render={() => <Redirect to="/auth/login" />} />
      <Switch>
        <Route path="/auth/signup" component={SignupComponent} />
        <Route path="/auth/login" component={LoginComponent} />
      </Switch>
    </>
  )
}

export default Auth;