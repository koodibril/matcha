import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import LoginComponent from './components/Login/Login'
import SignupComponent from './components/Signup/Signup';
import ActivateComponent from './components/Activate/Activate';

const Auth: React.FC = () => {
  useAuth();

  return (
    <>
      <Route exact path="/auth" render={() => <Redirect to="/auth/login" />} />
      <Switch>
        <Route path="/auth/signup" component={SignupComponent} />
        <Route path="/auth/login" component={LoginComponent} />
        <Route path="/auth/activate" component={ActivateComponent} />
      </Switch>
    </>
  )
}

export default Auth;