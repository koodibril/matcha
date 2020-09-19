import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomeComponent from '../Home/Home';
import AuthComponent from '../Auth/Auth';

const Routes: React.FC = () => (
  <>
    <Route exact path="/home" render={() => <Redirect to="/home/u" />} />
    <Switch>
      <Route path="/home" component={HomeComponent} />
      <Route path="/auth" component={AuthComponent} />
    </Switch>
  </>
)

const App: React.FC = () => (
  <div>
    <Routes />
  </div>
)

export default App;