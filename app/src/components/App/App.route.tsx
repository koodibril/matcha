import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import HomeComponent from '../Home/Home';
import AuthComponent from '../Auth/Auth';
import ProfileComponent from '../Profile/Profile';
import SettingsComponent from '../Settings/Settings';
import SearchComponent from '../Search/Search';
import ChatComponent from '../Chat/Chat';
import NotificationsComponent from '../Notifications/Notifications';


const AppRoutes: React.FC = () => (
  <>
    <Route exact path="/home" render={() => <Redirect to="/home/u" />} />
    <Switch>
      <Route path="/home" component={HomeComponent} />
      <Route path="/profile" component={ProfileComponent} />
      <Route path="/search" component={SearchComponent} />
      <Route path="/chat" component={ChatComponent} />
      <Route path="/notifications" component={NotificationsComponent} />
      <Route path="/settings" component={SettingsComponent} />
      <Route path="/auth" component={AuthComponent} />
    </Switch>
  </>
);

export default AppRoutes;