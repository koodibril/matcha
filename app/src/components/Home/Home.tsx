import React from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Row } from 'antd';
import DisplayComponent from './components/Display/Display';

const Home: React.FC = () => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  if (!user) dispatch(pushState('/auth'));

  return (
  <Row justify="center" align="middle">
      <DisplayComponent></DisplayComponent>
  </Row>);
};

export default Home;