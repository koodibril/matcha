import React from 'react';
import { Col, Row } from 'antd';
import FilterComponent from './components/Filter/Filter';
import DisplayComponent from './components/Display/Display';
import { useNavigation } from 'src/ducks/navigation/navigation';

const Home: React.FC = () => {
  const user = localStorage.getItem('user');
  const { pushState } = useNavigation();

  if (!user) pushState('/auth');

  return (
  <Row justify="center" align="middle">
    <Col span={6}>
      <FilterComponent></FilterComponent>
    </Col>
    <Col span={16}>
      <DisplayComponent></DisplayComponent>
    </Col>
  </Row>);
};

export default Home;