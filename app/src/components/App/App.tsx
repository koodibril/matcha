import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';

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
);

const { Content } = Layout;

const App: React.FC = () => (
  <Layout>
    <Content style={{
      minHeight: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    }}>
      <Routes />
    </Content>
  </Layout>
)

export default App;