import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import HomeComponent from '../Home/Home';
import AuthComponent from '../Auth/Auth';

const AppRoutes: React.FC = () => (
  <>
    <Route exact path="/home" render={() => <Redirect to="/home/u" />} />
    <Switch>
      <Route path="/home" component={HomeComponent} />
      <Route path="/auth" component={AuthComponent} />
    </Switch>
  </>
);

export default AppRoutes;