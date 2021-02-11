import React from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Col, Row } from 'antd';
import FilterComponent from './components/Filter/Filter';
import DisplayComponent from './components/Display/Display';

const Home: React.FC = () => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  if (!user) dispatch(pushState('/auth'));

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(pushState('/'));
  }

  return (
  <Row>
    <Col span={6}>
      <FilterComponent></FilterComponent>
    </Col>
    <Col span={16}>
      <DisplayComponent></DisplayComponent>
    </Col>
  </Row>);
};

export default Home;