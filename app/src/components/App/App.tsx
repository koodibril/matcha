import React from 'react';

import { Layout } from 'antd';

import Routes from './App.route';

import styles from './App.module.css';

const { Content } = Layout;

const App: React.FC = () => (
  <Layout>
    <Content className={styles.content}>
      <Routes />
    </Content>
  </Layout>
)

export default App;