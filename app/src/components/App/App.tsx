import React from 'react';

import { Layout, Typography } from 'antd';

import Routes from './App.route';

import MainMenu from '../Menu/Menu';

import styles from './App.module.css';

const { Content, Header } = Layout;

const App: React.FC = () => (
  <Layout>
    <Header>
      <Typography.Title style={{color: '#fefefe'}}>
        MATCHA
      </Typography.Title>
    </Header>
    <MainMenu />
    <Content className={styles.content}>
      <Routes />
    </Content>
  </Layout>
)

export default App;