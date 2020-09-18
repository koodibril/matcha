import React from 'react';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './store/configure';

import AppContainer from './containers/AppContainer/AppContainer';

const AppRoute: React.FC = () => (
  <ConnectedRouter history={history}>
    <Route path="/" component={AppContainer} />
  </ConnectedRouter>
);

export default AppRoute;