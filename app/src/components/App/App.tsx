import React from 'react';

import { Layout } from 'antd';

import Routes from './App.route';

import MainMenu from '../Menu/Menu';

import styles from './App.module.css';

const { Content, Header } = Layout;

const App: React.FC = () => (
  <Layout>
    <Header>
      salut
    </Header>
    <MainMenu />
    <Content className={styles.content}>
      <Routes />
    </Content>
  </Layout>
)

export default App;