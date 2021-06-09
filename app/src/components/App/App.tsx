import React, { useState } from 'react';

import { Layout, Typography } from 'antd';

import Routes from './App.route';

import MainMenu from '../Menu/Menu';

import styles from './App.module.css';
import { whoLetsTheDogsOut } from 'src/ducks/seed/seed';
import { useDispatch } from 'react-redux';

const { Content, Header } = Layout;

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const handleClick = () => {
    setCount(count + 1);
    if (count + 1 === 5)
      dispatch(whoLetsTheDogsOut());
  }

  return (
    <Layout>
      <Header>
        <Typography.Title onClick={handleClick} style={{color: '#fefefe'}}>
          MATCHA + {count}
        </Typography.Title>
      </Header>
      <MainMenu />
      <Content className={styles.content}>
        <Routes />
      </Content>
    </Layout>
  )
}

export default App;