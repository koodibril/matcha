import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './store/configure';

import App from './components/App/App';

const AppRoute: React.FC = () => (
  <ConnectedRouter history={history}>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route path="/" component={App} />
  </ConnectedRouter>
);

export default AppRoute;