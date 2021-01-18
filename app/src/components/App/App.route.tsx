import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import HomeComponent from '../Home/Home';
import AuthComponent from '../Auth/Auth';
import ProfileComponent from '../Profile/Profile';

const AppRoutes: React.FC = () => (
  <>
    <Route exact path="/home" render={() => <Redirect to="/home/u" />} />
    <Switch>
      <Route path="/home" component={HomeComponent} />
      <Route path="/profile" component={ProfileComponent} />
      <Route path="/auth" component={AuthComponent} />
    </Switch>
  </>
);

export default AppRoutes;