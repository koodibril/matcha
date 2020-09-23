import React from 'react';

import { Layout } from 'antd';

import Routes from './App.route';

import styles from './App.module.css';

const { Content, Header } = Layout;

const App: React.FC = () => (
  <Layout>
    <Header>
      salut
    </Header>
    <Content className={styles.content}>
      <Routes />
    </Content>
  </Layout>
)

export default App;