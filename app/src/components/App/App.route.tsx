import React from "react";

import { Route, Switch } from "react-router-dom";

import HomeComponent from "../Home/Home";
import AuthComponent from "../Auth/Auth";
import ProfileComponent from "../Profile/Profile";
import SettingsComponent from "../Settings/Settings";
import ChatComponent from "../Chat/Chat";
import NotificationsComponent from "../Notifications/Notifications";

const AppRoutes: React.FC = () => (
  <>
    <Switch>
      <Route path="/home" component={HomeComponent} />
      <Route path="/profile" component={ProfileComponent} />
      <Route path="/chat" component={ChatComponent} />
      <Route path="/notifications" component={NotificationsComponent} />
      <Route path="/settings" component={SettingsComponent} />
      <Route path="/auth" component={AuthComponent} />
    </Switch>
  </>
);

export default AppRoutes;

